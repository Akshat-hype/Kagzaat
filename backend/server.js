const express = require("express");
const multer = require("multer");
const tesseract = require("node-tesseract-ocr");
const sharp = require("sharp");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const { execFile } = require("child_process");
const { promisify } = require("util");

const execFileAsync = promisify(execFile);

/**
 * If the file is a PDF, convert its first page to a PNG using pdftoppm.
 * Returns the path of the image to run OCR on.
 * Caller is responsible for deleting the returned path if it differs from inputPath.
 */
async function resolveImagePath(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== ".pdf") return { imagePath: filePath, tempCreated: false };

  const outBase = filePath.replace(/\.pdf$/i, "");
  // pdftoppm -r 300 -png -f 1 -l 1 input.pdf outBase  → outBase-1.png
  await execFileAsync("pdftoppm", ["-r", "300", "-png", "-f", "1", "-l", "1", filePath, outBase]);

  // pdftoppm names the file outBase-000001.png or outBase-1.png depending on version
  const candidates = [`${outBase}-000001.png`, `${outBase}-1.png`];
  const imagePath = candidates.find((p) => fs.existsSync(p));
  if (!imagePath) throw new Error("PDF-to-image conversion produced no output");
  return { imagePath, tempCreated: true };
}

/**
 * Auto-compress image input before OCR to reduce file size and speed up processing.
 * Returns a compressed JPEG path for common image types.
 */
async function compressImageForOcr(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const compressible = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp"]);
  if (!compressible.has(ext)) return { imagePath, tempCreated: false };

  const outputPath = `${imagePath}.compressed.jpg`;

  await sharp(imagePath)
    .rotate()
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 70, mozjpeg: true })
    .toFile(outputPath);

  return { imagePath: outputPath, tempCreated: true };
}

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}));

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|pdf/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error("Only images (JPG/PNG) and PDF files are allowed"));
  },
});

const ocrConfig = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

// ─── Document-specific extractors ────────────────────────────────────────────

/**
 * Aadhaar Card
 * Fields: name, dob, gender, aadhaarNumber, address
 */
function extractAadhaar(text) {
  const result = {};

  // Aadhaar number: 12 digits (may be space-separated as XXXX XXXX XXXX)
  const aadhaarMatch = text.match(/\b(\d{4}\s\d{4}\s\d{4}|\d{12})\b/);
  if (aadhaarMatch) result.aadhaarNumber = aadhaarMatch[1].replace(/\s/g, "");

  // DOB: DD/MM/YYYY or DD-MM-YYYY
  const dobMatch = text.match(/(?:DOB|Date of Birth|Birth)[:\s]*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i)
    || text.match(/\b(\d{2}[\/\-]\d{2}[\/\-]\d{4})\b/);
  if (dobMatch) result.dob = dobMatch[1];

  // Gender
  const genderMatch = text.match(/\b(Male|Female|MALE|FEMALE|TRANSGENDER)\b/i);
  if (genderMatch) result.gender = genderMatch[1];

  // Name usually appears before DOB on Aadhaar; line before "DOB" or after "Government of India"
  const nameMatch = text.match(/(?:(?:To|Dear)\s+)?([A-Z][a-z]+(?:\s[A-Z][a-z]+){1,3})\s*\n.*(?:DOB|Year of Birth)/);
  if (nameMatch) {
    result.name = nameMatch[1].trim();
  } else {
    // Fallback: look for "Name:" label
    const nameLabelMatch = text.match(/Name[:\s]+([A-Za-z\s]+)/i);
    if (nameLabelMatch) result.name = nameLabelMatch[1].trim().split("\n")[0];
  }

  // Address: everything after "Address" keyword up to a PIN code
  const addressMatch = text.match(/(?:Address|S\/O|D\/O|W\/O)[:\s]*([\s\S]*?\d{6})/i);
  if (addressMatch) result.address = addressMatch[1].replace(/\s+/g, " ").trim();

  // PIN code
  const pinMatch = text.match(/\b(\d{6})\b/);
  if (pinMatch) result.pin = pinMatch[1];

  return result;
}

/**
 * PAN Card
 * Fields: panNumber, name, fatherName, dob
 */
function extractPAN(text) {
  const result = {};

  // PAN: 5 letters + 4 digits + 1 letter
  const panMatch = text.match(/\b([A-Z]{5}[0-9]{4}[A-Z])\b/);
  if (panMatch) result.panNumber = panMatch[1];

  // DOB: DD/MM/YYYY
  const dobMatch = text.match(/\b(\d{2}\/\d{2}\/\d{4})\b/);
  if (dobMatch) result.dob = dobMatch[1];

  // Name appears on first prominent line (before Father's name)
  // Usually: line after "INCOME TAX DEPARTMENT" or before "Father's Name"
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  let nameLine = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/income\s*tax/i.test(lines[i]) || /permanent\s*account/i.test(lines[i])) {
      nameLine = i;
    }
  }
  // Name is usually 2 lines after the header block
  for (let i = nameLine + 1; i < lines.length; i++) {
    if (/^[A-Z\s]{3,40}$/.test(lines[i]) && !result.name) {
      result.name = lines[i].trim();
    } else if (result.name && /^[A-Z\s]{3,40}$/.test(lines[i]) && !result.fatherName) {
      result.fatherName = lines[i].trim();
      break;
    }
  }

  // Fallback label-based
  if (!result.name) {
    const m = text.match(/Name[:\s]+([A-Za-z\s]+)/i);
    if (m) result.name = m[1].trim().split("\n")[0];
  }

  return result;
}

/**
 * Passport
 * Fields: passportNumber, surname, givenNames, nationality, dob, sex, expiryDate, placeOfBirth, placeOfIssue
 * Also attempts MRZ parsing (bottom two lines of passport photo page)
 */
function extractPassport(text) {
  const result = {};

  // Passport number: 1 letter + 7 digits (India)
  const passportMatch = text.match(/\b([A-Z]\d{7})\b/);
  if (passportMatch) result.passportNumber = passportMatch[1];

  // Dates (DD/MM/YYYY or DD-MM-YYYY)
  const dates = [...text.matchAll(/\b(\d{2}[\/\-]\d{2}[\/\-]\d{4})\b/g)].map((m) => m[1]);
  if (dates[0]) result.dob = dates[0];
  if (dates[1]) result.dateOfIssue = dates[1];
  if (dates[2]) result.expiryDate = dates[2];

  const dobMatch = text.match(/(?:Date of Birth|DOB)[:\s]*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i);
  if (dobMatch) result.dob = dobMatch[1];

  const expiryMatch = text.match(/(?:Date of Expiry|Expiry|Valid Until)[:\s]*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i);
  if (expiryMatch) result.expiryDate = expiryMatch[1];

  // Nationality
  const nationalityMatch = text.match(/Nationality[:\s]*([A-Za-z\s]+)/i);
  if (nationalityMatch) result.nationality = nationalityMatch[1].trim().split("\n")[0];

  // Sex/Gender
  const sexMatch = text.match(/Sex[:\s]*(M|F|Male|Female)/i);
  if (sexMatch) result.sex = sexMatch[1].toUpperCase().startsWith("M") ? "Male" : "Female";

  // Surname / Given Name labels
  const surnameMatch = text.match(/Surname[:\s]*([A-Za-z\s]+)/i);
  if (surnameMatch) result.surname = surnameMatch[1].trim().split("\n")[0];

  const givenMatch = text.match(/(?:Given Name|Given Names)[:\s]*([A-Za-z\s]+)/i);
  if (givenMatch) result.givenNames = givenMatch[1].trim().split("\n")[0];

  // Place of birth / Issue
  const pobMatch = text.match(/(?:Place of Birth)[:\s]*([A-Za-z\s,]+)/i);
  if (pobMatch) result.placeOfBirth = pobMatch[1].trim().split("\n")[0];

  const poiMatch = text.match(/(?:Place of Issue)[:\s]*([A-Za-z\s,]+)/i);
  if (poiMatch) result.placeOfIssue = poiMatch[1].trim().split("\n")[0];

  // MRZ lines (two lines of 44 chars each for TD3 format)
  const mrzMatch = text.match(/([P<A-Z0-9<]{44})\s*\n\s*([A-Z0-9<]{44})/);
  if (mrzMatch) {
    result.mrz = { line1: mrzMatch[1], line2: mrzMatch[2] };
    const mrz2 = mrzMatch[2];
    if (!result.passportNumber) result.passportNumber = mrz2.substring(0, 9).replace(/</g, "");
    if (!result.dob) {
      const dob = mrz2.substring(13, 19); // YYMMDD
      result.dob = `${dob.slice(4, 6)}/${dob.slice(2, 4)}/19${dob.slice(0, 2)}`;
    }
    if (!result.expiryDate) {
      const exp = mrz2.substring(19, 25);
      result.expiryDate = `${exp.slice(4, 6)}/${exp.slice(2, 4)}/20${exp.slice(0, 2)}`;
    }
  }

  return result;
}

/**
 * Driving Licence (India)
 * Fields: licenceNumber, name, dob, address, validFrom, validTo, vehicleClass
 */
function extractDrivingLicence(text) {
  const result = {};

  // DL number: state code (2 letters) + 2 digits + 7–14 alphanumeric chars
  const dlMatch = text.match(/\b([A-Z]{2}[0-9]{2}\s?[0-9]{11}|[A-Z]{2}-\d{2}-\d{4}-\d{7})\b/i);
  if (dlMatch) result.licenceNumber = dlMatch[1].replace(/\s/g, "");

  // Name
  const nameMatch = text.match(/(?:Name|S\/O|D\/O|W\/O)[:\s]+([A-Za-z\s]+)/i);
  if (nameMatch) result.name = nameMatch[1].trim().split("\n")[0];

  // DOB
  const dobMatch = text.match(/(?:DOB|Date of Birth)[:\s]*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i)
    || text.match(/\b(\d{2}[\/\-]\d{2}[\/\-]\d{4})\b/);
  if (dobMatch) result.dob = dobMatch[1];

  // Valid dates
  const validFromMatch = text.match(/(?:Valid from|Issue Date)[:\s]*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i);
  if (validFromMatch) result.validFrom = validFromMatch[1];

  const validToMatch = text.match(/(?:Valid to|Expiry|Valid Till)[:\s]*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i);
  if (validToMatch) result.validTo = validToMatch[1];

  // Vehicle class (e.g. LMV, MCWG, Transport)
  const vcMatch = text.match(/(?:Class of Vehicle|COV|Vehicle Class)[:\s]*([A-Z0-9,\/\s]+)/i);
  if (vcMatch) result.vehicleClass = vcMatch[1].trim().split("\n")[0];

  // Blood group
  const bgMatch = text.match(/\b(A|B|AB|O)[+-]\b/);
  if (bgMatch) result.bloodGroup = bgMatch[0];

  return result;
}

/**
 * Voter ID (EPIC)
 * Fields: epicNumber, name, fatherOrHusbandName, dob, address, serialNumber
 */
function extractVoterId(text) {
  const result = {};

  // EPIC number: 3 letters + 7 digits
  const epicMatch = text.match(/\b([A-Z]{3}[0-9]{7})\b/);
  if (epicMatch) result.epicNumber = epicMatch[1];

  // Name
  const nameMatch = text.match(/(?:Name|Elector's Name)[:\s]+([A-Za-z\s]+)/i);
  if (nameMatch) result.name = nameMatch[1].trim().split("\n")[0];

  // Father / Husband name
  const relationMatch = text.match(/(?:Father['']?s Name|Husband['']?s Name|Relation Name)[:\s]+([A-Za-z\s]+)/i);
  if (relationMatch) result.fatherOrHusbandName = relationMatch[1].trim().split("\n")[0];

  // DOB / Age
  const dobMatch = text.match(/(?:DOB|Date of Birth)[:\s]*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i)
    || text.match(/\b(\d{2}[\/\-]\d{2}[\/\-]\d{4})\b/);
  if (dobMatch) result.dob = dobMatch[1];

  const ageMatch = text.match(/\bAge[:\s]*(\d{1,3})\b/i);
  if (ageMatch) result.age = ageMatch[1];

  // Sex / Gender
  const genderMatch = text.match(/\b(Male|Female|MALE|FEMALE)\b/i);
  if (genderMatch) result.gender = genderMatch[1];

  // Address
  const addressMatch = text.match(/(?:Address)[:\s]*([\s\S]*?\d{6})/i);
  if (addressMatch) result.address = addressMatch[1].replace(/\s+/g, " ").trim();

  return result;
}

/**
 * Other/Unknown Document
 * Returns lightweight generic fields useful across arbitrary docs.
 */
function extractOthers(text) {
  const result = {};

  const dates = [...text.matchAll(/\b(\d{2}[\/\-]\d{2}[\/\-]\d{4})\b/g)].map((m) => m[1]);
  if (dates.length) result.dates = [...new Set(dates)].slice(0, 10);

  const ids = [...text.matchAll(/\b([A-Z0-9]{6,20})\b/g)]
    .map((m) => m[1])
    .filter((v) => /\d/.test(v));
  if (ids.length) result.possibleIds = [...new Set(ids)].slice(0, 15);

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 5);
  if (lines.length) result.topLines = lines;

  return result;
}

// ─── Document type registry ───────────────────────────────────────────────────

const DOC_TYPES = {
  aadhaar: {
    label: "Aadhaar Card",
    extract: extractAadhaar,
  },
  pan: {
    label: "PAN Card",
    extract: extractPAN,
  },
  passport: {
    label: "Passport",
    extract: extractPassport,
  },
  driving_licence: {
    label: "Driving Licence",
    extract: extractDrivingLicence,
  },
  voter_id: {
    label: "Voter ID",
    extract: extractVoterId,
  },
  others: {
    label: "Others",
    extract: extractOthers,
  },
};

// ─── Routes ───────────────────────────────────────────────────────────────────

/** List supported document types */
app.get("/doc-types", (req, res) => {
  const types = Object.entries(DOC_TYPES).map(([key, val]) => ({
    key,
    label: val.label,
  }));
  res.json(types);
});

/**
 * POST /ocr
 * Body (multipart/form-data):
 *   file    — image file (JPG/PNG) or PDF
 *   docType — one of: aadhaar | pan | passport | driving_licence | voter_id | others
 *
 * Response:
 *   { docType, label, rawText, fields }
 */
app.post("/ocr", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { docType } = req.body;
  if (!docType || !DOC_TYPES[docType]) {
    fs.unlink(req.file.path, () => {});
    return res.status(400).json({
      error: `Missing or unsupported docType. Supported: ${Object.keys(DOC_TYPES).join(", ")}`,
    });
  }

  const tempPaths = new Set();
  try {
    const { imagePath, tempCreated } = await resolveImagePath(req.file.path);
    if (tempCreated) tempPaths.add(imagePath);

    const { imagePath: ocrInputPath, tempCreated: compressedTempCreated } = await compressImageForOcr(imagePath);
    if (compressedTempCreated) tempPaths.add(ocrInputPath);

    const rawText = await tesseract.recognize(ocrInputPath, ocrConfig);
    const fields = DOC_TYPES[docType].extract(rawText);

    res.json({
      docType,
      label: DOC_TYPES[docType].label,
      rawText,
      fields,
    });
  } catch (err) {
    console.error("OCR error:", err);
    res.status(500).json({ error: "OCR processing failed", details: err.message });
  } finally {
    // Clean up uploaded file and any generated temp files.
    fs.unlink(req.file.path, () => {});
    for (const tempPath of tempPaths) {
      if (tempPath !== req.file.path) {
        fs.unlink(tempPath, () => {});
      }
    }
  }
});

// ─── Error handler ────────────────────────────────────────────────────────────

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(400).json({ error: err.message });
});

app.listen(PORT, () => console.log(`OCR server running on http://localhost:${PORT}`));
