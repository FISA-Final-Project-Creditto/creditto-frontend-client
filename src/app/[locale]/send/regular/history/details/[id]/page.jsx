"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { credittoApi } from "@/src/app/api/axios";
import EditableField from "../components/EditableField";
import InfoRow from "../components/InfoRow";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import {
  COUNTRY_TO_KOREAN,
  STATUS_TO_KOREAN,
} from "@/src/lib/constants/countryCode";

export default function HistoryDetailPage() {
  const { id } = useParams(); // /send/regular/history/details/[id]의 id
  const router = useRouter();
  const [edit, setEdit] = useState(false); // 편집 여부

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
  const [originalData, setOriginalData] = useState(null); // 수정 도중에 취소하고 싶을 경우

  // 금액 표시용 포맷터 (읽기 모드에서만 콤마 붙이기)
  const formatAmount = (val) =>
    val == null || val === "" ? "" : Number(val).toLocaleString();

  // 저장 버튼 - 수정 API 요청
  const handleSave = async () => {
    if (!formData) return;

    try {
      const accessToken = sessionStorage.getItem("accessToken");

      // 백엔드에서 제공한 Request Body 형태에 맞게 조립
      const requestBody = {
        accountNo: formData.accountNo,
        sendAmount: Number(formData.sendAmount),
        scheduledDate:
          formData.regRemType === "MONTHLY"
            ? Number(formData.scheduledDate)
            : null,
        scheduledDay:
          formData.regRemType === "WEEKLY" ? formData.scheduledDay : null,
      };

      const res = await credittoApi.put(
        `/api/remittance/scheduled/${id}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { code } = res.data;

      if (code === 200) {
        alert("정기 송금 설정이 수정되었습니다.");

        // 업데이트 된 데이터만 저장(요청 바디 사용)
        setOriginalData(formData); // 원본 데이터 수정(현재 Formdata를 집어넣어서 원본을 수정)

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
    setEdit(false); // 편집 취소

    // 원본 데이터가 있으면 다시 되돌리기
    if (originalData) {
      setFormData(originalData);
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
          // API 응답값을 formData에 저장
          const historyData = {
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
          };

          setFormData(historyData);
          setOriginalData(historyData); // 원본 저장
        }
      } catch (error) {
        console.error("하나의 정기송금 설정 세부사항 조회 실패: ", error);
      }
    };

    fetchHistoryDetail();
  }, [id]);

  // formData가 아직 없으면 로딩 상태
  if (!originalData) {
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
      <header>
        <AppHeader
          title="해외 송금 내역"
          showHamburger={false}
          showEdit={true}
          edit={edit}
          handleEdit={() => setEdit(true)}
        />
      </header>

      {/* 내용 */}
      <div className="flex flex-col px-8 mt-[1.25rem]">
        <section className="w-full border border-[#86909C] rounded-xl px-[1.563rem] py-5 mb-[2.188rem]">
          <div className="space-y-3.75">
            {/* 출금 계좌 */}
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
              type="sendAmount"
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
              type="scheduled"
              regRemType={formData.regRemType} //  MONTHLY / WEEKLY 전달
              scheduledDate={formData.scheduledDate}
              scheduledDay={formData.scheduledDay}
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
              value={COUNTRY_TO_KOREAN[formData.clientCountry]}
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
              value={COUNTRY_TO_KOREAN[formData.recipientCountry]}
            />
            <InfoRow label="은행명" value={formData.recipientBankName} />
            <InfoRow label="계좌 번호" value={formData.recipientAccountNo} />
            <InfoRow label="수취 통화 코드" value={formData.receiveCurrency} />
            <InfoRow label="이름" value={formData.recipientName} />
            <InfoRow
              label="전화 번호"
              value={`${formData.recipientPhoneCc} ${formData.recipientPhoneNo}`}
            />

            {/* 정기 송금 상태 */}
            <EditableField
              label="송금 상태"
              edit={edit}
              type="regRemStatus"
              value={STATUS_TO_KOREAN[formData.regRemStatus]}
              onChangeRegRemStatus={(v) =>
                setFormData((prev) => ({ ...prev, regRemStatus: v }))
              }
            />
          </div>
        </section>
      </div>

      {edit && (
        <div className="bottom-0 left-0 right-0 flex gap-3 p-4 bg-white">
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
