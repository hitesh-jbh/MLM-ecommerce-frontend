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
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">

        {images.map((img, index) => (
          <div
            key={index}
            className="
              snap-start
              flex-shrink-0

              /* WIDTH */
              w-[75%]        /* mobile */
              sm:w-[50%]     /* tablet */
              md:w-[33%]
              lg:w-[20%]     /* desktop (5 visible) */

              /* HEIGHT */
              h-[200px]      /* mobile */
              sm:h-[260px]   /* tablet */
              md:h-[280px]
              lg:h-[320px]

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

                /* zoom control */
                scale-[1.02]
                sm:scale-[1.05]
                lg:scale-[1.08]

                transition-transform
                duration-700
                ease-out

                lg:group-hover:scale-[1]
              "
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default ImageShowcase;

