import { useState } from 'react';

export default function NavButtons() {
  const [activeNav, setActiveNav] = useState('Gentle Trends');

  const navItems = ['Home', 'Gentle Trends', 'Luxuria', 'Contact Us', 'About Us'];

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-center gap-8 py-6">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className="relative pb-2 text-lg font-medium text-gray-700 whitespace-nowrap transition-colors hover:text-black group"
            >
              {item}

              {/* Hover underline */}
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
