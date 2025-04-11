import React, { useState, useEffect } from "react";
import Moralis from "moralis";

const UploadWithMoralis = () => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    Moralis.start({
      apiKey: "YOUR_MORALIS_API_KEY", // 🔥
    });
  }, []);

  const uploadToIPFS = async () => {
    if (!file) {
      alert("Select a file first!");
      return;
    }

    const fileReader = new FileReader();

    fileReader.onloadend = async () => {
      const base64 = fileReader.result.split(",")[1];

      try {
        const response = await Moralis.EvmApi.ipfs.uploadFolder({
          abi: [
            {
              path: file.name,
              content: base64,
            },
          ],
        });

        console.log("Upload Response:", response.toJSON());

        const ipfsLink = response.toJSON()[0].path; // example: https://ipfs.moralis.io:2053/ipfs/Qmxxxx
        const hash = ipfsLink.split("/").pop();
        console.log("IPFS Hash (CID):", hash);

        alert(`File uploaded! IPFS Hash: ${hash}`);
      } catch (error) {
        console.error("Error uploading to IPFS:", error);
      }
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Document Image to IPFS via Moralis 🚀</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept="image/*"
      />
      <br />
      <button onClick={uploadToIPFS} style={{ marginTop: "10px" }}>
        Upload to IPFS
      </button>
    </div>
  );
};

export default UploadWithMoralis;
