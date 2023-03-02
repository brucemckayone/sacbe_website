const homeUrl =
  process.env.NODE_ENV == "production"
    ? "https://sacbe-ceremonial-cacao.vercel.app/"
    : "http://localhost:3000";
export default homeUrl;
