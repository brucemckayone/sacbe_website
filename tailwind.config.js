const { transform } = require("typescript");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      sacbeBrandColor: "#FF932F",
      recommendedGreen: "#D2FEB0",
      pinkContainer: "#FEE6EA",
      transparent: "transparent",
      //primary
      primary: "#8f4e00",
      onPrimary: "#ffffff",
      primaryContainer: "#ffdcc2",
      onPrimaryContainer: "#2e1500",
      //secondary
      secondary: "#745b00",
      onSecondary: "#ffffff",
      secondaryContainer: "#FFF5E5",
      onSecondaryContainer: "#241a00",
      //teriary
      tertiary: "#855300",
      onTertiary: "#ffffff",
      tertiaryContainer: "#FFF5E5",
      onTertiaryContainer: "#2a1700",
      //error
      error: "#ba1a1a",
      onError: "#ffffff",
      errorContainer: "#ffdad6",
      onErrorContainer: "#410002",
      //background
      background: "#f3dfd1",
      onBackground: "#3e0021",
      surface: "#fffbff",
      onSurface: "#3e0021",
      surfaceVarient: "#f3dfd1",
      onSurfaceVarient: "#51443b",
      //outline
      outline: "#847469",
    },
    fontFamily: {
      display: "var(--display-font)",
      body: "var(--body-font)",
    },
    extend: {
      backgroundImage: {
        "hero-sacbe": "/src/public/sacbe_image.jpg",
      },
      keyframes: {
        slide_in_left: {
          "0%": { transform: "translateX(-20em);", opacity: 0 },

          "100%": { transform: "translateX(0em);", opacity: 1 },
        },
        slide_in_up: {
          "0%": { transform: "translateY(20em);", opacity: 0 },

          "100%": { transform: "translateY(0em);", opacity: 1 },
        },
        float: {
          "0%": {
            transform: "translateX(1em);",
          },
          "0%": {
            transform: "rotate(0deg)",
          },

          "25%": {
            transform: "translateX(-3em);",
          },
          "25%": {
            transform: "rotate(15deg)",
          },
          "50%": {
            transform: "translateX(-3em);",
          },
          "50%": {
            transform: "rotate(-15deg)",
          },

          "100%": {
            transform: "translateX(1em);",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
        scale_shadow: {
          "0%": {
            transform: " scaleX(.7);",
          },

          "25%": {
            transform: "scaleX(0.8);",
          },

          "40%": {
            transform: "scaleX(0.7);",
          },

          "50%": {
            transform: "scaleX(0.8);",
          },

          "100%": {
            transform: "scaleX(0.7);",
          },
        },
      },
      animation: {
        slide_in_left_fade: "slide_in_left 1s ease-in-out",
        slide_out_left_fade: "slide_in_left 1s ease-in-out reverse",
        slide_in_up_fade: "slide_in_up 1s ease-in-out",
        float: "float 3s ease-in-out infinite",
        scale_shadow: "scale_shadow 3s ease-in-out infinite",
      },
      scale: {
        "-100": "-1",
      },
    },
  },
  plugins: [],
};
