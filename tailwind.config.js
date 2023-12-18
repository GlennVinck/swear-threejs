/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./configurator.html",
    "./checkout.html",
    "./userDetails.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-accent": "#69FF47",
      },
    },
  },
  plugins: [],
};
