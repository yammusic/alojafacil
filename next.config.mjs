/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

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
}

export default nextConfig
