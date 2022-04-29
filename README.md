Para dar inicio no tailwind: 
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

tailwind.config.js file ===>
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

globals.css ===>
@tailwind base;
@tailwind components;
@tailwind utilities;

comando: npm run dev