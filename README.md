# Kagzaat – Intelligent Document Processing & Upload Optimization Engine

Kagzaat is an AI-powered document processing system designed to solve the inefficiencies in citizen-uploaded identity document verification on government portals such as Apuni Sarkar.

Government platforms receive thousands of identity documents daily, and current systems face two major issues:

Large file uploads (5–10 MB images) that slow down submission on mobile networks and consume excessive storage.

Manual verification of documents, which is time-consuming, error-prone, and difficult to scale.

Kagzaat introduces an automated intelligent pipeline that compresses, processes, extracts, and validates documents within seconds.

Key Features
1. Automatic Document Compression

Documents uploaded by citizens are automatically optimized during upload.

Compresses high-resolution images and PDFs

Maintains text readability

Reduces file size significantly (e.g., 5MB → optimized size)

Works transparently without requiring user interaction

Supported formats:

JPEG

PNG

PDF

2. OCR-based Data Extraction

Kagzaat automatically extracts structured information from Indian identity documents.

The system is capable of extracting fields such as:

Name

Date of Birth

Address

Document ID numbers

Issuing authority

It supports mixed language documents including:

English

Hindi / Devanagari

The OCR pipeline is designed to work even with:

Skewed photographs

Poor lighting

Mobile camera captures

Slightly blurred scans

3. Intelligent Document Preprocessing

Before OCR, documents pass through a preprocessing stage to improve recognition accuracy.

Processing steps include:

Deskewing (correct tilted images)

Denoising

Resolution normalization

Contrast enhancement

This ensures that OCR performs reliably even on low-quality images.

4. Cross-Document Validation

Kagzaat verifies extracted data across documents and application metadata.

Examples:

Name on Aadhaar vs name in application form

Address vs declared district

DOB consistency across documents

The system generates a verification summary highlighting:

Matched fields

Mismatched fields

Confidence score per field

This significantly reduces manual workload for officers.

5. Officer-Friendly Verification Dashboard

Instead of manually reading every document, officers receive a structured verification report.

The report includes:

Extracted fields

Field-level confidence scores

Flagged inconsistencies

Verification recommendations

This makes the decision process transparent and explainable.

6. IPFS Integration (Decentralized Storage)

Kagzaat integrates IPFS (InterPlanetary File System) to store optimized documents securely.

Benefits:

Decentralized storage

Tamper-resistant document storage

Reduced dependency on centralized storage

Content-addressable document retrieval

Each uploaded document generates an IPFS hash, ensuring integrity and traceability.

System Architecture

The Kagzaat pipeline works in the following stages:

Citizen Upload
      │
      ▼
Automatic Compression Engine
      │
      ▼
Image Preprocessing
(Deskew, Denoise, Normalize)
      │
      ▼
OCR Extraction Engine
      │
      ▼
Structured Data Parsing
      │
      ▼
Cross Document Validation
      │
      ▼
IPFS Storage
      │
      ▼
Verification Report API
Tech Stack
Frontend

React.js

Tailwind CSS

Backend

Node.js

Express.js

AI / Processing

OCR Engine

Image preprocessing pipeline

Storage

IPFS (Decentralized Storage)

# Installation

Clone the repository

git clone https://github.com/Akshat-hype/Kagzaat.git
cd Kagzaat
Running the Project

Both frontend and backend need to be started.

Install Dependencies

Run in both frontend and backend folders:

npm install

or

npm i
Start Backend
npm run dev
Start Frontend
npm run dev
API Output Example

The system returns:

{
  optimizedDocument: "compressed_file_url",
  ipfsHash: "QmX123...",
  extractedFields: {
      name: "Rahul Sharma",
      dob: "12/05/1995",
      address: "Dehradun, Uttarakhand"
  },
  verificationSummary: {
      nameMatch: true,
      addressMatch: false,
      confidenceScore: 0.92
  }
}
Key Challenges Addressed
Efficient Compression

Balancing file size reduction while maintaining OCR readability.

Document Diversity

Indian government documents vary across:

states

departments

issuing years

layouts

Mixed Language OCR

Handling documents with Hindi + English scripts.

Explainable Verification

Providing field-level transparency rather than just a simple score.

Real-Time Processing

Designed to process documents within seconds during application submission.

Use Cases

Kagzaat can be integrated into:

Government service portals (Apuni Sarkar)

Scholarship verification systems

Loan application portals

Digital identity verification platforms

Citizen service centers

Future Improvements

QR code extraction from Aadhaar

Signature detection

AI-based fraud detection

Template detection for different document types

Blockchain-based document verification

Team

Developed for IIT Roorkee Hackathon to build an intelligent document processing system for citizen services.

Project Repository:

https://github.com/Akshat-hype/Kagzaat
