import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[92vh] flex items-center overflow-hidden bg-ink">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-[center_20%]"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/19647000/pexels-photo-19647000.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      />
      {/* Gradient scrim for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="gem-divider" />
            <p className="text-[11px] md:text-xs tracking-[0.35em] uppercase text-champagne-light font-medium">
              The Heritage Collection
            </p>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-ivory mb-3">
            Jewelry Worth
          </h1>
          <h1 className="font-display italic text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-champagne mb-8">
            Passing Down.
          </h1>

          <p className="text-sm md:text-base text-ivory/70 max-w-md mb-10 leading-relaxed">
            Hallmarked gold and diamond pieces, handcrafted by India's finest
            karigars — designed to be worn today and treasured for generations.
          </p>

          <div className="flex items-center gap-5">
            <Link to="/gentle">
              <button className="bg-champagne text-ink px-9 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:bg-champagne-light">
                Shop Now
              </button>
            </Link>
            <Link
              to="/luxuria"
              className="text-xs tracking-[0.2em] uppercase text-ivory border-b border-champagne/60 pb-1 hover:text-champagne transition-colors"
            >
              View Luxuria Edit
            </Link>
          </div>
        </div>
      </div>

      {/* Thin gold baseline */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent" />
    </section>
  );
};

export default Hero;
