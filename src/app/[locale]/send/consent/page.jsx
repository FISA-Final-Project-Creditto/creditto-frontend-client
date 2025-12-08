"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ConsentAgree from "./components/ConsentAgree";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setModeData } from "@/src/store/features/send/sendModeSlice";
import { credittoApi } from "@/src/app/api/axios";
import { useTranslations } from "next-intl";

export default function ConsentPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("send.consent");

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
          console.log(t("log_linked_account_exist"), data);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(t("log_balance_inquiry_error"), error);
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
      alert(t("alert_no_linked_account"));
      router.replace("/");
    }
  }, [dispatch, router, searchParams, t]);

  // 약관 동의서
  const consents = [
    { id: 4, label: t("consent1"), required: true },
    {
      id: 5,
      label: t("consent2"),
      required: true,
    },
    { id: 6, label: t("consent3"), required: true },
  ];

  // 송금 메인페이지로 이동
  const handleBack = () => {
    router.push("/send");
  };

  return (
    <ConsentAgree
      title={t("title")}
      consents={consents}
      onBackClick={handleBack}
    />
  );
}
