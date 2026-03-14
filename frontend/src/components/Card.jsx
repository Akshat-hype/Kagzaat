import React, { useMemo, useState } from "react";
import QrCodeGenerator from "./QrCodeGenerator";

export default function DocumentCard({ documentName, ipfsHash }) {
  const [docText, setDocText] = useState("");
  const [isFetchingText, setIsFetchingText] = useState(false);
  const [fetchError, setFetchError] = useState("");

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
    <div className="w-[85vw] max-w-4xl mx-auto bg-gradient-to-br from-[#3d348b] to-[#00509d] rounded-3xl shadow-xl p-6">
      {/* Header with Document Name and QR Code */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{documentName}</h1>
          
          {/* Verified Badge */}
          <div className="flex items-center mt-2">
            <div className="bg-green-100 rounded-full p-1 mr-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white font-medium">Verified</span>
          </div>
        </div>
        
        {/* QR Code */}
        <div className="bg-white p-2 rounded-xl">
          <QrCodeGenerator url={ipfsHash} size={window.innerWidth > 768 ? 100 : 80} />
        </div>
      </div>

      {/* Document Number */}
      <div className="mt-">
        <p className="text-blue-100 text-sm">Document Number</p>
        <p className="text-white font-mono text-lg tracking-wider">XXXX XXXX XXXX</p>
      </div>

      {/* Hash Section */}
      <div className="mt-">
        <p className="text-blue-100 text-sm">Hash:</p>
        <div className="bg-white/20 p-3 rounded-lg mt-1">
          <p className="text-white font-mono text-sm break-all">{ipfsHash}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={downloadTxtFile}
          className="inline-flex items-center rounded-lg bg-white/20 px-4 py-2 text-white hover:bg-white/30 transition-colors"
        >
          Download Hash
        </button>
        <button
          onClick={fetchDocText}
          disabled={isFetchingText}
          className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-blue-800 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-70 transition-colors"
        >
          {isFetchingText ? "Fetching Text..." : "Fetch Text"}
        </button>
        {ipfsUrl && (
          <a
            href={ipfsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-lg border border-white/50 px-4 py-2 text-white hover:bg-white/20 transition-colors"
          >
            Open File
          </a>
        )}
      </div>

      {fetchError && (
        <p className="mt-4 rounded-md bg-red-100/90 px-3 py-2 text-sm text-red-700">{fetchError}</p>
      )}

      {docText && (
        <div className="mt-4 rounded-xl bg-white/15 p-4">
          <p className="mb-2 text-sm font-semibold text-blue-100">Document Text</p>
          <pre className="max-h-56 overflow-auto whitespace-pre-wrap rounded-lg bg-black/20 p-3 text-xs text-white">
            {docText}
          </pre>
        </div>
      )}
    </div>
  );
}