import React from 'react'
import p1 from '../assets/you.svg'
import p2 from '../assets/thumb.svg'
import p3 from '../assets/DOWNLOAD.svg'
import { FaArrowRight } from "react-icons/fa";
export default function Lol() {
return (
    <div className='flex p-4  bg-blue-500/30 mt-20 shadow-lg '>
        <div className='flex flex-col justify-center w-1/6 ml-28 h-44 text-2xl  '>
            Getting Started with Kaagzad
        </div>
        <div className='flex justify-center ml-24 items-center gap-16'>
            <img src={p1} alt="" className='' />
            <FaArrowRight />
            <img src={p2} alt="" />
            <FaArrowRight />
            <img src={p3} alt="" />
        </div>
    </div>
)
}
