"use client";

import AppHeader from "@/src/common/AppHeader/AppHeader";
import BottomBar from "../components/BottomBar";
import Term from "../components/Term";
import Divider from "./components/Divider";
import InfoRow from "./components/InfoRow";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  selectBankData,
  selectClientData,
  selectRecipientData,
  selectTypeData,
} from "@/src/store/features/send/sendSelectors";

export default function ResultPage() {
  const router = useRouter();

  // selector로 데이터 가져오기
  const typeData = useSelector(selectTypeData);
  const clientData = useSelector(selectClientData);
  const recipientData = useSelector(selectRecipientData);
  const bankData = useSelector(selectBankData);

  return (
    <main className="min-h-dvh flex flex-col bg-white">
      <header>
        <AppHeader
          title="해외 송금"
          show={true}
          showHamburger={false}
          showBack={true}
        />
      </header>
      <div className="px-5">
        <section className="flex flex-col gap-[2.188rem]">
          <h1 className="text-left mt-[3.438rem] text-[1.563rem] font-bold mb-[2.188rem]">
            <span className="text-[#2E5796]">해외 자동 송금</span> <br />
            신청결과
          </h1>
        </section>
        {/* 신청 내역 */}
        <section className="border border-[#86909C] rounded-xl px-[1.563rem] py-5 mb-[2.188rem]">
          {/* 송금 유형 정보 */}
          <div className="space-y-3.75">
            <InfoRow label="출금 계좌" value={typeData.accountNo} />
            <InfoRow label="수취 통화 코드" value={typeData.receiveCurrency} />
            <InfoRow label="송금 통화 코드" value={typeData.sendCurrency} />
            <InfoRow label="외화 거래 금액" value={typeData.sendAmount} />
            {typeData.regRemType === "MONTHLY" ? (
              <InfoRow
                label="송금 주기"
                value={`매월 ${typeData.scheduledDate}일`}
              />
            ) : (
              <InfoRow
                label="송금 주기"
                value={`매주 ${typeData.scheduledDay}`}
              />
            )}

            <InfoRow label="송금 시작일" value={typeData.startedDate} />
          </div>

          <Divider />

          {/* 송금인 정보 */}
          <div>
            <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
              송금인 정보
            </h3>
            <div className="space-y-3.75">
              <InfoRow label="이름" value={clientData.clientName} />
              <InfoRow label="국가" value={clientData.clientCountry} />
              <InfoRow label="주소" value={clientData.clientAddress} />
            </div>
          </div>

          <Divider />

          {/* 수신인 정보 */}
          <div>
            <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
              수신인 정보
            </h3>
            <div className="space-y-3.75">
              <InfoRow label="국가" value={recipientData.recipientCountry} />
              <InfoRow label="이름" value={recipientData.recipientName} />
              <InfoRow
                label="전화번호"
                value={`${recipientData.recipientPhoneCc} ${recipientData.recipientPhoneNo}`}
              />
              <InfoRow label="통화 코드" value={typeData.receiveCurrency} />
              <InfoRow label="수취 은행명" value={bankData.recipientBankName} />
              <InfoRow
                label="수취 은행 코드"
                value={bankData.recipientBankCode}
              />
              <InfoRow label="계좌 번호" value={bankData.recipientAccountNo} />
            </div>
          </div>
        </section>
        <Term />
      </div>
      {/* 약관 동의 */}

      {/* 하단 버튼 */}
      <footer>
        <BottomBar
          label="다음"
          onClick={() => router.push("/send/loading")}
          isActive={true}
        />
      </footer>
    </main>
  );
}
