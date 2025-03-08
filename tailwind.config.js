/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        main : "#4fa74f" ,
        second : "#576177"
      }
    },
  },
  plugins: ["flowbite/plugin"],
}

