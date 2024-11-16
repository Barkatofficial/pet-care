/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    loader: 'default',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'petcare-api.up.railway.app',
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  },

  experimental: {
    esmExternals: true,
  },

  webpack: (config) => {
    return config;
  },

  trailingSlash: false, // Set to true if you want URLs to have trailing slashes (e.g., /about/)
};

export default nextConfig;
