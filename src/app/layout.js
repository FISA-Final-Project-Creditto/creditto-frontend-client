// src/app/layout.js  (혹은 app/layout.js)
import './globals.css'
import Providers from "./provider";




export default function RootLayout({ children }) {
  const preloadedState = undefined;

  return (
    <html lang="ko">
      <body className="font-sans">
        <Providers preloadedState={preloadedState}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
