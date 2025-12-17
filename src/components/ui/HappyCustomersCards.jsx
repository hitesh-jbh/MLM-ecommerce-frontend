import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HappyCustomersCards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const customers = [
    { id: 1, name: "Rohit D.", rating: 5, title: "The Gentleman's Choice 🕴", review: "Absolutely loved the fit and fabric! Gentlehaus is now my go-to for classy everyday looks. 👔✨" },
    { id: 2, name: "Kunal M.", rating: 5, title: "Styled. Delivered. Loved 💬", review: "Quality is top-notch, and the prints are so unique! Got compliments on day one. 🔥💃" },
    { id: 3, name: "Aman P.", rating: 5, title: "Voices of Style 💯", review: "I rarely shop online for clothes, but Gentlehaus changed my mind. Worth every penny! 👗💯" },
    { id: 4, name: "Priya S.", rating: 5, title: "Fashion Forward", review: "The designs are trendy and the customer service is exceptional. Highly recommend! ⭐🎉" },
    { id: 5, name: "Vikram K.", rating: 5, title: "Premium Quality", review: "Best purchase ever! The fabric quality is amazing and delivery was super fast. 🚀👍" },
  ];

  const cardsPerView = 3; // desktop logic
  const totalSlides = Math.ceil(customers.length / cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-light text-gray-800">
            Happy Customers
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronLeft />
            </button>

            {/* Slide Counter */}
            <span className="text-sm text-gray-600">
              {currentIndex + 1} / {totalSlides}
            </span>

            <button
              onClick={handleNext}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="min-w-full md:min-w-[50%] lg:min-w-[33.3333%] px-3"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm h-full">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {customer.name}
                  </h3>

                  <div className="flex gap-1 mb-2">
                    {[...Array(customer.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <h4 className="text-sm font-semibold mb-2">
                    {customer.title}
                  </h4>

                  <p className="text-sm text-gray-600">
                    {customer.review}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
