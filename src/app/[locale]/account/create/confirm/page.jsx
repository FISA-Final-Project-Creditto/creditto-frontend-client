"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomBar from "../../../send/components/BottomBar";
import AppHeader from "@/src/common/AppHeader/AppHeader";

export default function AccountConfirm() {
  const router = useRouter();

  // 샘플 계좌 정보
  const accountInfo = {
    accountNo: "1002076577072",
    accountName: "해외송금 전용 계좌",
    accountType: "외화보통예금",
  };

  const handleCreate = () => {
    router.push("/account-success");
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

      <main className="flex flex-col min-h-screen px-8 py-30 max-w-lg mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-black">
            계좌 정보를 확인해주세요
          </h2>
          <p className="text-[#C9CDD4]">아래 정보로 계좌가 생성됩니다.</p>
        </div>

        {/* 생성할 계좌 정보 */}
        <section className="flex-1">
          <div className="bg-card border border-border rounded-xl px-6">
            {/* 계좌 번호 */}
            <div className="flex items-center justify-between py-8 border-b border-border">
              <div className="text-sm text-[#86909C]">계좌 번호</div>
              <div className="text-xl font-semibold text-black tracking-wide">
                {accountInfo.accountNo}
              </div>
            </div>

            {/* 계좌명 */}
            <div className="flex items-center justify-between py-8 border-b border-border">
              <div className="text-sm text-[#86909C]">계좌 이름</div>
              <div className="text-lg font-semibold text-black">
                {accountInfo.accountName}
              </div>
            </div>

            {/* 계좌 종류 */}
            <div className="flex items-center justify-between py-8 border-b border-border">
              <div className="text-sm text-[#86909C]">계좌 타입</div>
              <div className="text-lg font-semibold text-black">
                {accountInfo.accountType}
              </div>
            </div>
          </div>
        </section>

        {/* 생성 버튼 */}
        <footer>
          <BottomBar
            label="생성"
            isActive={true}
            onClick={() => router.push("/account/create/success")}
          />
        </footer>

        {/* 생성 알림 */}
        {/* <div className="mt-6 p-4 rounded-lg">
          <p className="text-sm text-[#E5E6EB] leading-relaxed">
            계좌 생성 후에는 정보를 변경할 수 없습니다. 정보를 다시 한 번
            확인해주세요.
          </p>
        </div> */}
      </main>
    </div>
  );
}
