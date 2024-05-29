/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',

  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{kebabCase}}',
    },
  },

  sassOptions: {
    includePaths: [
      './src/**/*.scss',
      './src/**/*.sass',
    ],
  },

  experimental: {
    serverComponentsExternalPackages: ['sequelize'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.trvl-media.com',
      },
    ],
  },

  webpack(config) {
    config.ignoreWarnings = [{
      module: /sequelize/,
      message: /Module not found|dependency is an expression|is not a exported from/
    }]

    return config
  },
}

export default nextConfig
