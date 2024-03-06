/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URL: process.env.MONGO_URL,
    URL: process.env.URL,
  },
  async redirects() {
    return [
      {
        source: "/dashboard/:path*",
        missing: [
          {
            type: "cookie",
            key: "user",
          },
        ],
        destination: "/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
