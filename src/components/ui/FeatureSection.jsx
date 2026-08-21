import React from 'react';
import { FaShippingFast, FaExchangeAlt, FaTags, FaShieldAlt } from 'react-icons/fa';

// Single Card Component 
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group rounded-2xl p-5 md:p-6 transition-all duration-300 bg-white border border-gray-100 hover:border-dirora-purple/30 hover:shadow-lg hover:-translate-y-1">
    <div className="flex items-start">
      
      {/* Circle Icon Container - Left Side */}
      <div className="flex-shrink-0 mr-4 md:mr-5">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-purple-50 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-dirora-purple" />
        </div>
      </div>
      
      {/* Content - Right Side */}
      <div className="flex-1 mt-1">
        <h3 className="font-serif font-bold text-base md:text-lg mb-1 md:mb-2 text-gray-800 tracking-wide">
          {title}
        </h3>
        <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-sans">
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
    // Container max-width and padding adjusted for all screens
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

export default FeaturesSection;