/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },

  images: {
    domains: ["www.thirdeyetribe.co.uk", "picsum.photos"],
  },
  env: {
    // STRIPE_SECRET: envConfig.STRIPE_SECRET,
    // STRIPE_PUBLIC: envConfig.STRIPE_PUBLIC,
    // STRIPE_WEBHOOK_ENDPOINT: envConfig.STRIPE_WEBHOOK_ENDPOINT,
    // // MAILCHIMP_SECRET: envConfig.MAILCHIMP_SECRET,
    // NEXTAUTH_SECRET: envConfig.NEXTAUTH_SECRET,
  },
};

export default nextConfig;
