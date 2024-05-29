/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gnfd-testnet-sp1.bnbchain.org",
        port: "",
        pathname: "/view/dexa/**",
      },
    ],
    unoptimized: true,
    loader: "akamai",
    path: "",
  },
  trailingSlash: true,
};

export default nextConfig;
