import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/my-shopify-portfolio",
  images: { unoptimized: true },
};

export default nextConfig;
