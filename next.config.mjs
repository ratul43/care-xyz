/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        // port: "",
        // pathname: "/my-bucket/**",
        // search: "",
      },
    ],
  },
};

export default nextConfig;
