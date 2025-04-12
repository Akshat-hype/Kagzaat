import React from "react";
import QrCodeGenerator from "./QrCodeGenerator";

const Card = ({ documentName, ipfsHash }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden w-80 m-4 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
    {/* Card Header */}
    <div className="bg-blue-600 p-4 text-white">
      <h2 className="text-xl font-semibold truncate">{documentName}</h2>
    </div>
    
    {/* Card Body */}
    <div className="p-5">
      {/* IPFS Hash */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-500 mb-1">IPFS Hash</p>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-blue-800 font-mono text-sm break-all">{ipfsHash}</p>
        </div>
      </div>
      
      {/* QR Code */}
      <div className="flex flex-col items-center">
        <p className="text-sm font-medium text-gray-500 mb-2">Verification QR</p>
        <div className="border-2 border-blue-100 p-2 rounded-lg">
          <QrCodeGenerator url={ipfsHash} />
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
          View Details
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Verify
        </button>
      </div>
    </div>
    
    {/* Status Badge */}
    <div className="px-4 pb-3">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
        <svg className="w-2 h-2 mr-2 fill-current" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
        Verified
      </span>
    </div>
  </div>
);

export default Card;