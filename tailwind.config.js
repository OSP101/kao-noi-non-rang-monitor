/** @type {import('tailwindcss').Config} */
// const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // brand colors
        background: '#101C42',
        text: 'white',
        bgColor: '#FBBF4A',
        bgColorGradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
        white: 'white',
        blue: '#392D4E',
        orange: '#FBBF4A',
        orange2: '#FFCF52',
        gray: '#F1F3F5',
        gray2: '#8D8D8D',
        success: '#17C964',
        yellow: {
          100: '#fef9c3',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#713f12',
        },
      },
    },
  }
};
