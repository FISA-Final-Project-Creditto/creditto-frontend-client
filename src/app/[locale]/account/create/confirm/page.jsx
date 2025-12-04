"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomBar from "../../../send/components/BottomBar";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useSelector } from "react-redux";
import { credittoApi } from "@/src/app/api/axios";

export default function AccountConfirm() {
  const router = useRouter();
  const { accountName, accountType, password } = useSelector(
    (state) => state.account
  );

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
        title="계좌 생성 확인"
        show={true}
        showHamburger={false}
        showBack={true}
      />

      <div className="flex flex-col min-h-dvh px-8 py-10 max-w-lg mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-black">
            계좌 정보를 확인해주세요
          </h2>
          <p className="text-[#C9CDD4]">아래 정보로 계좌가 생성됩니다.</p>
        </div>

        {/* 생성할 계좌 정보 */}
        <section className="flex-1">
          <div className="border-rounded-xl px-6">
            {/* 계좌명 */}
            <div className="flex items-center justify-between py-8 border-b border-border">
              <div className="text-sm text-[#86909C]">계좌 이름</div>
              <div className="text-lg font-semibold text-black">
                {accountName}
              </div>
            </div>

            {/* 계좌 종류 */}
            <div className="flex items-center justify-between py-8 border-b border-border">
              <div className="text-sm text-[#86909C]">계좌 타입</div>
              <div className="text-lg font-semibold text-black">
                {accountType}
              </div>
            </div>
          </div>
        </section>

        {/* 생성 버튼 */}
        <footer className="flex flex-co">
          <BottomBar label="계좌 생성" isActive={true} onClick={handleCreate} />
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
