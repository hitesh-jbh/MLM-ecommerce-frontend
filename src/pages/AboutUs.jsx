import React from 'react';
import IconButton from '../components/ui/IconButton.jsx';
import Breadcrumb from '../components/ui/BreadCrumb.jsx';

const AboutUs = () => {
  return (
    <main>
      {/* BreadCrumb => currentPage, prevPage and currentPage */}
      <Breadcrumb title="Contact Us" showTitle={true}
        align="center"
        items={[
            { label: "Home", href: "/" },
            { label: "Contact Us" },
        ]}
        />


      {/* --- Section 2: Main Banner --- */}
      <section className="w-full max-w-[1840px] mx-auto px-4 md:px-6 lg:px-10 mb-12 md:mb-16 lg:mb-24">
        <div className="relative overflow-hidden rounded-sm">
          <img 
            src="https://gentlehaus.in/cdn/shop/files/about_us_banner_175d66c4-5083-4403-8aa5-28c81ae439d8.webp?v=1754661865&width=1500" 
            alt="Artistry Banner" 
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* --- Section 3: Philosophy Text Section --- */}
      <section className="w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-16 text-center mb-12 md:mb-16 lg:mb-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[49px] md:leading-[1.4] font-normal font-bold mb-8 md:mb-12 lg:mb-16 text-black">
          It pains me to see men reduced to trends that strip away individuality and strength.
        </h2>
        
        <div className="text-left space-y-4 md:space-y-6 text-gray-800">
          <p className='text-lg sm:text-xl md:text-2xl lg:text-[27px] font-bold text-black leading-relaxed'>
            True style doesn't rely on fitting in — it comes from the confidence to stand apart. At Gentlehaus, we embrace the elegance of authenticity, not the pressure to appear effortless or follow what's fleeting.
          </p>
          <p className='text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 leading-relaxed'>
            At Gentlehaus, we believe true style lies in the balance of elegance and simplicity. 
            Luxury doesn't always need to shout — it can be subtle, refined, and timeless.
          </p>
          <p className='text-base sm:text-lg md:text-xl lg:text-[22px] font-normal text-gray-900 leading-relaxed'>
            We design for the modern man who lives with purpose — not for the runway, but for real life. 
            Creating fashion that resonates with individuality and confidence is never simple; 
            it's a craft that demands patience, integrity, and lasting relationships built over time.
          </p>
          <p className='text-base sm:text-lg md:text-xl lg:text-[22px] font-normal text-gray-900 leading-relaxed'>
            We avoid the noise of trends and celebrity culture. Our focus is on authenticity — 
            making clothes that uplift character, not just status. Whether you're walking into a 
            boardroom or stepping out for an evening, our pieces are crafted to make you feel 
            powerful, sophisticated, and effortlessly composed.
          </p>
          <p className='text-base sm:text-lg md:text-xl lg:text-[22px] font-normal text-gray-900 leading-relaxed'>
            Our philosophy is clear: make simplicity luxurious, make fashion empowering, 
            and make every man feel like the best version of himself.
          </p>
        </div>
      </section>

      {/* --- Section 4: Image and Text Side by Side --- */}
      <section className='w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-16 mb-12 md:mb-16 lg:mb-24'>
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10 lg:gap-20">
          
          {/* Left: Image */}
          <div className="w-full md:w-1/2">
            <img 
              src="https://gentlehaus.in/cdn/shop/files/about_us_side_banner.webp?v=1751090746&width=940" 
              alt="Brand Detail" 
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-sm object-cover object-center"
            />
          </div>

          {/* Right: Text and Feature Cards */}
          <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-black leading-tight">
              We are proudly Indian.
            </h3>
            
            {/* Feature Cards */}
            <div className="space-y-6 md:space-y-8 mt-8 md:mt-12">
              {/* Card 1 - Soft Fabric */}
              <div className="flex gap-4 md:gap-6">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <ellipse cx="24" cy="20" rx="14" ry="8"/>
                    <path d="M10 20 Q10 32 24 32 Q38 32 38 20"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl md:text-[22px] font-normal text-black mb-2 md:mb-3">
                    Soft Fabric
                  </h4>
                  <p className="text-sm sm:text-base md:text-[16px] text-gray-600 leading-relaxed">
                    Crafted with premium materials for a luxuriously smooth feel against the skin.
                  </p>
                </div>
              </div>

              {/* Card 2 - Lightweight */}
              <div className="flex gap-4 md:gap-6">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M24 8 L28 18 L38 20 L30 28 L32 38 L24 32 L16 38 L18 28 L10 20 L20 18 Z" strokeLinejoin="round"/>
                    <line x1="24" y1="12" x2="24" y2="4"/>
                    <line x1="32" y1="14" x2="36" y2="8"/>
                    <line x1="16" y1="14" x2="12" y2="8"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl md:text-[22px] font-normal text-black mb-2 md:mb-3">
                    Lightweight
                  </h4>
                  <p className="text-sm sm:text-base md:text-[16px] text-gray-600 leading-relaxed">
                    Designed to feel barely there, offering effortless wear throughout the day.
                  </p>
                </div>
              </div>

              {/* Card 3 - All Day Comfort */}
              <div className="flex gap-4 md:gap-6">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="24" cy="24" r="16"/>
                    <line x1="24" y1="24" x2="24" y2="12"/>
                    <line x1="24" y1="24" x2="32" y2="24"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl md:text-[22px] font-normal text-black mb-2 md:mb-3">
                    All Day Comfort
                  </h4>
                  <p className="text-sm sm:text-base md:text-[16px] text-gray-600 leading-relaxed">
                    Engineered for lasting comfort, whether you're at work or leisure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;