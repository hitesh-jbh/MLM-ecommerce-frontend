import React from "react";

const ScrollingBanner = () => {
  const bannerItems = [
    {
      id: 1,
      text: "Effortless Style, Everyday Wear",
      img: "https://gentlehaus.in/cdn/shop/files/categories-4-min.webp?v=1750849138",
    },
    {
      id: 2,
      text: "Crafted for the Modern Man",
      img: "https://gentlehaus.in/cdn/shop/files/categories-2-min.webp?v=1750849137",
    },
    {
      id: 3,
      text: "Elevate Your Wardrobe Instantly",
      img: "https://gentlehaus.in/cdn/shop/files/categories-3-min.webp?v=1750849138",
    },
  ];

  // Tripled for smoother looping
  const scrollList = [...bannerItems, ...bannerItems, ...bannerItems];

  return (
  <div className="w-full overflow-hidden bg-white border-y border-gray-100 py-6 md:py-10">
    {/* Change 'animate-marquee' to 'animate-marquee-infinite' */}
    <div className="flex animate-marquee-infinite items-center hover:[animation-play-state:paused] cursor-default">
      {scrollList.map((item, index) => (
        <div key={`${item.id}-${index}`} className="flex items-center flex-shrink-0">
          <span className="text-3xl md:text-5xl font-normal text-[#1a1a1a] tracking-tight whitespace-nowrap px-10 md:px-20">
            {item.text}
          </span>
          <div className="w-16 h-16 md:w-28 md:h-28 rounded-full bg-[#eeeeee] flex items-center justify-center overflow-hidden">
            <img
              src={item.img}
              alt="product"
              className="w-[70%] h-[70%] object-contain mix-blend-multiply"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default ScrollingBanner;


// import React from "react";

// const ScrollingBanner = ({ 
//   items = [], 
//   speed = "15s", 
//   bgColor = "bg-white" 
// }) => {
//   // Tripled for smoother looping
//   const scrollList = [...items, ...items, ...items];

//   return (
//     <div 
//       className={`w-full overflow-hidden border-y border-gray-100 py-6 md:py-10 ${bgColor}`}
//       style={{ "--duration": speed }} // Passing the speed prop to Tailwind CSS variable
//     >
//       <div className="flex animate-marquee-infinite items-center hover:[animation-play-state:paused] cursor-default">
//         {scrollList.map((item, index) => (
//           <div
//             key={`${item.id}-${index}`}
//             className="flex items-center flex-shrink-0"
//           >
//             {/* Text Content */}
//             <span className="text-3xl md:text-5xl font-normal text-[#1a1a1a] tracking-tight whitespace-nowrap px-10 md:px-20">
//               {item.text}
//             </span>

//             {/* Image or Dot Logic */}
//             <div className="flex items-center justify-center">
//               {item.img ? (
//                 <div className="w-16 h-16 md:w-28 md:h-28 rounded-full bg-[#eeeeee] flex items-center justify-center overflow-hidden">
//                   <img
//                     src={item.img}
//                     alt="product"
//                     className="w-[70%] h-[70%] object-contain mix-blend-multiply"
//                   />
//                 </div>
//               ) : (
//                 /* Fallback Dot (Unordered list style) */
//                 <div className="w-4 h-4 md:w-6 md:h-6 bg-black rounded-full mx-4" />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default function App() {
//   const myData = [
//     { 
//         id: 1, 
//         text: "Summer Sale 50% Off", 
//         img: "https://gentlehaus.in/cdn/shop/files/categories-4-min.webp?v=1750849138" 
//     },
//     { 
//         id: 2, 
//         text: "New Arrivals", 
//         img: "" // Empty string triggers the dot
//     }, 
//     { 
//         id: 3, 
//         text: "Limited Edition", 
//         img: "https://gentlehaus.in/cdn/shop/files/categories-3-min.webp?v=1750849138" 
//     },
//   ];

//   return (
//     <div className="min-h-screen py-20">
//       <ScrollingBanner 
//         items={myData} 
//         speed="8s"        // Increased speed (lower value is faster)
//         bgColor="bg-slate-50" // Dynamic background prop
//       />
//     </div>
//   );
// }

// export default ScrollingBanner;