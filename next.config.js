/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
    localeDetection: true,
  },
  images: {
    domains: ['i.ytimg.com'],
  },
};
