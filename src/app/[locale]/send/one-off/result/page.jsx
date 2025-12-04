"use client";

import AppHeader from "@/src/common/AppHeader/AppHeader";
import BottomBar from "../../components/BottomBar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import Divider from "../../regular/result/components/Divider";
import Term from "../../regular/components/Term";
import InfoRow from "../../regular/result/components/InfoRow";
import {
  selectReceiveCurrency,
  selectRecipientInfo,
  selectSendInfo,
} from "@/src/store/features/send/sendSelectors";

export default function ResultPage() {
  const router = useRouter();
  const t = useTranslations("send");

  // selector로 데이터 가져오기
  const sendInfo = useSelector(selectSendInfo);
  const recipientInfo = useSelector(selectRecipientInfo);
  const receiveCurrency = useSelector(selectReceiveCurrency);

  return (
    <main className="min-h-dvh flex flex-col bg-white">
      <header>
        <AppHeader
          title="일회성 송금"
          show={true}
          showHamburger={false}
          showBack={true}
        />
      </header>
      <div className="px-5">
        <section className="flex flex-col gap-[2.188rem]">
          <h1 className="text-left mt-[3.438rem] text-[1.563rem] font-bold mb-[2.188rem]">
            <span className="text-[#2E5796]">해외 일회성 송금</span>
            <br />
            신청결과
          </h1>
        </section>
        {/* 신청 내역 */}
        <section className="border border-[#86909C] rounded-xl px-[1.563rem] py-5 mb-[2.188rem]">
          {/* 송금인 정보 */}
          <div>
            <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
              송금인 정보
            </h3>
            <div className="space-y-3.75">
              <InfoRow label="송금인 계좌번호" value={sendInfo.accountNo} />
              <InfoRow
                label="외화 거래 금액"
                value={`${sendInfo.targetAmount} ${sendInfo.sendCurrency}`}
              />
              <InfoRow label="송금 시작일" value={sendInfo.startDate} />
            </div>
          </div>

          <Divider />

          {/* 수신인 정보 */}
          <div>
            <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
              수취인 정보
            </h3>
            <div className="space-y-3.75">
              <InfoRow label="이름" value={recipientInfo.name} />
              <InfoRow label="국적" value={recipientInfo.country} />
              <InfoRow label="계좌번호" value={recipientInfo.accountNo} />
              <InfoRow
                label="전화번호"
                value={`${recipientInfo.phoneCc} ${recipientInfo.phoneNo}`}
              />
              <InfoRow
                label="은행"
                value={`${recipientInfo.bankName}(${recipientInfo.bankCode})`}
              />
            </div>
          </div>
        </section>
        {/* 약관 동의 */}
        <Term />
      </div>
      {/* 하단 버튼 */}
      <footer>
        <BottomBar
          label="다음"
          onClick={() => router.replace("/send")}
          isActive={true}
        />
      </footer>
    </main>
  );
}
