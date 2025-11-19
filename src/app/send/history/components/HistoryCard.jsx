"use client";

import { useState } from "react";
import { US, CN, JP } from "country-flag-icons/react/3x2";
import { CircleMinus } from "lucide-react";
import Modal from "../../components/Modal";

export default function HistoryCard({ history, removeState, onClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 내역 삭제 함수
  const handleDeleteConfirm = () => {
    console.log(`[v0] ${history.id}번 송금 내역 삭제 확인`);
    // TODO: 삭제 로직 작성
  };

  return (
    <div
      className="border border-[#86909C] rounded-xl px-5 py-[0.938rem]"
      onClick={removeState ? undefined : onClick}
    >
      <div className="flex items-start justify-between mb-6">
        {/* 송금 주기 */}
        <span className="text-lg font-bold text-[#4E5969]">
          {history.schedule}
        </span>

        {/* 송금/수취 통화 코드 with 삭제아이콘 */}
        <div className="flex items-start gap-2">
          <div className="text-right">
            <div className="text-lg text-black font-bold">
              {history.sendCurrency}
            </div>
            <div className="text-sm text-[#86909C] font-semibold">
              {history.receiveCurrency}
            </div>
          </div>

          {/* 삭제 아이콘 */}
          {removeState && (
            <button
              className="text-[#F53F3F] transition-colors"
              aria-label="삭제"
              onClick={(e) => {
                e.stopPropagation(); // 카드 onClick 막기
                setIsModalOpen(true);
              }}
            >
              <CircleMinus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* 송금인 & 송금 은행 */}
        <div>
          <div className="text-sm text-black font-semibold mb-1">
            To. {history.recipient}
          </div>
          <div className="text-sm text-[#86909C] font-semibold">
            {history.bank}
          </div>
        </div>

        {/* 국기 */}
        <div className="w-[3.125rem] ">
          {history.country === "US" && <US />}
        </div>
      </div>

      {/* 취소 확인 모달 */}
      {isModalOpen && (
        <Modal
          title="송금 내역 취소"
          message={`${history.recipient}님에게 ${history.sendCurrency} 송금 내역을 취소하시겠습니까?`}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
