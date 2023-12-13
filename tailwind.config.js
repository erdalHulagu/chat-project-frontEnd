/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
  theme: {
    extend: {
        colors: {
          // Add your custom colors here
          primary: '#083344',
          // secondary: '#your_secondary_color',
          // ...
        },
    },
  },
  plugins: [],
}

