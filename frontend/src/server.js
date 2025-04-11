import React, { useState } from "react";
import axios from "axios";

const UploadToIPFS = () => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [loading, setLoading] = useState(false);

  const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5Mzg1Nzg5YS00NWY2LTRjY2YtOTZkNi03ZmQ4OTg1NzQzYzYiLCJlbWFpbCI6ImFiaGlzaGVrY3NlZDU2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwNGIyZWUzM2M4ZWRjMmUyODk2MSIsInNjb3BlZEtleVNlY3JldCI6IjEwZjM0NzkxMjI3MWM1OWY5ODgwZWEyYmRlYjk0OTNkMGMwNmFlZWUwN2I2MDMzOGI2YzRlMDUyZDRkNTRhN2IiLCJleHAiOjE3NzU5NDkyNDZ9.rLJXlcWQXH56r5oF5i_bLWVtH0aQTOvDElEdc0nzNcg"; // ⚠️ DON'T expose this in production

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIpfsHash("");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${JWT}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIpfsHash(res.data.IpfsHash);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    }

    setLoading(false);
  };

  return (
    <div className="upload-container">
      <h2>Upload File to IPFS (via Pinata)</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload File"}
      </button>

      {ipfsHash && (
        <div>
          <p>Uploaded successfully!</p>
          <a
            href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View File on IPFS
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadToIPFS;
