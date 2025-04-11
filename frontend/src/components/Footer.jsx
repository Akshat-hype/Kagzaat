// src/App.jsx
import React from "react";
import p1 from "../assets/logo.png";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

function App() {
  return (
    <div className=" flex flex-col justify-between">
      <footer className="bg-gradient-to-br from-[#3d348b] to-[#00509d] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex mb-8 gap-4">
            <div className="w-full ml-12 md:w-2/8 mb-4 md:mb-0">
              <img src={p1} className="w-40 h-40 ml-16 mt-16" alt="" />
            </div>
            <div className="w-full md:w-3/8 mb-4 md:mb-0">
              <h6 className="md:w-3/4 text-xl p-4">
                Kagzaat aims at 'Digital Empowerment' by providing access to
                authentic digital documents to the citizen's digital document
                wallet.
              </h6>
              <h3 className="mt-4 ml-4 text-xl">Follow us:</h3>
              <div className="flex space-x-4 p-4 gap-3">
                <span><i className="text-4xl text-blue-500"><FaFacebookF /></i></span>
                <span><i className="text-4xl text-black-500"><FaXTwitter /></i></span>
                <span><i className="text-4xl text-orange-500"><FaInstagram /></i></span>
                <span><i className="text-4xl text-red-500"><FaYoutube /></i></span>
              </div>
            </div>
            <div className="w-full md:w-1/6 mb-4 md:mb-0">
              <ul className="space-y-6 text-sm">
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    Statistics
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    Circulars
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/6 mb-4 md:mb-0">
              <ul className="space-y-6 text-sm">
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    Need Help?
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    Feedback
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    MeriPachaan
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    Discover
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-gray-300">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 flex flex-col md:flex-row md:justify-between md:items-center text-sm">
            <p className="mb-2 md:mb-0">
              Last Updated: 11 Apr 2025 | Version: 2.98.0.15
            </p>
            <p className="opacity-75">
              © 2025, Website maintained by National eGovernance Division (NeGD)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
