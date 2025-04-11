import React, { useState } from "react";
import QRCode from "react-qr-code"; // ✅ Use react-qr-code

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setShowQRCode(false);
  };

  const handleGenerateQRCode = () => {
    if (url.trim() !== "") {
      setShowQRCode(true);
    } else {
      alert("Please enter a valid URL.");
    }
  };

  return (
    <div className="qr-generator-container">
      <h1 className="title">QR Code Generator</h1>

      <input
        type="text"
        placeholder="Enter your URL"
        value={url}
        onChange={handleInputChange}
        className="url-input"
      />

      <button onClick={handleGenerateQRCode} className="generate-button">
        Generate QR Code
      </button>

      {showQRCode && (
        <div className="qr-code-section">
          <QRCode value={url} size={256} />
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(url)}`}
            download="URL.txt"
            className="download-link"
          >
            Download URL as TXT
          </a>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
