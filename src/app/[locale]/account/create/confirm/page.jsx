"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomBar from "../../../send/components/BottomBar";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useSelector } from "react-redux";
import { credittoApi } from "@/src/app/api/axios";
import { useTranslations } from "next-intl";

export default function AccountConfirm() {
  const router = useRouter();
  const { accountName, accountType, password } = useSelector(
    (state) => state.account
  );
  const t = useTranslations("account.create.confirm");

  // 새 계좌 개설 API 요청 후 성공 페이지로 이동
  const handleCreate = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const res = await credittoApi.post(
        "/api/accounts",
        {
          accountName,
          accountType,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { code, data } = res.data;
      if (code === 200) {
        console.log("새 계좌 개설 성공:", data);

        // 요청 성공 시 성공 페이지로 이동
        router.push("/account/create/success");
      }
    } catch (error) {
      console.error("새 계좌 개설 중 오류 발생: ", error);
    }
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <AppHeader
        title={t("confirm_account_create")}
        show={true}
        showHamburger={false}
        showBack={true}
      />

      <div className="flex flex-col min-h-dvh py-10 max-w-lg mx-auto text-left">
        <div className="mb-8 px-8">
          <h2 className="text-2xl font-bold mb-2 text-black">
            {t("check_account_information")}
          </h2>
          <p className="text-[#C9CDD4]">{t("below_account_information")}</p>
        </div>

        {/* 생성할 계좌 정보 */}
        <section className="flex-1 px-8">
          <div className="border-rounded-xl">
            {/* 계좌명 */}
            <div className="flex items-center justify-between py-8 border-b border-border">
              <div className="text-sm text-[#86909C]">{t("account_name")}</div>
              <div className="text-lg font-semibold text-black">
                {accountName}
              </div>
            </div>

            {/* 계좌 종류 */}
            <div className="flex items-center justify-between py-8 border-b border-border">
              <div className="text-sm text-[#86909C]">{t("account_type")}</div>
              <div className="text-lg font-semibold text-black">
                {accountType}
              </div>
            </div>
          </div>
        </section>

        {/* 생성 버튼 */}
        <footer className="flex">
          <BottomBar
            label={t("goToCreate")}
            isActive={true}
            onClick={handleCreate}
          />
          {/* <button>다시 생성하기</button> */}
        </footer>

        {/* 생성 알림 */}
        {/* <div className="mt-6 p-4 rounded-lg">
          <p className="text-sm text-[#E5E6EB] leading-relaxed">
            계좌 생성 후에는 정보를 변경할 수 없습니다. 정보를 다시 한 번
            확인해주세요.
          </p>
        </div> */}
      </div>
    </div>
  );
}
