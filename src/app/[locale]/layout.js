import "./globals.css";
import Providers from "./provider";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export default async function RootLayout({ children, params }) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="font-Pretendard">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <main className="flex justify-center items-center bg-[#e5e5e5]">
              <div className="w-full max-w-[440px] min-h-screen mx-auto justify-start flex flex-col bg-white">
                {children}
              </div>
            </main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
