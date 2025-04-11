// import React from "react";

// export default function Card() {
//   return (
//     <>
//       <div class="p-4 m-4 md:m-10 lg:m-20 flex flex-col md:flex-row justify-between bg-[#00509d] rounded-3xl shadow-lg">
//         <span class="text-xs p-4 md:p-10">
//           <h1 class="text-3xl md:text-5xl font-bold text-white">Aadhar Card</h1>
//           <h2 class="text-xl md:text-2xl font-bold text-white my-6 md:my-12">Your Name</h2>
//           <h3 class="text-xl md:text-2xl font-bold text-white my-6 md:my-12">XXXX XXXX XXXX</h3>
//         </span>
//         <span class="flex justify-center md:justify-end mt-4 md:mt-0">
//           <img
//             class="h-40 w-40 md:h-80 md:w-80 rounded-xl bg-white"
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
//             alt="kiki"
//           />
//         </span>
//       </div>
//     </>
//   );
// }

import React from "react";

export default function Card() {
  return (
    <div className="p-4 m-4 sm:m-6 md:m-10 lg:m-20 bg-[#00509d] rounded-3xl shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">
            Aadhar Card
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white my-4 sm:my-6 md:my-12">
            Your Name
          </h2>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white my-4 sm:my-6 md:my-12">
            XXXX XXXX XXXX
          </h3>
        </div>

        {/* Image Section */}
        <div className="flex justify-center md:justify-end w-full md:w-auto">
          <img
            className="h-32 w-32 sm:h-40 sm:w-40 md:h-60 md:w-60 lg:h-72 lg:w-72 rounded-xl bg-white"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
            alt="QR Code"
          />
        </div>
      </div>
    </div>
  );
}
