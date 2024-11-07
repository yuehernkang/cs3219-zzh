import type { NextConfig } from "next";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    return config
  }
};

export default nextConfig;
