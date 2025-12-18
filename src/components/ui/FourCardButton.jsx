import { useState } from 'react';

export default function Card() {
  const [activeLayout, setActiveLayout] = useState(4);

  const layouts = [
    { id: 1, columns: 1, icon: '=' },
    { id: 2, columns: 2, icon: '||' },
    { id: 3, columns: 3, icon: '|||' },
    { id: 4, columns: 4, icon: '||||' },
    { id: 5, columns: 5, icon: '|||||' },
  ];

  const products = [
    {
      id: 1,
      image: 'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
      title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
      price: 'Rs. 971.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
    },
    {
      id: 2,
      image: 'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
      title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
      price: 'Rs. 974.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
    },
    {
      id: 3,
      image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
      title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
      price: 'Rs. 971.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
    },
    {
      id: 4,
      image: 'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',
      title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
      price: 'Rs. 974.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
    },
  ];

  return (
    <div className="w-full bg-white py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Layout Buttons */}
        <div className="flex items-center justify-end gap-3 mb-12 flex-wrap">

          {layouts.map((layout) => (
            <div key={layout.id} className="relative group">
              <button
                onClick={() => setActiveLayout(layout.columns)}
                className={`
                  w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium
                  transition-all duration-300 ease-out
                  ${activeLayout === layout.columns
                    ? 'bg-gray-900 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 hover:shadow-md'
                  }
                `}
              >
                {layout.icon}
              </button>
              {/* Tooltip */}
              <div className="
                pointer-events-none
                absolute -top-12 left-1/2 -translate-x-1/2
                bg-gray-900 text-white text-sm px-3 py-1 rounded-md
                opacity-0 scale-95
                transition-all duration-200
                group-hover:opacity-100 group-hover:scale-100
                whitespace-nowrap
              ">
                {layout.columns} columns
              </div>
            </div>
          ))}
        </div>

        {/* Cards Grid */}
        <div className={`
          grid gap-6 transition-all duration-500
          ${activeLayout === 1 ? 'grid-cols-1' : ''}
          ${activeLayout === 2 ? 'grid-cols-1 lg:grid-cols-2' : ''}
          ${activeLayout === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
          ${activeLayout === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : ''}
          ${activeLayout === 5 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5' : ''}
        `}>
          {products.map((product) => (
            <div key={product.id}>
              {/* Single Column Layout - Side by Side */}
              {activeLayout === 1 && (
                <div className="bg-white flex flex-col md:flex-row gap-6 items-start">
                  {/* Image */}
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                      <span className="text-red-600 font-bold text-lg">
                        {product.price}
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        {product.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Multi Column Layout - Image on Top */}
              {activeLayout > 1 && (
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Image */}
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-red-600 font-bold text-sm md:text-base">
                        {product.price}
                      </span>
                      <span className="text-gray-400 line-through text-xs">
                        {product.originalPrice}
                      </span>
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}