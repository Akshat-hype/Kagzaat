import React from "react";
import QrCodeGenerator from "./QrCodeGenerator";

export default function DocumentCard({ documentName, ipfsHash }) {
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([ipfsHash], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${documentName}_hash.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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

      {/* Download Button */}
      <button 
        onClick={downloadTxtFile}
        className="mt-6 flex items-center text-white hover:text-blue-200 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
    </div>
  );
}