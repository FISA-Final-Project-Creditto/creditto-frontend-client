"use client";

import { useSearchParams } from "next/navigation";
import ConsentAgree from "./components/ConsentAgree";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setModeData } from "@/src/store/features/send/sendModeSlice";

export default function ConsentPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type");
    // URL에 type 파라미터가 있을 경우에만 Redux 상태를 업데이트
    if (type) {
      dispatch(setModeData(type)); // 송금 방식 저장
    }
  }, [searchParams, dispatch]); // searchParams가 변경될 때마다 이 효과를 다시 실행

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
