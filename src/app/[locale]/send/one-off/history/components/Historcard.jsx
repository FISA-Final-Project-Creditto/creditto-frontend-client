"use client";

import { CN, JP, US, MA, TH } from "country-flag-icons/react/3x2";

// 수취 통화 코드에 맞게 국기로 전환
const CurrencyFlag = {
  JPY: JP,
  USD: US,
  CNY: CN,
  THB: TH,
  MYR: MA,
};

export default function HistoryCard({ history, onClick }) {
  const FlagComponent = CurrencyFlag[history.receiveCurrency]; // 해당 국기 컴포넌트

  return (
    <div
      className="border-b border-[#E5E6EB] px-5 py-[0.938rem]"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-6">
        {/* 송금 주기 */}
        <span className="text-lg font-bold text-[#4E5969]">
          {history.startDate}
        </span>

        {/* 수취 통화 코드 with 더보기아이콘 */}
        <div className="flex items-start gap-2">
          <div className="text-right">
            <div className="text-lg text-black font-semibold">
              {/* sendAmount에서 3자리되면 ,(콤마) 넣어서 구현 */}
              {`${new Intl.NumberFormat().format(history.sendAmount)} ${
                history.receiveCurrency
              }`}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* 송금인 & 송금 은행 */}
        <div className="flex flex-col items-start">
          <div className="text-sm text-black font-semibold mb-1">
            {`To. ${history.recipientName}`}
          </div>
        </div>

        {/* 국기 */}
        <div className="w-[2.5rem] ">{FlagComponent && <FlagComponent />}</div>
      </div>
    </div>
  );
}
