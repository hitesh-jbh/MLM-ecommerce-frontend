export default function Card({ activeLayout }) {
  const isHorizontal = activeLayout === 1;

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <div
        className={`
          bg-white rounded-xl overflow-hidden border border-gray-200
          transition-all duration-500 ease-in-out
          ${isHorizontal ? 'flex flex-row' : 'flex flex-col'}
        `}
      >
        {/* IMAGE */}
        <div
          className={`
            bg-gray-100 flex items-center justify-center
            ${isHorizontal ? 'w-1/2 order-2' : 'w-full'}
          `}
        >
          <img
            src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
            alt="shirt"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div
          className={`
            p-6 flex flex-col justify-between
            ${isHorizontal ? 'w-1/2 order-1' : 'w-full'}
          `}
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Men's Full Sleeve Cotton Shirt with ‘California’ Typography
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-red-500 text-lg font-semibold">
                Rs. 971.00
              </span>
              <span className="text-gray-400 line-through">
                Rs. 1,479.00
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Bring elegance and charm to your wardrobe with this men’s cotton
              shirt featuring a beautifully designed typography pattern.
              Perfect for casual and streetwear looks.
            </p>
          </div>

          <button className="mt-6 w-fit bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
