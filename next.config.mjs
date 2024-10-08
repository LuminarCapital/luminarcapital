/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        pathname: '**',
        port: '3000',
        protocol: 'http',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'images.pexels.com',
        protocol: 'https',
      },
      {
        hostname: 'www.luminarcapital.studiopresto.dev',
        protocol: 'https',
      },
      {
        hostname: 'admin.luminarcapital.com',
        protocol: 'https',
      },
    ]
  },
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL
  }
};

export default nextConfig;
