/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  images: {
    domains: ["www.thirdeyetribe.co.uk"],
  },
  env: {
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    STRIPE_PUBLIC: process.env.STRIPE_PUBLIC,
  },
};

module.exports = nextConfig;
