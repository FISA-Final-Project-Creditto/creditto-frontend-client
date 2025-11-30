"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { credittoApi } from "@/src/app/api/axios";
import EditableField from "../components/EditableField";
import InfoRow from "../components/InfoRow";

// 국가명을 한국어로 변환
const countryToKorean = {
  KOR: "대한민국",
  USA: "미국",
  CHINA: "중국",
  JAPAN: "일본",
};

const statusToKorean = {
  ACTIVE: "정상",
  DELAYED: "연기",
  PAUSED: "일시중지",
  CANCELLED: "취소",
};

export default function HistoryDetailPage() {
  const { id } = useParams(); // /send/regular/history/details/[id]의 id
  const router = useRouter();
  const [edit, setEdit] = useState(false); // 편집 여부

  // Redux에 저장해둔 정기 송금 설정 내역 목록
  const histories = useSelector((state) => state.sendHistory.detailedHistory);
  const history = histories.find(
    (item) => String(item.regRemId) === String(id)
  );
  console.log("정기송금 설정: ", history);

  // formData 초기값은 함수 기반 초기화로 설정
  const [formData, setFormData] = useState({
    accountNo: "", // 출금 계좌
    sendAmount: "", // 외화 거래 금액
    regRemType: "", // 송금 주기 상세(매월/매주)
    scheduledDate: "", // 날짜(매월)
    scheduledDay: "", // 요일(매주)
    startedAt: "", // 송금 시작일
    clientName: "", // 송금인명
    clientCountry: "", // 송금인 국가
    sendCurrency: "", // 송금 통화
    recipientCountry: "", // 수취 통화
    recipientBankName: "", // 수취인 소유 은행
    recipientAccountNo: "", // 수취 계좌번호
    receiveCurrency: "", // 수취 통화
    recipientName: "", // 수취인명
    recipientPhoneCc: "", // 수취인 전화번호 코드
    recipientPhoneNo: "", // 수취인 전화번호
    regRemStatus: "ACTIVE", // 거래 상태
  });

  // 금액 표시용 포맷터 (읽기 모드에서만 콤마 붙이기)
  const formatAmount = (val) =>
    val == null || val === "" ? "" : Number(val).toLocaleString();

  // 저장 버튼 - 수정 API 호출
  const handleSave = async () => {
    if (!formData || !history) return;

    try {
      const accessToken = sessionStorage.getItem("accessToken");

      // 백엔드에서 제공한 Request Body 형태에 맞게 조립
      const payload = {
        accountNo: formData.accountNo,
        sendAmount: Number(formData.sendAmount),
        regRemType: formData.regRemType,
        scheduledDate:
          formData.regRemType === "MONTHLY"
            ? Number(formData.scheduledDate)
            : null,
        scheduledDay:
          formData.regRemType === "WEEKLY" ? formData.scheduledDay : null,
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

  // 하나의 정기송금 설정의 세부사항 조회
  useEffect(() => {
    const fetchHistoryDetail = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        const res = await credittoApi(`/api/remittance/scheduled/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { code, data } = res.data;
        if (code === 200 && data) {
          console.log("하나의 정기송금 설정 세부사항 조회 성공");

          // API 응답값을 formData에 저장
          setFormData({
            accountNo: data.accountNo ?? "",
            sendAmount: data.sendAmount ? String(data.sendAmount) : "",
            regRemType: data.regRemType ?? "",
            scheduledDate:
              data.regRemType === "MONTHLY" && data.scheduledDate != null
                ? String(data.scheduledDate)
                : "",
            scheduledDay:
              data.regRemType === "WEEKLY" && data.scheduledDay
                ? data.scheduledDay
                : "",
            startedAt: data.startedAt || "",
            clientName: data.clientName || "",
            clientCountry: data.clientCountry || "",
            sendCurrency: data.sendCurrency || "",
            recipientCountry: data.recipientCountry || "",
            recipientBankName: data.recipientBankName || "",
            recipientAccountNo: data.recipientAccountNo || "",
            receiveCurrency: data.receiveCurrency || "",
            recipientName: data.recipientName || "",
            recipientPhoneCc: data.recipientPhoneCc || "",
            recipientPhoneNo: data.recipientPhoneNo || "",
            regRemStatus: data.regRemStatus || "ACTIVE",
          });
        }
      } catch (error) {
        console.log("하나의 정기송금 설정 세부사항 조회 실패: ", error);
      }
    };

    fetchHistoryDetail();
  }, [id]);

  // history 또는 formData가 아직 없으면 로딩 상태
  if (!formData) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-white">
        <p className="text-sm text-[#86909C]">
          정기 송금 설정 정보를 불러오는 중...
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
              value={`${formatAmount(formData.sendAmount)} ${
                formData.receiveCurrency
              }`}
              rawValue={formData.sendAmount}
              onChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  sendAmount: v.replace(/\D/g, ""),
                }))
              }
            />

            {/* 송금 주기 (MONTHLY → 날짜 / WEEKLY → 요일) */}
            <EditableField
              label="송금 주기"
              edit={edit}
              type="remType"
              regRemType={formData.regRemType}
              scheduledDate={formData.scheduledDate}
              scheduledDay={formData.scheduledDay}
              onChangeRegRemType={(v) =>
                setFormData((prev) => ({ ...prev, regRemType: v }))
              }
              onChangeScheduledDate={(v) =>
                setFormData((prev) => ({ ...prev, scheduledDate: v }))
              }
              onChangeScheduledDay={(v) =>
                setFormData((prev) => ({ ...prev, scheduledDay: v }))
              }
            />

            {/* 읽기 전용 필드 */}
            <InfoRow label="송금 시작일" value={formData.startedAt} />
          </div>

          <Divider />

          {/* 송금인 정보 */}
          <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
            송금인 정보
          </h3>
          <div className="space-y-3.75">
            <InfoRow label="이름" value={formData.clientName} />
            <InfoRow
              label="국적"
              value={countryToKorean[formData.clientCountry]}
            />
            <InfoRow label="송금 통화 코드" value={formData.sendCurrency} />
          </div>

          <Divider />

          {/* 수신인 정보 */}
          <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
            수신인 정보
          </h3>
          <div className="space-y-3.75">
            <InfoRow
              label="국가"
              value={countryToKorean[formData.recipientCountry]}
            />
            <InfoRow label="은행명" value={formData.recipientBankName} />
            <InfoRow label="계좌 번호" value={formData.recipientAccountNo} />
            <InfoRow label="수취 통화 코드" value={formData.receiveCurrency} />
            <InfoRow label="이름" value={formData.recipientName} />
            <InfoRow
              label="전화 번호"
              value={`${formData.recipientPhoneCc} ${formData.recipientPhoneNo}`}
            />
            <InfoRow
              label="송금 상태"
              value={statusToKorean[formData.regRemStatus]}
            />
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
