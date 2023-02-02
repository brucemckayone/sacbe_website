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
      transparent: "transparent",
      //primary
      primary: "#8f4e00",
      onPrimary: "#ffffff",
      primaryContainer: "#ffdcc2",
      onPrimaryContainer: "#2e1500",
      //secondary
      secondary: "#745b00",
      onSecondary: "#ffffff",
      secondaryContainer: "#ffe08e",
      onSecondaryContainer: "#241a00",
      //teriary
      tertiary: "#855300",
      onTertiary: "#ffffff",
      tertiaryContainer: "#ffddb8",
      onTertiaryContainer: "#2a1700",
      //error
      error: "#ba1a1a",
      onError: "#ffffff",
      errorContainer: "#ffdad6",
      onErrorContainer: "#410002",
      //background
      background: "#fffbff",
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
    },
  },
  plugins: [],
};
