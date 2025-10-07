/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: isDev
        ? ["localhost:3000"]
        : ["diffyai.vercel.app"], // your production domain
    },
  },
};

export default nextConfig;