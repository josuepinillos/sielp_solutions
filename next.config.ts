import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 85 for the portfolio screenshots, whose small text suffers at the default 75;
    // 90 for the mascot renders (hair and soft 3D edges).
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
