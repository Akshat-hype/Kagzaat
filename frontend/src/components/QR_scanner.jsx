// Make sure to install html5-qrcode first: npm install html5-qrcode

import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner = ({ onScanSuccess, onScanFailure }) => {
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    html5QrCodeRef.current = new Html5Qrcode(scannerRef.current.id);

    html5QrCodeRef.current
      .start(
        { facingMode: "environment" }, // back camera
        config,
        (decodedText, decodedResult) => {
          if (onScanSuccess) onScanSuccess(decodedText, decodedResult);
        },
        (errorMessage) => {
          if (onScanFailure) onScanFailure(errorMessage);
        }
      )
      .catch((err) => {
        console.error("Failed to start scanning", err);
      });

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().then(() => {
          html5QrCodeRef.current.clear();
        });
      }
    };
  }, [onScanSuccess, onScanFailure]);

  return () => {
    async function cleanup() {
      if (html5QrCodeRef.current) {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
        await html5QrCodeRef.current.clear();
      }
    }
    cleanup();
  };
  
};

export default QrScanner;
