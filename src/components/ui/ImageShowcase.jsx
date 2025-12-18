import React from "react";

const images = [
  "https://gentlehaus.in/cdn/shop/files/ins-main-1.webp?v=1752232953&width=360",
  "https://gentlehaus.in/cdn/shop/files/ins-main-2.webp?v=1752232953&width=360",
  "https://gentlehaus.in/cdn/shop/files/ins-main-3.webp?v=1752232953&width=360",
  "https://gentlehaus.in/cdn/shop/files/ins-main-4.webp?v=1752232953&width=360",
  "https://gentlehaus.in/cdn/shop/files/ins-main-5.webp?v=1752232953&width=360",
];

const ImageShowcase = () => {
  return (
    <div className="w-full overflow-hidden">
      <div
        className="
          flex
          overflow-x-auto
          snap-x snap-mandatory
          scrollbar-hide
        "
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="
              snap-start
              flex-shrink-0
              w-[85%]        /* mobile */
              sm:w-[60%]     /* tablet */
              lg:w-[20%]     /* desktop (5 visible) */
              h-[300px]
              relative
              overflow-hidden
              group
            "
          >
            <img
              src={img}
              alt="fashion"
              className="
                w-full
                h-full
                object-cover
                transform
                scale-[1.08]
                transition-all
                duration-700
                ease-out
                group-hover:scale-[1]
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageShowcase;
