import type { NextConfig } from 'next'
 
// module.exports = {
//   env: {
//     RECAPTCHA_SITE_KEY: "6LesnfcqAAAAAJuI6MQz4utBz41g60CqlE0dlNqh",
//     RECAPTCHA_SECRET_KEY: "6LesnfcqAAAAABdkpmAWg0iTpsc0MdnPm4Nl24Hx",
//   }
// }
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      // Wildcard path matching
      {
        source: '/blog/:slug',
        destination: '/news/:slug',
        permanent: true,
      },
    ]
  },
}
 
export default nextConfig