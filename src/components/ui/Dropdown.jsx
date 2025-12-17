import { useState, useRef, useEffect } from "react";

/* ================= SORT DROPDOWN ================= */

const Dropdown = ({ options, defaultValue, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find((opt) => opt.value === defaultValue) || options[0]
  );

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2
          px-4 py-2.5
          bg-white text-gray-800
          border border-gray-300
          rounded-sm
          text-sm font-medium
          hover:border-gray-400
          focus:outline-none focus:ring-1 focus:ring-gray-300
        "
      >
        <span className="text-[20px] ">{selectedOption.label}</span>

        <svg
          className={`w-3.5 h-3.5 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
            absolute top-full right-0 mt-1 w-60
            bg-white
            border border-gray-200
            shadow-lg
            rounded-sm
            z-50
            py-1
          "
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`
                w-full text-left px-4 py-2.5
                text-[20px]
                hover:bg-gray-100
                transition-colors
                ${
                  selectedOption.value === option.value
                    ? "bg-gray-100 font-medium text-gray-900"
                    : "text-gray-700"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ================= DEMO PAGE ================= */

const Demo = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Zebra Print Tee", price: 29.99, date: new Date("2024-01-15") },
    { id: 2, name: "Apple Sweatshirt", price: 49.99, date: new Date("2024-02-20") },
    { id: 3, name: "Classic Hoodie", price: 39.99, date: new Date("2024-01-10") },
    { id: 4, name: "Beige Jacket", price: 79.99, date: new Date("2024-03-05") },
    { id: 5, name: "Denim Shirt", price: 34.99, date: new Date("2024-02-01") },
  ]);

  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Best selling", value: "best-selling" },
    { label: "Alphabetically, A-Z", value: "alpha-asc" },
    { label: "Alphabetically, Z-A", value: "alpha-desc" },
    { label: "Price, low to high", value: "price-asc" },
    { label: "Price, high to low", value: "price-desc" },
    { label: "Date, old to new", value: "date-asc" },
    { label: "Date, new to old", value: "date-desc" },
  ];

  const handleSort = (sortValue) => {
    const sorted = [...products];

    switch (sortValue) {
      case "alpha-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alpha-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "date-asc":
        sorted.sort((a, b) => a.date - b.date);
        break;
      case "date-desc":
        sorted.sort((a, b) => b.date - a.date);
        break;
      default:
        break;
    }

    setProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {/* <h1 className="text-2xl font-semibold text-gray-900">Products</h1> */}
          <Dropdown
            options={sortOptions}
            defaultValue="best-selling"
            onChange={handleSort}
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="
                bg-white
                rounded-md
                border border-gray-200
                p-4
                hover:shadow-lg
                transition-shadow
              "
            >
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-md mb-4" />

              <h3 className="text-sm font-medium text-gray-900 mb-1">
                {product.name}
              </h3>

              <p className="text-gray-900 font-semibold mb-1">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-xs text-gray-500">
                Added: {product.date.toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Demo;
