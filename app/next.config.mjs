/** @type {import('next').NextConfig} */

const apiurl = process.env["API_URL"] ?? "https://y.walnuts.dev/api";
console.log("API_URL: " + apiurl);

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiurl}/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
