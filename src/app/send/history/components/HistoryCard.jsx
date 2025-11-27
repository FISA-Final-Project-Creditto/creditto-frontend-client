"use client";

import { useState } from "react";
import { US } from "country-flag-icons/react/3x2";
import {
  CircleMinus,
  EllipsisVertical,
  FileText,
  MoreVertical,
  Trash2,
} from "lucide-react";
import Modal from "../../components/Modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function HistoryCard({
  history,
  chooseState,
  onChangeChooseState,
  onClick,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // 내역 삭제 함수
  const handleDeleteConfirm = () => {
    console.log(`[v0] ${history.id}번 송금 내역 삭제 확인`);
    // TODO: 삭제 로직 작성
  };

  // 모달 닫을 때 발생하는 함수
  const handleModal = () => {
    setIsModalOpen(false); // 모달 닫기

    onChangeChooseState(false); // 선택 버튼으로 변경
  };

  return (
    <div
      className="border border-[#86909C] rounded-xl px-5 py-[0.938rem]"
      onClick={chooseState ? undefined : onClick}
    >
      <div className="flex items-start justify-between mb-6">
        {/* 송금 주기 */}
        <span className="text-lg font-bold text-[#4E5969]">
          {history.schedule}
        </span>

        {/* 송금/수취 통화 코드 with 더보기아이콘 */}
        <div className="flex items-start gap-2">
          <div className="text-right">
            <div className="text-lg text-black font-bold">
              {history.sendCurrency}
            </div>
            <div className="text-sm text-[#86909C] font-semibold">
              {history.receiveCurrency}
            </div>
          </div>

          {/* 더보기 아이콘 */}
          {/* 더보기 아이콘 (Dropdown Menu) */}
          {chooseState && (
            <div onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-[#86909C] rounded-full p-1 transition-colors -mr-2">
                    <MoreVertical className="w-5 h-5" aria-label="더보기" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    onClick={() => router.push(`/send/history/${history.id}`)}
                    className="cursor-pointer gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    자세히보기
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsModalOpen(true)}
                    className="text-[#F53F3F] focus:text-[#F53F3F] cursor-pointer gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    삭제하기
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
          onClose={handleModal}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
