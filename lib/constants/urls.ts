import testSwitch from "@/utils/test/TestSwitch";

const homeUrl = testSwitch<string>({
  live: "https://www.sacbe-ceremonial-cacao.com",
  test:
    process.env.NEXT_PUBLIC_VERCEL_ENV == "preview"
      ? "https://sacbe-ceremonial-cacao-brucemckayone.vercel.app"
      : "http://localhost:3000",
});

export default homeUrl;
