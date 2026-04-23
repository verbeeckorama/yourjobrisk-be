/** @type {import('next').NextConfig} */
// GitHub Pages-friendly static export.
// Set NEXT_PUBLIC_BASE_PATH to "/<repo-name>" for a project page
// (e.g. "/aijobimpact-be"). Leave empty for a user/org page
// (e.g. username.github.io).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true, // /methodology/ instead of /methodology — avoids 404s on Pages
  images: { unoptimized: true }, // next/image is not supported in `output: export`
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};
export default nextConfig;
