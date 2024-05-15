/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gnfd-testnet-sp1.bnbchain.org",
        port: "",
        pathname: "/view/dexa/feeds/**",
      },
    ],
  },
};

export default nextConfig;
