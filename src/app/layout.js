// src/app/layout.js  (혹은 app/layout.js)

import { ReduxProvider } from "../store/ReduxProvider";
import "./globals.css";
import Providers from "./provider";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="font-Pretendard">
        <Providers>
          <main className="flex justify-center items-center bg-[#e5e5e5]">
            <div className="w-full max-w-[440px] min-h-screen mx-auto justify-start flex flex-col bg-white">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
