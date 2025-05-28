/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#002147", // dark blue
        secondary: "#007B8A", // turquoise
        lightgray: "#F5F5F5",
        'est-green': "#00b43d", // vert EST Salé
        'est-blue': "#006faf"  // bleu EST Salé
      },
    },
  },
  plugins: [],
}
