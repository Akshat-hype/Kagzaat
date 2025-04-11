// // src/App.jsx
// import React from "react";
// import p1 from "../assets/logo.png";
// import { FaXTwitter } from "react-icons/fa6";
// import { FaFacebookF } from "react-icons/fa6";
// import { FaInstagram } from "react-icons/fa6";
// import { FaYoutube } from "react-icons/fa";

// function App() {
//   return (
//     <div className="flex flex-col justify-between">
//       <footer className="bg-gradient-to-br from-[#3d348b] to-[#00509d] text-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-wrap mb-8 gap-4">
//             <div className="w-full sm:w-1/2 md:w-1/4 mb-4 md:mb-0 flex justify-center">
//               <img src={p1} className="w-32 h-32 sm:w-40 sm:h-40" alt="Logo" />
//             </div>
//             <div className="w-full sm:w-1/2 md:w-2/4 mb-4 md:mb-0">
//               <h6 className="text-lg sm:text-xl p-4 text-center sm:text-left">
//                 Kagzaat aims at 'Digital Empowerment' by providing access to
//                 authentic digital documents to the citizen's digital document
//                 wallet.
//               </h6>
//               <h3 className="mt-4 text-lg sm:text-xl text-center sm:text-left">
//                 Follow us:
//               </h3>
//               <div className="flex justify-center sm:justify-start space-x-4 p-4 gap-3">
//                 <span>
//                   <i className="text-3xl sm:text-4xl text-blue-500">
//                     <FaFacebookF />
//                   </i>
//                 </span>
//                 <span>
//                   <i className="text-3xl sm:text-4xl text-black-500">
//                     <FaXTwitter />
//                   </i>
//                 </span>
//                 <span>
//                   <i className="text-3xl sm:text-4xl text-orange-500">
//                     <FaInstagram />
//                   </i>
//                 </span>
//                 <span>
//                   <i className="text-3xl sm:text-4xl text-red-500">
//                     <FaYoutube />
//                   </i>
//                 </span>
//               </div>
//             </div>
//             <div className="w-full sm:w-1/2 md:w-1/8 mb-4 md:mb-0">
//               <ul className="space-y-4 text-center sm:text-left text-sm">
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     About
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     FAQ
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     Statistics
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     Resources
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     Circulars
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     Sitemap
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="w-full sm:w-1/2 md:w-1/8 mb-4 md:mb-0">
//               <ul className="space-y-4 text-center sm:text-left text-sm">
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     Need Help?
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     Feedback
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     Team
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     MeriPachaan
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     Discover
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!" className="hover:text-gray-300">
//                     Privacy
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-700 pt-4 flex flex-col md:flex-row md:justify-between md:items-center text-sm">
//             <p className="mb-2 md:mb-0 text-center">
//               Last Updated: 11 Apr 2025 | Version: 2.98.0.15
//             </p>
//             <p className="opacity-75 text-center">
//               © 2025, Website maintained by National eGovernance Division (NeGD)
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;


import React from "react";
import p1 from "../assets/logo.png";
import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <div className="flex flex-col justify-between">
      <footer className="bg-gradient-to-br from-[#3d348b] to-[#00509d] text-white py-10">
        <div className="w-full px-4 md:px-8 xl:px-20 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-center sm:text-left">

            {/* Logo */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex justify-center lg:justify-start">
              <img src={p1} className="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44" alt="Logo" />
            </div>

            {/* Description and Socials */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <h6 className="text-base sm:text-lg md:text-xl mb-4">
                Kagzaat aims at 'Digital Empowerment' by providing access to
                authentic digital documents to the citizen's digital document
                wallet.
              </h6>
              <h3 className="text-base sm:text-lg md:text-xl mb-2">Follow us:</h3>
              <div className="flex justify-center sm:justify-start gap-4 text-2xl sm:text-3xl">
                <FaFacebookF className="text-blue-500 hover:scale-110 transition" />
                <FaXTwitter className="text-black hover:scale-110 transition" />
                <FaInstagram className="text-orange-500 hover:scale-110 transition" />
                <FaYoutube className="text-red-500 hover:scale-110 transition" />
              </div>
            </div>

            {/* Quick Links 1 */}
            <div className="col-span-1">
              <ul className="space-y-3 text-sm">
                <li><a href="#!" className="hover:text-gray-300">About</a></li>
                <li><a href="#!" className="hover:text-gray-300">About Us</a></li>
                <li><a href="#!" className="hover:text-gray-300">FAQ</a></li>
                <li><a href="#!" className="hover:text-gray-300">Statistics</a></li>
                <li><a href="#!" className="hover:text-gray-300">Resources</a></li>
                <li><a href="#!" className="hover:text-gray-300">Circulars</a></li>
                <li><a href="#!" className="hover:text-gray-300">Sitemap</a></li>
              </ul>
            </div>

            {/* Quick Links 2 */}
            <div className="col-span-1">
              <ul className="space-y-3 text-sm">
                <li><a href="#!" className="hover:text-gray-300">Need Help?</a></li>
                <li><a href="#!" className="hover:text-gray-300">Careers</a></li>
                <li><a href="#!" className="hover:text-gray-300">Feedback</a></li>
                <li><a href="#!" className="hover:text-gray-300">Team</a></li>
                <li><a href="#!" className="hover:text-gray-300">MeriPachaan</a></li>
                <li><a href="#!" className="hover:text-gray-300">Discover</a></li>
                <li><a href="#!" className="hover:text-gray-300">Privacy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-center">
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

export default Footer;
