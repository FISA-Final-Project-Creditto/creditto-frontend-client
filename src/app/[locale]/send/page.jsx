import SendMainClient from "./components/SendMainClient";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "send.page" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export const dynamic = "force-static"; // 정적으로 만들어줘서 TTFB 크게 감소시킴

export default function Page() {
  return <SendMainClient />;
}
