import React from "react";

export default function TopAnnouncement() {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <p className="
          text-center 
          text-[10px] 
          xs:text-xs 
          sm:text-sm 
          md:text-sm 
          font-semibold 
          tracking-wide 
          text-black 
          leading-relaxed
          break-words
        ">
          BUY 2 GET 1 FREE | USE CODE :{" "}
          <span className="font-bold">GET1FREE</span>
        </p>
      </div>
    </div>
  );
}

