import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: '/lager/A',
        destination: '/embryon/predatorisk-empati',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
