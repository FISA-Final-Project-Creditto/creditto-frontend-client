// src/app/layout.js  (혹은 app/layout.js)

import Providers from "./provider";




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
