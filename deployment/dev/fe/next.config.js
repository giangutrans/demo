module.exports = {
  i18n: {
    locales: ['en', 'vn'],
    defaultLocale: 'en',
  },
  output: "standalone",
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
};
