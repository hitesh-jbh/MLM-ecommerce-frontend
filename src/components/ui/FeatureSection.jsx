import React from 'react';
import Icons from '../ui/Icon.jsx';

const FeatureSection = ({ iconName, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-3 sm:p-5 lg:p-6 group w-full transition-all">
      
      {/* Icon Container: 
          Reduced stroke/weight feel by using text-gray-700 instead of 800 
      */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mb-3 md:mb-4 text-gray-700 transition-transform duration-300 group-hover:scale-110">
        <Icons icon={iconName} className="w-full h-full" />
      </div>

      <div className="flex flex-col items-center">
        {/* Title:
            Changed 'font-bold' to 'font-medium' for a cleaner, non-bold look.
            Fixed 'text' to 'text-base' for mobile.
        */}
        <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-1 md:mb-2 tracking-tight">
          {title}
        </h3>

        {/* Description:
            Using font-normal (default) for maximum readability.
        */}
        <p className="text-gray-500 text-xs sm:text-sm font-normal leading-relaxed max-w-[220px] sm:max-w-[280px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureSection;