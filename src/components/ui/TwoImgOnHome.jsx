import React from "react";

const IconButton = () => {
  return (
    <section className="w-full bg-[#f6f4ef]">
      <div className="max-w-7xl mx-auto">
        {/* Two images, same size, no gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Image */}
          <div className="w-full h-full">
            <img
              src="https://gentlehaus.in/cdn/shop/files/564FDS4F56DS4F4DS.webp?v=1750852637&width=1500"
              alt="Shirts Collection"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Image */}
          <div className="w-full h-full">
            <img
              src="https://gentlehaus.in/cdn/shop/files/DSFDSF4DSF5DSF5DSF5541F5SDF56_1.webp?v=1751093175&width=1500"
              alt="Model Wearing Shirt"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IconButton;
