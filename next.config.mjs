/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  productionBrowserSourceMaps: true,
  images: {
    domains: [
      "www.thirdeyetribe.co.uk",
      "picsum.photos",
      "files.stripe.com",
      "127.0.0.1",
      "firebasestorage.googleapis.com",
      "localhost",
      "upload.wikimedia.org",
      "sacbe-ceremonial-cacao.com",
      "encrypted-tbn0.gstatic.com",
    ],
  },

  env: {
    // STRIPE_SECRET: envConfig.STRIPE_SECRET,
    NEXT_PUBLIC_STRIPE_PUBLIC: process.env.NEXT_PUBLIC_STRIPE_PUBLIC,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    // STRIPE_WEBHOOK_ENDPOINT: envConfig.STRIPE_WEBHOOK_ENDPOINT,
    // // MAILCHIMP_SECRET: envConfig.MAILCHIMP_SECRET,
    // NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

export default nextConfig;
