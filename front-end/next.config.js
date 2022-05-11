/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
      // Will only be available on the server side
      URI: 'http://back-end:4000'
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      URI: 'http://localhost:4000'
    }
  }
  
  module.exports = nextConfig
  
  