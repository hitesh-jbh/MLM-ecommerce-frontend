/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['Montserrat', 'Arial'],
      },
      animation: {
        // Match the animation duration to the distance traveled
        "marquee-infinite": "marquee 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // Move half the width (since we have 2 identical sets)
        },
      },
    },
  },
  plugins: [],
};
