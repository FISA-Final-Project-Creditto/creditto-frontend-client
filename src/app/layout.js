// src/app/layout.js  (혹은 app/layout.js)

import { ReduxProvider } from "../store/ReduxProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body className="font-Pretendard">
        <ReduxProvider>
          <main className="h-[100dvh] flex justify-center items-center bg-[#e5e5e5]">
            <div className="w-full max-w-[440px] min-h-[100dvh] mx-auto justify-start flex flex-col bg-white">
              {children}
            </div>
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
