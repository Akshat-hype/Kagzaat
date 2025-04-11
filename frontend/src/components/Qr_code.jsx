import React, { useState } from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setShowQRCode(false); // Reset QR code visibility when input changes
  };

  const handleGenerateQRCode = () => {
    if (url.trim() !== "") {
      setShowQRCode(true);
    } else {
      alert("Please enter a valid URL.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter your URL"
        value={url}
        onChange={handleInputChange}
        style={{ padding: "10px", width: "300px", fontSize: "16px" }}
      />
      <br />
      <button
        onClick={handleGenerateQRCode}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Generate QR Code
      </button>

      {showQRCode && (
        <div style={{ marginTop: "20px" }}>
          <QRCode value={url} size={256} />
          <br />
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(url)}`}
            download="URL.txt"
          >
            Download URL as TXT
          </a>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
