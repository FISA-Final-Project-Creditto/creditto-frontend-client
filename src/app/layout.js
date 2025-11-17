// src/app/layout.js  (혹은 app/layout.js)

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body className="font-Pretendard">
        <main className="flex justify-center bg-[#e5e5e5]">
          <div className="w-full max-w-[440px] min-h-screen mx-auto flex flex-col bg-white overflow-y-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
