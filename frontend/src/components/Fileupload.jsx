import React, { useRef, useState } from "react";
import axios from "axios";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const FileUploadCard = () => {
  const [files, setFiles] = useState([]);
  const [ipfsHash, setIpfsHash] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const projectId = db.app.options.projectId || "unknown-project";

  const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5Mzg1Nzg5YS00NWY2LTRjY2YtOTZkNi03ZmQ4OTg1NzQzYzYiLCJlbWFpbCI6ImFiaGlzaGVrY3NlZDU2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwNGIyZWUzM2M4ZWRjMmUyODk2MSIsInNjb3BlZEtleVNlY3JldCI6IjEwZjM0NzkxMjI3MWM1OWY5ODgwZWEyYmRlYjk0OTNkMGMwNmFlZWUwN2I2MDMzOGI2YzRlMDUyZDRkNTRhN2IiLCJleHAiOjE3NzU5NDkyNDZ9.rLJXlcWQXH56r5oF5i_bLWVtH0aQTOvDElEdc0nzNcg"; // ⚠️ Replace with .env secret in production

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected]);
    setIpfsHash("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped]);
    setIpfsHash("");
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleUpload = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to upload");
      return;
    }

    if (files.length === 0 || inputValue.trim() === "") {
      return alert("Please select a file and enter a document name!");
    }

    setLoading(true);
    let uploadedIpfsHash = "";

    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      const metadata = JSON.stringify({
        name: inputValue,
      });
      formData.append("pinataMetadata", metadata);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const hash = res.data.IpfsHash;
      setIpfsHash(hash);
      uploadedIpfsHash = hash;

      const uploadPayload = {
        documentName: inputValue,
        ipfsHash: hash,
        ownerUid: user.uid,
        createdAt: serverTimestamp(),
      };

      try {
        await addDoc(collection(db, "users", user.uid, "uploads"), uploadPayload);
      } catch (firestoreWriteError) {
        // Fallback for projects using top-level uploads rules.
        if (firestoreWriteError?.code === "permission-denied") {
          await addDoc(collection(db, "uploads"), uploadPayload);
        } else {
          throw firestoreWriteError;
        }
      }

      alert("Document uploaded and saved!");
      setFiles([]);
      setInputValue("");
    } catch (error) {
      console.error("Upload failed:", error);
      if (uploadedIpfsHash && error?.code === "permission-denied") {
        console.error("Firestore permission denied while saving upload metadata", {
          projectId,
          uid: user?.uid,
          attemptedPaths: [`users/${user?.uid}/uploads`, "uploads"],
          code: error?.code,
          message: error?.message,
        });
        alert(
          `Uploaded to IPFS (${uploadedIpfsHash}) but Firestore blocked metadata save. Project: ${projectId}, UID: ${user?.uid}. Update Firestore rules for users/{uid}/uploads or uploads, and verify App Check is not enforcing Firestore for web.`
        );
        return;
      }
      const firebaseMessage = error?.code ? `${error.code}: ${error.message}` : error?.message;
      alert(`Upload failed! ${firebaseMessage || "Please check Firestore rules and try again."}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 backdrop-blur-md p-4 lg:p-8 m-4 lg:m-20 rounded-2xl shadow-lg">
      {/* LEFT SIDE */}
      <span className="w-full lg:w-1/2 p-4 lg:p-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Upload files</h2>
            <p className="text-sm text-gray-500">Select and upload the file of your choice</p>
          </div>
        </div>

        {/* File List */}
        <div className="mt-6">
          {files.length > 0 ? (
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">PDF</div>
                <div>
                  <p className="text-sm font-medium">{files[0].name}</p>
                  <p className="text-xs text-gray-500">
                    {(files[0].size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button onClick={() => setFiles([])} className="text-gray-400 hover:text-red-400">
                ✕
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No file selected</p>
          )}
        </div>

        {/* Upload Button */}
        <div>
          <button
            onClick={handleUpload}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={files.length === 0 || loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* IPFS Result */}
        {ipfsHash && (
          <div className="mt-4 text-sm text-green-700">
            <p>Uploaded successfully!</p>
            <p>Hash Value: {ipfsHash}</p>
          </div>
        )}
      </span>

      {/* RIGHT SIDE */}
      <span className="w-full lg:w-1/2 p-4 lg:p-8">
        <div
          className={`border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer ${files.length === 0 ? "hover:border-blue-400" : "cursor-not-allowed"
            } transition`}
          onClick={() => files.length === 0 && fileInputRef.current.click()}
          onDrop={(e) => files.length === 0 && handleDrop(e)}
          onDragOver={handleDragOver}
        >
          <div className="text-4xl mb-2">🌥️</div>
          <p className="font-medium">Choose a file or drag & drop it here</p>
          <p className="text-xs text-gray-400">JPEG, PNG, PDF – up to 50MB</p>

          <button
            className="mt-4 border px-4 py-1 rounded-md text-sm text-blue-500 border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={files.length > 0}
          >
            Browse File
          </button>
          <input
            type="file"
            className="hidden"
            multiple={false}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          
          
        </div>
        <div className="ml-58">
        <br />
          <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Document name"
        required
      />
      </div>
      </span>
    </div>
  );
};

export default FileUploadCard;
