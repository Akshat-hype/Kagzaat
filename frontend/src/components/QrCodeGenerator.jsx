import React from "react";
import QRCode from "react-qr-code"; // ✅ Use react-qr-code

const QRCodeGenerator = ({ url }) => {
  if (!url || url.trim() === "") {
    return <p>No URL provided.</p>;
  }

  return (
    <div className="qr-generator-container">
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
    </div>
  );
};

export default QRCodeGenerator;
