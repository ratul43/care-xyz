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
      {
         protocol: "https",
        hostname: "softsensbaby.com", 
      },

      {
         protocol: "https",
        hostname: "www.caringcompanionsathome.com", 
      },
      {
         protocol: "https",
        hostname: "assets.unileversolutions.com", 
      },
    ],
  },

};

export default nextConfig;
