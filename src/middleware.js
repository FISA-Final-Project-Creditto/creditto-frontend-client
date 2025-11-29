import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ko", "jp", "cn"],

  // Used when no locale matches
  defaultLocale: "ko",
});

export const config = {
  // Matcher ignoring `/_next/`, `/api/` and files with extensions.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
