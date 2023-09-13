const homeUrl =
  (process.env.NODE_ENV == "production")
    ? "https://www.sacbe-ceremonial-cacao.com"
    : "http://localhost:3000";
export default homeUrl;
