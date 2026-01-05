import React from 'react';
import { Link } from 'react-router-dom';

const ProfileMenuCard = ({ sections, pageTitle }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {pageTitle && (
        <h2 className="text-2xl font-bold text-black mb-6">{pageTitle}</h2>
      )}
      
      {/* Grid Container matching your reference image layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((item, index) => (
          <Link 
            key={index}
            to={item.linkTo || "#"} 
            className="flex p-5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
          >
            {/* Icon Container - using your black and white theme */}
            <div className="flex-shrink-0 mr-5 flex items-center justify-center">
              {item.icon}
            </div>
            
            {/* Text Container */}
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-bold text-black group-hover:underline">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileMenuCard;