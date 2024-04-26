/** @type {import('next').NextConfig} */

const apiurl = process.env["API_URL"] ?? "https://y.walnuts.dev/api";
console.log("API_URL: " + apiurl);

const nextConfig = {
  assetPrefix: "/proxy/3000",
  basePath: "/proxy/3000",
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiurl}/v1/:path*`,
      },
    ];
  },
};

module.exports = {
  assetPrefix: "/proxy/3000",
  basePath: "/proxy/3000",
};

export default nextConfig;
