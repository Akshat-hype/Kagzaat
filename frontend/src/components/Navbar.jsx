import React from "react";
import { IoScanOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

export default function Navbar() {
  return (
    <div className="flex items-center bg-[#00509d] p-4 text-white">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
        alt="Logo"
        className="h-10 w-10 rounded-full"
      />
      <span className="text-2xl font-bold ml-2">Kaagzad</span>
      <span className="ml-auto">
        <nav className="space-x-4 flex text-2xl mt-4">
          <div className="text-2xl ">
            <i>
              <IoScanOutline className="ml-3" />
            </i>
            <h6>Scan</h6>
          </div>
          |<h1 className="font-bold ml-6 mr-6">Kushagra Saraf</h1>
          <RxAvatar className="text-4xl" />
        </nav>
      </span>
    </div>
  );
}
