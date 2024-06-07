/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "nmiyqvoytwgkwzjevigo.supabase.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "shutterstock.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
