// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   async headers() {
//     return [
//       {
//         source: "/api/:path*",
//         headers: [
//           { key: "ngrok-skip-browser-warning", value: "true" },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;