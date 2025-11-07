// src/app/layout.js  (혹은 app/layout.js)

import Providers from "./provider";

export const metadata = {
  title: 'My App',
  manifest: '/manifest.json',
  themeColor: '#111111',
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icons/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({ children }) {
  const preloadedState = undefined;

  return (
    <html lang="ko">
      {/* iOS 전용 startup image는 Metadata로 못 넣으니 필요하면 아래 head 블록을 추가 */}
      {/* <head>
        <link
          rel="apple-touch-startup-image"
          href="/splash/iphone-14-pro-1290x2796.png"
          media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)"
        />
      </head> */}
      <body>
        <Providers preloadedState={preloadedState}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
