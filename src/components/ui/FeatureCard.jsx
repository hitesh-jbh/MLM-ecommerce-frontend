import React from 'react';
import { IoEarthOutline } from "react-icons/io5";
import { FaShippingFast, FaExchangeAlt, FaTags, FaShieldAlt } from 'react-icons/fa';

// Single Card Component with icon on left
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className=" rounded-lg p-6  transition-shadow duration-300 bg-white">
    {/* Container for icon and content side by side */}
    <div className="flex items-start">
      {/* Circle Icon Container - Left Side */}
      <div className="flex-shrink-0 mr-4">
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
      </div>
      
      {/* Content - Right Side */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description.includes('\n') ? (
            <>
              {description.split('\n')[0]}<br />
              {description.split('\n')[1]}
            </>
          ) : (
            description
          )}
        </p>
      </div>
    </div>
  </div>
);

// Main Component
 const FeaturesSection = () => {
  // Card data with line breaks exactly as per image
  const cardsData = [
    {
      id: 1,
      icon: FaShippingFast,
      title: "Free Shipping",
      description: "Enjoy free shipping with\nprepaid orders"
    },
    {
      id: 2,
      icon: FaExchangeAlt,
      title: "Easy & Free Returns",
      description: "Returns Made Easy & Free"
    },
    {
      id: 3,
      icon: FaTags,
      title: "Best Discount",
      description: "Limited-Time Best Discount"
    },
    {
      id: 4,
      icon: FaShieldAlt,
      title: "Payment Safety",
      description: "100% Safe & Secure Shopping"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardsData.map((card) => (
          <FeatureCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};
  // return (
  //   <div className="max-w-8xl mx-auto px-10 py-12">
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  //       {cardsData.map((card) => (
  //         <FeatureCard
  //           key={card.id}
  //           icon={card.icon}
  //           title={card.title}
  //           description={card.description}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );
// };

// export default FeatureCard;
export default FeaturesSection;