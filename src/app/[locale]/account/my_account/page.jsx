"use client";

import AppHeader from "@/src/common/AppHeader/AppHeader";
import React from "react";
import ImportAccount from "./components/ImportAccount/ImportAccount";
import { useTranslations } from "next-intl";

export default function MyAccountPage() {
  const t = useTranslations("account.myAccount");
  return (
    <>
      <AppHeader
        title={t("title")}
        show={true}
        showBack={true}
        showHamburger={false}
      />
      <ImportAccount />
    </>
  );
}
