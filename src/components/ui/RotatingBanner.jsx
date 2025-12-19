import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const messages = [
  "Enjoy free shipping with prepaid orders",
  <>
    Open Doors To A World Of Fashion |{" "}
    <a href="#" className="underline font-semibold">
      Discover More
    </a>
  </>,
];

export default function RotatingBanner() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState("enter"); // enter | center | exit

  // Auto animation loop
  useEffect(() => {
    if (!visible) return;

    const cycle = () => {
      setPhase("exit"); // move left
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setPhase("enter"); // start from right
        setTimeout(() => setPhase("center"), 80);
      }, 300);
    };

    const interval = setInterval(cycle, 3000);
    setPhase("center");

    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="w-full bg-black text-white overflow-hidden">
      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-2">

        {/* Left */}
        <button
          onClick={() =>
            setIndex((prev) => (prev - 1 + messages.length) % messages.length)
          }
          className="text-white/70 hover:text-white"
        >
          <LuChevronLeft size={25} />
        </button>

        {/* Text */}
        <div className="relative w-full max-w-md h-6 sm:h-7 overflow-hidden">
          <div
            className={`
              absolute inset-0 flex items-center justify-center
              transition-transform duration-300 ease-in-out
              ${
                phase === "enter"
                  ? "translate-x-full"
                  : phase === "center"
                  ? "translate-x-0"
                  : "-translate-x-full"
              }
            `}
          >
            <p className="text-xs sm:text-sm md:text-base whitespace-nowrap">
              {messages[index]}
            </p>
          </div>
        </div>

        {/* Right */}
        <button
          onClick={() =>
            setIndex((prev) => (prev + 1) % messages.length)
          }
          className="text-white/70 hover:text-white"
        >
          <LuChevronRight size={25} />
        </button>

        {/* Close */}
        <button
          onClick={() => {
            setVisible(false);
            localStorage.setItem("bannerDismissed", "true");
          }}
          className="absolute right-3 sm:right-4 text-white/80 hover:text-white"
        >
          <IoClose size={25} />
        </button>
      </div>
    </div>
  );
}
