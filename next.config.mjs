/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org'],
    unoptimized: true,
  }
};

export default nextConfig;
