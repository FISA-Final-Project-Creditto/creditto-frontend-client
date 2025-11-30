"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CN, JP, US } from "country-flag-icons/react/3x2";
import { FileText, MoreVertical, Trash2 } from "lucide-react";
import Modal from "../../components/Modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { credittoApi } from "@/src/app/api/axios";

// 수취 통화 코드에 맞게 국기로 전환
const CurrencyFlag = {
  JPY: JP,
  USD: US,
  CNY: CN,
};

const CONVERT_TO_DAY = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
};

export default function HistoryCard({
  history,
  onClick,
  onDeleteSuccess, // 삭제 성공 시 호출 콜백
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const FlagComponent = CurrencyFlag[history.receivedCurrency]; // 해당 국기 컴포넌트

  // 내역 취소 함수
  const handleDeleteConfirm = async () => {
    console.log(`${history.regRemId}번 송금 내역 삭제 확인`);
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const res = await credittoApi.delete(
        `/api/remittance/scheduled/${history.regRemId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.code === 200) {
        console.log("송금 내역이 잘 취소되었습니다.");

        setIsModalOpen(false); // 모달 닫기

        // 상위 컴포넌트(HistoryPage)에게 삭제됐다고 알림
        if (onDeleteSuccess) {
          onDeleteSuccess(history.regRemId);
        }
      }
    } catch (error) {
      console.log("정기 해외 송금 설정 취소 API 실패", error);
    }
  };

  // 모달 닫을 때 발생하는 함수
  const handleModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div
      className="border border-[#86909C] rounded-xl px-5 py-[0.938rem]"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-6">
        {/* 송금 주기 */}
        <span className="text-lg font-bold text-[#4E5969]">
          {history.regRemType === "MONTHLY" &&
            `매월 ${history.scheduledDate}일`}
          {history.regRemType === "WEEKLY" &&
            `매주 ${CONVERT_TO_DAY[history.scheduledDay]}`}
        </span>

        {/* 수취 통화 코드 with 더보기아이콘 */}
        <div className="flex items-start gap-2">
          <div className="text-right">
            <div className="text-lg text-black font-semibold">
              {/* sendAmount에서 3자리되면 ,(콤마) 넣어서 구현 */}
              {`${new Intl.NumberFormat().format(history.sendAmount)} ${
                history.receivedCurrency
              }`}
            </div>
          </div>

          {/* 더보기 아이콘 */}
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-[#86909C] rounded-full p-1 transition-colors -mr-2">
                  <MoreVertical className="w-5 h-5" aria-label="더보기" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() =>
                    router.push(
                      `/send/regular/history/details/${history.regRemId}`
                    )
                  }
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
                  해지하기
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* 송금인 & 송금 은행 */}
        <div className="flex flex-col items-start">
          <div className="text-sm text-black font-semibold mb-1">
            To. {history.recipientName}
          </div>
          <div className="text-sm text-[#86909C] font-semibold">
            {history.recipientBankName}
          </div>
        </div>

        {/* 국기 */}
        <div className="w-[3.125rem] ">
          {FlagComponent && <FlagComponent />}
        </div>
      </div>

      {/* 취소 확인 모달 */}
      {isModalOpen && (
        <Modal
          title="해외 정기 송금 해지"
          message={`송금을 해지하시겠습니까?
해지 후에는 복구가 어려우니 신중히 선택해주세요.`}
          onClose={handleModal}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
