"use client";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import React, { useEffect } from "react";
import BottomBar from "../../send/components/BottomBar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AccountConnectionPage() {
  const t = useTranslations("account.connection");
  const router = useRouter();
  // Redux 스토어에서 계좌 목록을 가져옵니다.
  const accounts = useSelector((state) => state.account.accounts);
  const name = "정용준"; // TODO: get user name from store

  useEffect(() => {
    // accounts 상태가 null이 아니거나 배열의 길이가 0보다 크면
    // 이미 계좌 정보가 있는 것으로 간주하고 페이지를 이동시킵니다.
    if (accounts && accounts.length > 0) {
      router.replace("/account/my_account");
    }
  }, [accounts, router]);

  return (
    <>
      <AppHeader
        title={t("title")}
        show={true}
        showBack={true}
        showHamburger={false}
      />
      <div className="w-full text-left p-5 text-xl font-bold">
        <div className="flex items-end">
          <div className="text-[#0C72BA] text-2xl">{t("wonClick")}&nbsp;</div>{t("withOneClick")}
        </div>
        <div>{t("description", { name })}</div>
      </div>
      <div className="w-full  min-h-[440px] justify-center items-center flex">
        <Image src="/icon/woori.png" alt={t('wooriLogo')} width={60} height={60} />
      </div>
      <footer>
        <BottomBar
          label={t("complete")}
          onClick={() => router.push("/account/my_account")}
          isActive={true}
        />
      </footer>
    </>
  );
}