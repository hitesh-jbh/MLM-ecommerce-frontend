import React from "react";
import { Link } from "react-router-dom";

const CoastalEdition = () => {
  return (
    <section className="w-full bg-white">
      <div
        className="
          max-w-7xl
          mx-auto
          px-4 sm:px-6 lg:px-8
          py-20 sm:py-24 lg:py-32
          text-center
        "
      >
        {/* Heading */}
        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-normal
            tracking-wide
            text-gray-900
          "
        >
          The Coastal Edition
        </h1>

        {/* Description */}
        <p
          className="
            mt-6
            max-w-xl
            mx-auto
            text-sm
            sm:text-base
            md:text-lg
            text-gray-600
            leading-relaxed
          "
        >
          Our new cozy collection is made with environmentally friendly
          materials and simple to care for so you can stay cozy wherever.
        </p>

        {/* Button */}
        <div className="mt-10">
          <Link to="/gentle"><button
            className="
              px-8
              py-3
              border
              border-black
              rounded-md
              text-sm
              sm:text-base
              font-medium
              tracking-wide
              text-black
              bg-white
              hover:bg-black
              hover:text-white
              transition-all
              duration-300
            "
          >
            Shop Now
          </button></Link>
        </div>
      </div>
    </section>
  );
};

export default CoastalEdition;

