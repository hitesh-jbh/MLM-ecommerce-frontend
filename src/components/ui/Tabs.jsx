import React from 'react';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="max-w-[1440px] px-3 md:px-3 mt-4">
      {/* Tab Headers */}
      <div className="flex gap-6 md:gap-10 border-b border-gray-100 overflow-x-auto no-scrollbar scroll-smooth">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm md:text-lg font-bold whitespace-nowrap transition-all relative outline-none ${
              activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
            {/* Animated Underline */}
            <div 
              className={`absolute bottom-0 left-0 w-full h-0.5 md:h-1 bg-black transition-transform duration-300 origin-left ${
                activeTab === tab.id ? 'scale-x-100' : 'scale-x-0'
              }`} 
            />
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="py-6 md:py-10 text-gray-700 text-md md:text-base leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;