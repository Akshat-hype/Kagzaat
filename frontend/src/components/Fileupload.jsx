import React, { useRef, useState } from 'react';

const FileUploadCard = () => {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files);
        setFiles((prev) => [...prev, ...selected]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const dropped = Array.from(e.dataTransfer.files);
        setFiles((prev) => [...prev, ...dropped]);
    };

    const handleDragOver = (e) => e.preventDefault();

    return (
        <div className="w-full max-w-md mt-24 mx-auto bg-gray-100 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">Upload files</h2>
                    <p className="text-sm text-gray-500">Select and upload the file of your choice</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div
                className={`border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer ${files.length === 0 ? "hover:border-blue-400" : "cursor-not-allowed"
                    } transition`}
                onClick={() => files.length === 0 && fileInputRef.current.click()}
                onDrop={(e) => files.length === 0 && handleDrop(e)}
                onDragOver={handleDragOver}
            >
                <div className="text-4xl mb-2">🌥️</div>
                <p className="font-medium">Choose a file or drag & drop it here</p>
                <p className="text-xs text-gray-400">JPEG, PNG, PDF, MP4 – up to 50MB</p>

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
                        <button
                            onClick={() => setFiles([])}
                            className="text-gray-400 hover:text-red-400"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No file selected</p>
                )}
            </div>
            {/* Footer */}
            <div>
                <button
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    disabled={files.length === 0}
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default FileUploadCard;
