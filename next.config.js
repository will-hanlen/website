const { redirect } = require('next/dist/next-server/server/api-utils')

// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
})

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/writing',
        permanent: true,
      }
    ]
  }
}