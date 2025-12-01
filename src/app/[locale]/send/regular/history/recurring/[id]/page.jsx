"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { setSendHistoryData } from "@/src/store/features/sendHistory/sendHistorySlice";
import { credittoApi } from "@/src/app/api/axios";
import RegSendHistoryItem from "../../components/RegSendHistoryItem";
import RecurringHistory from "../components/RecurringHistory";
import { useTranslations } from "next-intl";

// 정기적으로 송금 내역을 보여주는 페이지
export default function RecurringPage({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const { id } = params;
  const t = useTranslations("send.regular.history");

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // 하나의 정기송금 설정에 대한 송금 기록 내역들
  // ✅ TODO: 실제 이름은 details로 수정
  const [realDetails, setRealDetails] = useState([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // 수취인과 수취 계좌번호 가져오기
  const recipientName = searchParams.get("recipientName");
  const recipientAccountNo = searchParams.get("accountNo");

  // 로딩 / 에러 상태
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 정기 해외 송금 내역(Mock 데이터)
  const details = [
    {
      sendAmount: 1486098.0,
      exchangeRate: 1459.21,
      createdDate: "2025-11-25",
    },
    {
      sendAmount: 1488209.0,
      exchangeRate: 1461.29,
      createdDate: "2025-10-25",
    },
    {
      sendAmount: 1479419.0,
      exchangeRate: 1452.63,
      createdDate: "2025-09-25",
    },
    {
      sendAmount: 1485804.0,
      exchangeRate: 1458.92,
      createdDate: "2025-08-25",
    },
    {
      sendAmount: 1485804.0,
      exchangeRate: 1458.92,
      createdDate: "2025-07-25",
    },
    {
      sendAmount: 1485804.0,
      exchangeRate: 1458.92,
      createdDate: "2025-06-25",
    },
  ];

  const detail = details.find((h) => h.id === parseInt(id)); // 부모에게 전달받은 params(id)와 histories에서 동일한 id값을 가진 history 찾기

  // 하나의 정기송금 설정에 대한 송금 기록 조회
  useEffect(() => {
    const fetchRegSendHistory = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        setIsLoading(true); // API 응답 기다리는 동안 로딩 진행

        const res = await credittoApi.get(`/api/remittance/scheduled/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.data.code === 200) {
          console.log("특정 정기송금 기록 조회 성공: ", res.data);
          setRealDetails(res.data.data); // 내역 리스트에 저장

          // Redux 스토어에 저장
          const reduxData = {
            regRemId: id,
            recipientName: recipientName,
            recipientAccountNo: recipientAccountNo,
          };
          dispatch(setSendHistoryData(reduxData));
        }
      } catch (error) {
        console.log("하나의 정기송금 설정에 대한 송금 기록 조회 실패: ", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegSendHistory();
  }, [id, dispatch, recipientName, recipientAccountNo]); // 빈 배열 → 페이지 렌더 시 1회 실행

  // 리스트 아이템 클릭 시 모달 열기
  const handleHistoryItemClick = async (item) => {
    setIsHistoryModalOpen(true);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* 상단바 */}
      <header>
        <AppHeader
          title={t("recurringTitle")}
          showBack={true}
          showHamburger={false}
        />
      </header>

      {/* 정기 송금 내역 */}
      <section className="flex flex-col gap-4 px-8">
        <h1 className="text-left mt-[40px] text-[1.563rem] text-[#1A3668] font-bold">
          {t("recurringTitle")}
          {/* <span className="text-lg text-[#86909C]">({detail.recipient})</span> */}
        </h1>
      </section>

      {/* 수취인 정보 박스 */}
      <section className="px-8 mt-[1.875rem]">
        <div className="w-full rounded-lg border border-[#E5E6EB] bg-[#F7F8FA] px-[1.25rem] py-[0.938rem] flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#86909C]">
              {t("recipient")}
            </span>
            <span className="text-sm font-semibold text-black">
              {recipientName}
            </span>
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-xs text-[#86909C]">
              {t("recipientAccount")}
            </span>
            <div className="text-sm font-medium text-black">
              {recipientAccountNo}
            </div>
          </div>
        </div>
      </section>

      {/* 정기 송금 내역 */}
      <main className="space-y-[1.875rem] mb-[2.813rem] px-8 mt-[2.875rem]">
        <RegSendHistoryItem
          details={details}
          onItemClick={handleHistoryItemClick}
        />
      </main>

      {/* 정기 송금 완료 컴포넌트 */}
      <div className="flex items-center w-full gap-3 px-8">
        {/* 왼쪽 가로 라인 */}
        <div className="flex-1 border-t border-[#86909C]" />

        {/* 오른쪽 텍스트 영역 */}
        <div className="flex flex-col items-end font-semibold">
          <span className="text-base text-black">{t("completed")}</span>
          <span className="text-right text-sm" style={{ color: "#2EA62E" }}>
            {t("creditScoreUp")}
          </span>
        </div>
      </div>

      {/* RecurringHistory 모달 오버레이 */}
      {isHistoryModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setIsHistoryModalOpen(false)} // 바깥 클릭 시 닫기
        >
          <div
            className="w-full max-w-[440px] max-h-[90vh] bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()} // 안쪽 클릭 시 전파 막기
          >
            <RecurringHistory
              // 필요하면 props로 데이터도 넘길 수 있음
              // remittanceData={...}
              onClose={() => setIsHistoryModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
