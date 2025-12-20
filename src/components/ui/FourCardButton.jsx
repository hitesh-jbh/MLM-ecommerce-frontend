// import { useState } from 'react';

// export default function Card() {
//   const [activeLayout, setActiveLayout] = useState(4);

//   const layouts = [
//     { id: 1, columns: 1, icon: '=' },
//     { id: 2, columns: 2, icon: '||' },
//     { id: 3, columns: 3, icon: '|||' },
//     { id: 4, columns: 4, icon: '||||' },
//     { id: 5, columns: 5, icon: '|||||' },
//   ];



//   return (
//     <div className="w-full bg-white py-12 px-4 md:px-8 lg:px-12">
//       <div className="max-w-7xl mx-auto">
//         {/* Layout Buttons */}
//         <div className="flex items-center justify-end gap-3 mb-12 flex-wrap">

//           {layouts.map((layout) => (
//             <div key={layout.id} className="relative group">
//               <button
//                 onClick={() => setActiveLayout(layout.columns)}
//                 className={`
//                   w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium
//                   transition-all duration-300 ease-out
//                   ${activeLayout === layout.columns
//                     ? 'bg-gray-900 text-white shadow-lg scale-105'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 hover:shadow-md'
//                   }
//                 `}
//               >
//                 {layout.icon}
//               </button>
//               {/* Tooltip */}
//               <div className="
//                 pointer-events-none
//                 absolute -top-12 left-1/2 -translate-x-1/2
//                 bg-gray-900 text-white text-sm px-3 py-1 rounded-md
//                 opacity-0 scale-95
//                 transition-all duration-200
//                 group-hover:opacity-100 group-hover:scale-100
//                 whitespace-nowrap
//               ">
//                 {layout.columns} columns
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Cards Grid */}
//         <div className={`
//           grid gap-6 transition-all duration-500
//           ${activeLayout === 1 ? 'grid-cols-1' : ''}
//           ${activeLayout === 2 ? 'grid-cols-1 lg:grid-cols-2' : ''}
//           ${activeLayout === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
//           ${activeLayout === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : ''}
//           ${activeLayout === 5 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5' : ''}
//         `}>
//           {products.map((product) => (
//             <div key={product.id}>
//               {/* Single Column Layout - Side by Side */}
//               {activeLayout === 1 && (
//                 <div className="bg-white flex flex-col md:flex-row gap-6 items-start">
//                   {/* Image */}
//                   <div className="w-full md:w-1/3 flex-shrink-0">
//                     <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
//                       <img
//                         src={product.image}
//                         alt={product.title}
//                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 flex flex-col justify-between">
//                     <div>
//                       <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
//                         {product.title}
//                       </h3>
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                         {product.description}
//                       </p>
//                     </div>

//                     {/* Price */}
//                     <div className="flex items-center gap-3">
//                       <span className="text-red-600 font-bold text-lg">
//                         {product.price}
//                       </span>
//                       <span className="text-gray-400 line-through text-sm">
//                         {product.originalPrice}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Multi Column Layout - Image on Top */}
//               {activeLayout > 1 && (
//                 <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//                   {/* Image */}
//                   <div className="aspect-square bg-gray-100 overflow-hidden">
//                     <img
//                       src={product.image}
//                       alt={product.title}
//                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>

//                   {/* Content */}
//                   <div className="p-4">
//                     <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 line-clamp-2">
//                       {product.title}
//                     </h3>

//                     {/* Price */}
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="text-red-600 font-bold text-sm md:text-base">
//                         {product.price}
//                       </span>
//                       <span className="text-gray-400 line-through text-xs">
//                         {product.originalPrice}
//                       </span>
//                     </div>

//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react';

const FourCardButton = ({ activeLayout, setActiveLayout }) => {
  const layouts = [
    { id: 1, columns: 1, icon: '=', className: "block" },
    { id: 2, columns: 2, icon: '||', className: "block" },
    { id: 3, columns: 3, icon: '|||', className: "hidden md:block" },
    { id: 4, columns: 4, icon: '||||', className: "hidden md:block" },
    { id: 5, columns: 5, icon: '|||||', className: "hidden lg:block" },
  ];

  return (
    <div className="flex items-center justify-end gap-2 flex-wrap">
      {layouts.map((layout) => (
        <div key={layout.id} className={`relative group ${layout.className}`}>
          <button
            onClick={() => setActiveLayout(layout.columns)}
            className={`
              w-9 h-9 flex items-center justify-center rounded border transition-all duration-200
              ${activeLayout === layout.columns
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'
              }
            `}
          >
            <span className="text-xs font-bold tracking-tighter">{layout.icon}</span>
          </button>
          
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            {layout.columns} Columns
          </div>
        </div>
      ))}
    </div>
  );
};

export default FourCardButton;