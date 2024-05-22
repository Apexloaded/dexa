/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: false,
  // experimental: {
  //   esmExternals: "loose",
  //   serverComponentsExternalPackages: ["mongoose"],
  // },
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
  },
};

export default nextConfig;
