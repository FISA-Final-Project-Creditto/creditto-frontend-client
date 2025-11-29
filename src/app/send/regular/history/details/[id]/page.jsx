"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { credittoApi } from "@/src/app/api/axios";
import EditableField from "../components/EditableField";
import InfoRow from "../components/InfoRow";

// 요일 라벨 매핑
const WEEKDAY_LABELS = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
};

export default function HistoryDetailPage() {
  const { id } = useParams(); // /send/history/details/[id] 의 id
  const router = useRouter();
  const [edit, setEdit] = useState(false); // 편집 여부

  // Redux에 저장해둔 정기 송금 설정 내역 목록
  const histories = useSelector((state) => state.sendHistory.detailedHistory);
  const history = histories.find(
    (item) => String(item.regRemId) === String(id)
  );
  console.log("정기송금 설정: ", history);

  // formData 초기값은 함수 기반 초기화로 설정
  const [formData, setFormData] = useState(() => {
    if (!history) return null;

    return {
      accountNo: history.accountNo,
      amount: String(history.sendAmount ?? 0),
      remType: history.regRemType || "MONTHLY",
      monthlyDay:
        history.regRemType === "MONTHLY" && history.scheduledDate != null
          ? String(history.scheduledDate)
          : "10",
      weeklyDay:
        history.regRemType === "WEEKLY" && history.scheduledDay
          ? history.scheduledDay
          : "MONDAY",
      startDate: "2025년 10월 29일",
      senderName: "Richard Park",
      senderCountry: "USA",
      senderCurrency: "KRW",
      senderAddress: "Busan, Rodeo-street, 124\n103-102",
      recipientCountry: "USA",
      recipientBank: history.recipientBankName,
      recipientAccount: history.accountNo,
      recipientCurrency: history.receivedCurrency,
      recipientName: history.recipientName,
      recipientAddress: "Busan, Rodeo-street, 124\n103-102",
      recipientPhone: "111-111-1111",
    };
  });

  // 금액 표시용 포맷터 (읽기 모드에서만 콤마 붙이기)
  const formatAmount = (val) =>
    val == null || val === "" ? "" : Number(val).toLocaleString();

  // 저장 버튼 - 수정 API 호출
  const handleSave = async () => {
    if (!formData || !history) return;

    try {
      const accessToken = sessionStorage.getItem("accessToken");

      // 백엔드와 약속한 Request Body 형태에 맞게 조립
      const payload = {
        accountNo: formData.accountNo,
        sendAmount: Number(formData.amount),
        regRemType: formData.remType,
        scheduledDate:
          formData.remType === "MONTHLY" ? Number(formData.monthlyDay) : null,
        scheduledDay: formData.remType === "WEEKLY" ? formData.weeklyDay : null,
      };

      const res = await credittoApi.put(
        `/api/remittance/scheduled/${history.regRemId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.code === 200) {
        alert("정기 송금 설정이 수정");
        setEdit(false);
      } else {
        alert("수정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("정기 송금 수정 API 실패: ", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  // 수정 취소
  const handleCancel = () => {
    setEdit(false);
    // 원래 값으로 롤백하고 싶으면 history 기반으로 다시 세팅
    if (history) {
      setFormData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          accountNo: history.accountNo,
          amount: String(history.sendAmount ?? 0),
          remType: history.regRemType || "MONTHLY",
          monthlyDay:
            history.regRemType === "MONTHLY" && history.scheduledDate != null
              ? String(history.scheduledDate)
              : "10",
          weeklyDay:
            history.regRemType === "WEEKLY" && history.scheduledDay
              ? history.scheduledDay
              : "MONDAY",
        };
      });
    }
  };

  // ▷ history 또는 formData가 아직 없으면 로딩 상태
  if (!history || !formData) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-white">
        <p className="text-sm text-[#86909C]">
          정기 송금 정보를 불러오는 중...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-dvh flex flex-col bg-white">
      {/* 상단 */}
      <header className="mb-[1.563rem] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="text-[#1D2129]"
              onClick={() => router.back()}
              type="button"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold">해외 송금 내역</h1>
          </div>

          {!edit && (
            <button
              onClick={() => setEdit(true)}
              className="text-sm font-semibold text-[#4D6389]"
            >
              수정
            </button>
          )}
        </div>
      </header>

      {/* 내용 */}
      <div className="flex flex-col px-8">
        <section className="w-full border border-[#86909C] rounded-xl px-[1.563rem] py-5 mb-[2.188rem]">
          <div className="space-y-3.75">
            {/* 출금 계좌 (Select) */}
            <EditableField
              label="출금 계좌"
              edit={edit}
              type="select-account"
              value={formData.accountNo}
              onChange={(v) =>
                setFormData((prev) => ({ ...prev, accountNo: v }))
              }
            />

            {/* 외화 거래 금액 (숫자만) */}
            <EditableField
              label="외화 거래 금액"
              edit={edit}
              type="number"
              value={formatAmount(formData.amount)}
              rawValue={formData.amount}
              onChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  amount: v.replace(/\D/g, ""),
                }))
              }
            />

            {/* 송금 주기 (MONTHLY → 날짜 / WEEKLY → 요일) */}
            <EditableField
              label="송금 주기"
              edit={edit}
              type="remType"
              remType={formData.remType}
              monthlyDay={formData.monthlyDay}
              weeklyDay={formData.weeklyDay}
              onChangeRemType={(v) =>
                setFormData((prev) => ({ ...prev, remType: v }))
              }
              onChangeMonthlyDay={(v) =>
                setFormData((prev) => ({ ...prev, monthlyDay: v }))
              }
              onChangeWeeklyDay={(v) =>
                setFormData((prev) => ({ ...prev, weeklyDay: v }))
              }
            />

            {/* 읽기 전용 필드 */}
            <InfoRow label="송금 시작일" value={formData.startDate} />
          </div>

          <Divider />

          {/* 송금인 정보 */}
          <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
            송금인 정보
          </h3>
          <div className="space-y-3.75">
            <InfoRow label="이름" value={formData.senderName} />
            <InfoRow label="국적" value={formData.senderCountry} />
            <InfoRow label="송금 통화 코드" value={formData.senderCurrency} />
          </div>

          <Divider />

          {/* 수신인 정보 */}
          <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
            수신인 정보
          </h3>
          <div className="space-y-3.75">
            <InfoRow label="국가" value={formData.recipientCountry} />
            <InfoRow label="은행명" value={formData.recipientBank} />
            <InfoRow label="계좌 번호" value={formData.recipientAccount} />
            <InfoRow
              label="수취 통화 코드"
              value={formData.recipientCurrency}
            />
            <InfoRow label="이름" value={formData.recipientName} />
            <InfoRow label="주소" value={formData.recipientAddress} multiline />
            <InfoRow label="전화 번호" value={formData.recipientPhone} />
          </div>
        </section>
      </div>

      {edit && (
        <div className="fixed bottom-0 left-0 right-0 flex gap-3 p-4 bg-white">
          <Button
            variant="outline"
            className="flex-1 border-[#86909C] text-[#4E5969]"
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            className="flex-1 bg-[#1A3668] text-white"
            onClick={handleSave}
          >
            저장
          </Button>
        </div>
      )}
    </main>
  );
}

function Divider() {
  return <div className="my-5 border-t border-[#E5E6EB]" />;
}
