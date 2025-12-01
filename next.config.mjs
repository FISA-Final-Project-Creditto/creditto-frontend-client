import createNextIntlPlugin from 'next-intl/plugin';
import NextPWA from 'next-pwa';

const withNextIntl = createNextIntlPlugin();
const withPWA = NextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development' || process.env.DISABLE_PWA === 'true',
  register: true,
  skipWaiting: true,
});

const nextConfig = withNextIntl({
  // 기존 설정들...
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
});

export default withPWA(nextConfig);