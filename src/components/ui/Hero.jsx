import React from "react";

const Hero = () => {
  return (
    <section
        className="relative w-full min-h-[55vh] md:min-h-[85vh] flex items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://gentlehaus.in/cdn/shop/files/main_banner.webp?v=1750860856&width=3840')", 
      }}
    >

      <div className="relative z-10 max-w-9xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-xl">
          <p className="text-sm md:text-base text-black mb-4">
            More Than Just Shirts.
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-black mb-8">
            A Statement of India’s <br />
            Finest Craftsmanship.
          </h1>

          <button className="bg-black text-white px-8 py-3 rounded-md text-sm border-2 border-black transition-all duration-300 hover:opacity-90 hover:text-black hover:bg-white hover:text-[14px] hover:font-bold">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
