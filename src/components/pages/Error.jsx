import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from "../ui/Icon.jsx"; 

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      
      {/* 1. Scaled Down Visual Element */}
      <div className="mb-2 md:mb-6 opacity-10 transition-opacity">
        {/* icon size scales based on screen width */}
        <Icons 
          icon="heroicons:shopping-bag" 
          className="text-black w-16 h-16 md:w-24 md:h-24" 
        />
      </div>

      {/* 2. Error Content Container */}
      <div className="text-center w-full max-w-[90%] sm:max-w-md lg:max-w-lg mx-auto">
        
        {/* Decreased Size 404: 
            text-6xl (~60px) on mobile
            text-8xl (~96px) on tablet
            text-9xl (~128px) on desktop 
        */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-light leading-none tracking-tighter text-black mb-2">
          404
        </h1>
        
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 mb-4 uppercase tracking-[0.15em]">
          Page Not Found
        </h2>
        
        <p className="text-gray-500 text-xs sm:text-sm md:text-base mb-8 font-light leading-relaxed max-w-[280px] sm:max-w-none mx-auto">
          The collection or product you are looking for has been moved, 
          deleted, or never existed in our catalog.
        </p>

        {/* 3. Responsive Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4 sm:px-0">
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto min-w-[160px] bg-black text-white px-6 py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 border-2 border-black hover:bg-white hover:text-black hover:text-[13px] hover:font-bold active:scale-95"
          >
            Return to Home
          </button>
          
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto min-w-[160px] bg-white border-2 border-black text-black px-6 py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-black hover:text-white hover:text-[13px] hover:font-bold active:scale-95"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* 4. Minimalist Footer */}
      <div className="mt-auto pt-10 sm:absolute sm:bottom-8">
        <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} Gentlehaus India
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;