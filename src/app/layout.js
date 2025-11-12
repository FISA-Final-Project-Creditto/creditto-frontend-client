// src/app/layout.js  (혹은 app/layout.js)
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff"/>

      </head>
      <body className="font-Pretendard">{children}</body>
    </html>
  );
}
