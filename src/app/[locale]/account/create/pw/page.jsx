"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { setCreateAccount } from "@/src/store/features/account/accountSlice";
import { credittoApi } from "@/src/app/api/axios";
import {
  selectReceiveCurrency,
  selectRecipientInfo,
  selectSendInfo,
} from "@/src/store/features/send/sendSelectors";

// 보안 키보드 컴포넌트를 동적으로 가져옵니다. 서버 사이드 렌더링을 비활성화합니다.
const SecurePinKeyboard = dynamic(
  () => import("../components/SecurePinKeyboard"),
  { ssr: false }
);

export default function SecurePage({ length = 4 }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("account.create.pw");

  // selector로 데이터 가져오기(send 모드에서 사용)
  const sendInfo = useSelector(selectSendInfo);
  const recipientInfo = useSelector(selectRecipientInfo);
  const receiveCurrency = useSelector(selectReceiveCurrency);

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "create"; // "create" | "send"
  const accountId = useSelector((state) => state.send.accountId); // 계좌 번호
  console.log("계좌 아이디: ", accountId);

  const [pin, setPin] = useState("");
  const [firstPin, setFirstPin] = useState(null);
  const [step, setStep] = useState(1); // 1: 첫 입력, 2: 확인 입력 (create 모드에서만 사용)
  const [isShaking, setIsShaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [shuffleToken, setShuffleToken] = useState(1);

  const hiddenInputRef = useRef(null);

  // 비밀번호 입력이 완료될 때 호출되는 함수
  const emitChange = useCallback(
    async (v) => {
      if (v.length < length) return; // 비밀번호가 4자리가 아니면 아무것도 하지 않음

      // 1) 계좌 생성 모드
      if (mode === "create") {
        // --- 1단계: 첫 번째 비밀번호 입력 ---
        if (step === 1) {
          setFirstPin(v);
          setStep(2);
          setPin("");
          setErrorMessage("");
          setShuffleToken((prev) => prev + 1);
          return;
        }

        // --- 2단계: 비밀번호 확인 입력 ---
        if (step === 2) {
          if (v === firstPin) {
            console.log("계좌 비밀번호 설정 완료:", v);

            // Redux에 비밀번호 저장
            dispatch(
              setCreateAccount({
                password: v,
              })
            );

            // 계좌 생성 확인 페이지로 이동
            router.push("/account/create/confirm");
          } else {
            // 불일치 처리
            setPin("");
            setIsShaking(true);
            setFirstPin(null);
            setStep(1);
            setErrorMessage(t("passwordsDoNotMatch"));
            setShuffleToken((prev) => prev + 1);
          }
        }

        return;
      }

      // 송금용 비밀번호 검증 모드
      if (mode === "send") {
        // 계좌번호가 없으면 에러 처리
        if (accountId === null) {
          setErrorMessage("계좌 정보가 없습니다. 다시 시도해주세요.");
          setPin("");
          return;
        }

        const requestData = {
          accountId: sendInfo.accountId,
          accountNo: sendInfo.accountNo,
          recipientInfo: {
            ...recipientInfo,
            receiveCurrency,
          },
          recurId: null, // 일회성이라 null
          startDate: sendInfo.startDate,
          sendCurrency: sendInfo.sendCurrency,
          targetAmount: sendInfo.targetAmount,
          password: v,
        };

        // 비밀번호 검증 및 일회성 송금 요청
        try {
          const accessToken = sessionStorage.getItem("accessToken");
          console.log("accessToken: ", accessToken);
          if (!accessToken) {
            console.error("Access Token이 없습니다.");
            return;
          }
          const res = await credittoApi.post(
            "/api/remittance/once",
            requestData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (res.data.code === 200) {
            // 신청 결과 페이지로 이동
            router.push("/send/one-off/result");
          }
        } catch (error) {
          console.log("정기 해외 송금 신청 실패: ", error.response);

          const res = error.response;

          if (res.data.code === 40005) {
            // 비밀번호 불일치
            setPin("");
            setIsShaking(true);
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            setShuffleToken((prev) => prev + 1);
          } else {
            // 그 외 (네트워크 에러, 서버 에러 등)
            setPin("");
            setIsShaking(true);
            setErrorMessage("잠시 후 다시 시도해주세요.");
            setShuffleToken((prev) => prev + 1);
          }
        }
      }
    },
    [
      length,
      mode,
      step,
      firstPin,
      t,
      accountId,
      dispatch,
      router,
      sendInfo,
      recipientInfo,
      receiveCurrency,
    ]
  );

  // 숫자 버튼 클릭 시
  const onDigit = useCallback(
    (d) => {
      if (pin.length >= length) return;
      if (errorMessage) setErrorMessage("");
      setPin(pin + d);
    },
    [pin, length, errorMessage]
  );

  // 백스페이스
  const onBackspace = useCallback(() => {
    if (!pin.length) return;
    setPin(pin.slice(0, -1));
  }, [pin]);

  // Clear
  const onClear = useCallback(() => {
    setPin("");
  }, []);

  // pin이 바뀔 때마다 emitChange 호출
  useEffect(() => {
    const handleEmit = () => {
      emitChange(pin);
    };

    handleEmit();
  }, [pin, emitChange]);

  // 물리 키보드 입력 처리
  const onPhysicalKey = (e) => {
    e.preventDefault();
    if (e.key === "Backspace") return onBackspace();
    if (/^[0-9]$/.test(e.key)) return onDigit(e.key);
  };

  const isCreateMode = mode === "create";

  return (
    <>
      <AppHeader
        title={t("headerTitle")}
        show={true}
        showBack={true}
        showHamburger={false}
      />
      <section
        className="min-h-dvh flex flex-col pt-[6.25rem] bg-white"
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* 숨겨진 입력 필드 (물리 키보드 포커스용) */}
        <input
          ref={hiddenInputRef}
          inputMode="numeric"
          autoComplete="one-time-code"
          className="sr-only"
          onKeyDown={onPhysicalKey}
          aria-hidden
        />

        {/* 상단: 타이틀/서브타이틀/인디케이터 */}
        <div>
          <h1 className="text-[1.375rem] font-medium text-black leading-snug mb-[1.875rem] whitespace-pre-line text-center">
            {isCreateMode
              ? step === 1
                ? t("setTitle")
                : t("againTitle")
              : t("inputTitle")}
          </h1>

          <div className="flex flex-col items-center ">
            {errorMessage ? (
              <p className="text-[#F53F3F] text-sm mt-1">{errorMessage}</p>
            ) : (
              <p className="text-[#4E5969] text-sm mt-1 h-5">
                {isCreateMode && step === 2 ? t("confirmInput") : ""}
              </p>
            )}

            {/* PIN 인디케이터 */}
            <div
              className="mt-6 flex items-center gap-3"
              onClick={() => hiddenInputRef.current?.focus()}
              role="group"
              aria-label="비밀번호 자리수"
              onAnimationEnd={() => setIsShaking(false)}
            >
              {Array.from({ length }).map((_, i) => (
                <span
                  key={i}
                  className={[
                    "w-3 h-3 rounded-full border transition-all",
                    i < pin.length
                      ? "bg-[#1a2f5a] border-[#1a2f5a]"
                      : "border-[#C9CDD2] bg-transparent",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex-1"
          onClick={() => hiddenInputRef.current?.focus()}
        />

        {/* 하단: 키패드 */}
        <SecurePinKeyboard
          accentHex="#1a2f5a"
          onDigit={onDigit}
          onBackspace={onBackspace}
          onClear={onClear}
          shuffleToken={shuffleToken}
        />
      </section>
    </>
  );
}
