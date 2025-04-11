import React from "react";

export default function Card() {
  return (
    <>
      <div class="p-4 m-20 flex justify-between bg-[#00509d] rounded-3xl shadow-lg">
        <span class="text-xs p-10">
          <h1 class="text-5xl font-bold text-white">Aadhar Card</h1>
          <h2 class="text-2xl my-12">Your Name</h2>
          <h3 class="text-2xl my-12">XXXX XXXX XXXX</h3>
        </span>
        <span class="flex justify-end">
          <img
            class="h-80 w-80 rounded-xl mr-8 bg-white"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
            alt="kiki"
          />
        </span>
      </div>
    </>
  );
}
