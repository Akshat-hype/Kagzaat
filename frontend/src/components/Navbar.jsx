import React from "react";
import { IoScanOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import p1 from "../assets/logo.png";

export default function Navbar({ user }) {
  return (
    <div className="rounded-3xl shadow-lg mt-2 flex items-center bg-gradient-to-b from-[#3d348b] to-[#00509d] p-4 text-white">
      <img
        src={p1} alt="Logo" className="h-10 w-10 rounded-full"
      />
      <span className="text-2xl font-bold ml-2">Kagzaat</span>
      <span className="ml-auto">
        <nav className="space-x-4 flex text-2xl mt-4">
          <a href="/qr">
            <div
              className="text-2xl cursor-pointer"
            >
              <i>
                <IoScanOutline className="ml-3" />
              </i>
              <h6>Scan</h6>
            </div>
          </a>

          |<h1 className="font-bold ml-6 mr-6">{user}</h1>
          <RxAvatar className="text-4xl" />
        </nav>
      </span>
    </div>
  );
}
