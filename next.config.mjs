/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't bundle these packages on server side
  serverExternalPackages: ['pdf-parse'],
  webpack: (config, { isServer }) => {
    // Fix for pdf-parse canvas module (not needed in browser)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false,
      }
    }
    return config
  },
}

export default nextConfig
