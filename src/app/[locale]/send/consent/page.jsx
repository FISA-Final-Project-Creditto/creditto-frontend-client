"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ConsentAgree from "./components/ConsentAgree";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setModeData } from "@/src/store/features/send/sendModeSlice";
import { credittoApi } from "@/src/app/api/axios";

export default function ConsentPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [accountState, setAccountState] = useState({
    accountCount: null, // 연동된 계좌 수
    totalBalance: null, // 잔액
  }); // 연동 계좌

  useEffect(() => {
    // 계좌 잔액 합산 조회 by UserId
    const fetchAccountBalance = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        const res = await credittoApi.get("/api/accounts/me/balance", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { code, data } = res.data;
        if (code === 200) {
          setAccountState(data); // 응답값을 setAccountState에 상태 저장
          console.log("연동된 계좌 있음", data);

          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("계좌 잔액 합산 조회 by UserId 오류 발생: ", error);
      }
    };

    // 연동된 계좌가 있으면 송금 방식 저장
    if (fetchAccountBalance()) {
      const type = searchParams.get("type");
      // URL에 type 파라미터가 있을 경우에만 Redux 상태를 업데이트
      if (type) {
        dispatch(setModeData(type)); // 송금 방식 저장
      }
      // 없으면 메인페이지로 이동
    } else {
      alert("연동된 계좌가 없습니다.");
      router.replace("/");
    }
  }, []); // searchParams가 변경될 때마다 이 효과를 다시 실행

  // 약관 동의서
  const consents = [
    { id: 4, label: "해외송금 거래정보 수집·이용 동의서", required: true },
    {
      id: 5,
      label: "해외송금 고객확인 및 자금세탁방지 동의서",
      required: true,
    },
    { id: 6, label: "해외송금 제한 국가 관련 확인 동의서", required: true },
  ];

  return <ConsentAgree title="약관 동의" consents={consents} />;
}
