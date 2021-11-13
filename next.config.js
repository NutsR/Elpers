import withPWA from 'next-pwa';

module.exports = withPWA({
reactStrictMode: true,
  pwa: {
    dest: 'public'
  }
})
