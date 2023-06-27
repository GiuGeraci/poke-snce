/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  env: {
    BASE_API_PATH: process.env.BASE_API_PATH,
  },
}

module.exports = nextConfig
