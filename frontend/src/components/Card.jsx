import React, { useMemo, useState } from "react";
import QrCodeGenerator from "./QrCodeGenerator";

export default function DocumentCard({ documentName, ipfsHash, ocrFields }) {
  const [docText, setDocText] = useState("");
  const [isFetchingText, setIsFetchingText] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const hasOcrFields =
    ocrFields && typeof ocrFields === "object" && Object.keys(ocrFields).length > 0;

  const primaryDocNumber = useMemo(() => {
    if (!hasOcrFields) return "Not available";
    const priorityKeys = [
      "aadhaarNumber",
      "panNumber",
      "passportNumber",
      "licenceNumber",
      "epicNumber",
    ];

    for (const key of priorityKeys) {
      const value = ocrFields?.[key];
      if (value) return String(value);
    }

    if (Array.isArray(ocrFields?.possibleIds) && ocrFields.possibleIds.length > 0) {
      return String(ocrFields.possibleIds[0]);
    }

    return "Not available";
  }, [hasOcrFields, ocrFields]);

  const ipfsUrl = useMemo(() => {
    if (!ipfsHash) return "";
    return ipfsHash.startsWith("http")
      ? ipfsHash
      : `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  }, [ipfsHash]);

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([ipfsHash], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${documentName}_hash.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const fetchDocText = async () => {
    if (!ipfsUrl) {
      setFetchError("No IPFS hash found for this document.");
      return;
    }

    setIsFetchingText(true);
    setFetchError("");

    try {
      const response = await fetch(ipfsUrl);

      if (!response.ok) {
        throw new Error(`Unable to fetch file text (${response.status}).`);
      }

      const contentType = (response.headers.get("content-type") || "").toLowerCase();

      if (
        contentType &&
        !contentType.includes("text") &&
        !contentType.includes("json") &&
        !contentType.includes("xml") &&
        !contentType.includes("csv")
      ) {
        throw new Error(`This file is not a text document (${contentType}).`);
      }

      const text = await response.text();
      setDocText(text || "[Empty file]");
    } catch (error) {
      setDocText("");
      setFetchError(error?.message || "Failed to fetch document text.");
    } finally {
      setIsFetchingText(false);
    }
  };

  return (
    <div className="relative w-[92vw] max-w-4xl mx-auto overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-br from-cyan-950 via-blue-900 to-sky-700 p-5 md:p-7">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-300/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-blue-200/20 blur-2xl" />

      {/* Header with Document Name and QR Code */}
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-bold text-white md:text-3xl">{documentName}</h1>
          
          {/* Verified Badge */}
          <div className="mt-2 inline-flex items-center rounded-full border border-emerald-200/30 bg-emerald-100/15 px-3 py-1.5 backdrop-blur">
            <div className="mr-2 rounded-full bg-emerald-100 p-1">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-wide text-emerald-50">Verified</span>
          </div>
        </div>
        
        {/* QR Code */}
        <div className="rounded-2xl border border-white/30 bg-white p-2">
          <QrCodeGenerator url={ipfsHash} size={window.innerWidth > 768 ? 100 : 80} />
        </div>
      </div>

      {/* Document Number */}
      <div className="relative z-10 mt-6 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-sky-100/90">Document Number</p>
        <p className="mt-1 break-all font-mono text-base tracking-wider text-white md:text-lg">{primaryDocNumber}</p>
      </div>

      {/* Hash Section */}
      <div className="relative z-10 mt-4 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-sky-100/90">IPFS Hash</p>
        <div className="mt-2 rounded-lg bg-black/20 p-3">
          <p className="break-all font-mono text-xs text-white md:text-sm">{ipfsHash}</p>
        </div>
      </div>

      {/* OCR Fields (if available) */}
      {hasOcrFields && (
        <div className="relative z-10 mt-4 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-sky-100/90">Extracted Fields</p>
          <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {Object.entries(ocrFields).map(([key, value]) => (
              <li key={key} className="rounded-lg border border-white/20 bg-white/10 p-3 text-sm text-white">
                <p className="mb-1 text-[11px] uppercase tracking-[0.1em] text-cyan-100/90">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="break-words text-sm text-white/95">
                  {typeof value === "object" ? JSON.stringify(value) : String(value)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative z-10 mt-6 flex flex-wrap gap-3">
        <button
          onClick={downloadTxtFile}
          className="inline-flex items-center rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
        >
          Download Hash
        </button>
        <button
          onClick={fetchDocText}
          disabled={isFetchingText}
          className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-800 transition-colors hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isFetchingText ? "Fetching Text..." : "Fetch Text"}
        </button>
        {ipfsUrl && (
          <a
            href={ipfsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-xl border border-white/30 bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            Open File
          </a>
        )}
      </div>

      {fetchError && (
        <p className="relative z-10 mt-4 rounded-lg border border-red-200/60 bg-red-100/95 px-3 py-2 text-sm text-red-700">{fetchError}</p>
      )}

      {docText && (
        <div className="relative z-10 mt-4 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-sky-100/90">Document Text</p>
          <pre className="max-h-56 overflow-auto whitespace-pre-wrap rounded-lg bg-black/25 p-3 text-xs text-white/95">
            {docText}
          </pre>
        </div>
      )}
    </div>
  );
}