import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // 국제화 언어들
  locales: ["ko", "en", "ja"],

  // 기본 언어
  defaultLocale: "ko",
});

export const config = {
  // Matcher ignoring `/_next/`, `/api/` and files with extensions.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
