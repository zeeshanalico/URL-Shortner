/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        //   pathname: '/account123/**',
      },]

  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default nextConfig;
