/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#00BFDD",
        secondary: {
          DEFAULT: "#126078",
          100: "#0396B7"
        },
        gray: {
          DEFAULT: "#F4F4F4"
        },
        green: {
          400: "#5CC3B5",
          600: "#218076"
        }
      },
      fontFamily: {
        rthin: ["Roboto-Thin", "sans-serif"],
        rlight: ["Roboto-Light", "sans-serif"],
        rregular: ["Roboto-Regular", "sans-serif"],
        rmedium: ["Roboto-Medium", "sans-serif"],
        rbold: ["Roboto-Bold", "sans-serif"],
        rblack: ["Roboto-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}
