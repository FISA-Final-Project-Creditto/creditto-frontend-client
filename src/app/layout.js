import Providers from "./provider"

export default function RootLayout({children}){
  const preloadedState = undefined

  return (
    <html lang="ko">
      <body>
        <Providers preloadedState={preloadedState}>
          {children}
        </Providers>
      </body>
    </html>
  )
}