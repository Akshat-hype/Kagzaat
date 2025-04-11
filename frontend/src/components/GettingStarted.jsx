// import React from 'react';
// import p1 from '../assets/you.svg';
// import p2 from '../assets/thumb.svg';
// import p3 from '../assets/DOWNLOAD.svg';
// import { FaArrowRight } from "react-icons/fa";

// export default function Lol() {
//     return (
//         <div className="flex flex-col md:flex-row p-4 bg-blue-500/30 mb-20 mt-20 justify-center items-center">
//             <div className="flex flex-col justify-center w-full md:w-1/6 h-20 md:h-44 text-xl md:text-2xl text-center md:text-left">
//                 Getting Started with Kagzaat
//             </div>
//             <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mt-4 md:mt-0">
//                 <img src={p1} alt="" className="w-16 md:w-auto" />
//                 <FaArrowRight className="hidden md:block" />
//                 <img src={p2} alt="" className="w-16 md:w-auto" />
//                 <FaArrowRight className="hidden md:block" />
//                 <img src={p3} alt="" className="w-16 md:w-auto" />
//             </div>
//         </div>
//     );
// }

//ADDED RESPONSIVENESS TO THE CODE BY CHANGING ARROWS TO DOWN ARROWS IN MOBILE VIEW

import React from 'react';
import p1 from '../assets/you.svg';
import p2 from '../assets/thumb.svg';
import p3 from '../assets/DOWNLOAD.svg';
import { FaArrowRight, FaArrowDown } from "react-icons/fa";

export default function Lol() {
    return (
        <div className="flex flex-col md:flex-row p-4 bg-blue-500/30 mb-20 mt-20 justify-center items-center">
            {/* Title Section */}
            <div className="flex flex-col justify-center w-full md:w-1/6 h-20 md:h-44 text-xl md:text-2xl text-center md:text-left">
                Getting Started with Kagzaat
            </div>

            {/* Icon Steps */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mt-4 md:mt-0">
                <img src={p1} alt="step1" className="w-16 md:w-auto" />

                {/* Arrows */}
                <FaArrowRight className="hidden md:block text-gray-600" />
                <FaArrowDown className="md:hidden text-gray-600" />

                <img src={p2} alt="step2" className="w-16 md:w-auto" />

                <FaArrowRight className="hidden md:block text-gray-600" />
                <FaArrowDown className="md:hidden text-gray-600" />

                <img src={p3} alt="step3" className="w-16 md:w-auto" />
            </div>
        </div>
    );
}
