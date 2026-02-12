import React from "react";

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="w-full py-24 flex flex-col items-center justify-center border-y border-gray-100 bg-gray-50/30">
      <div className="max-w-md text-center px-6">
        <h3 className="text-xl md:text-2xl font-light text-[#1a1a1a] mb-3">
          Unable to display collection
        </h3>
        <p className="text-gray-500 text-sm md:text-base font-light mb-8">
          {message || "We encountered a temporary connection issue while fetching our latest products."}
        </p>
        <button
          onClick={onRetry}
          className="px-10 py-3 bg-black text-white text-[10px] tracking-[0.2em] uppercase hover:bg-gray-800 transition-all duration-300 ease-in-out active:scale-95"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;