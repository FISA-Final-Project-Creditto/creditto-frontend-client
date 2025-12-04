"use client";
import { useTranslations } from "next-intl";

export default function TermPage() {
  const t = useTranslations("send.regular.term");
  return <div>{t("title")}</div>;
}
