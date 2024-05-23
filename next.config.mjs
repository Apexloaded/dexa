/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   esmExternals: "loose",
  //   serverComponentsExternalPackages: ["mongoose"],
  // },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gnfd-testnet-sp1.bnbchain.org",
        port: "",
        pathname: "/view/dexa/**",
      },
    ],
  },
};

export default nextConfig;
