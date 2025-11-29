"use client";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useDispatch } from "react-redux";
import { requireVerification } from "@/src/store/features/simplepw/simplepwSlice";
import { setSerialNumber } from "@/src/store/features/signup/userSlice"; // 새로 만든 액션을 import 합니다.
import BottomBar from "../send/components/BottomBar";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("login");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  // 페이지가 렌더링될 때 이미 로그인 상태인지 확인합니다.
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      alert(t("alert.alreadyLoggedIn"));
      router.replace("/main");
    }
  }, [router, t]);

  const LoginHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/certificate/serialNumber", {
        username: name,
        phoneNo: phoneNo,
      });

      // console.log("데이터 정보:", res.data);

      // 요청 성공 후 다음 로직을 여기에 구현합니다.
      // 예를 들어, 응답 데이터에 특정 값이 있을 때 페이지를 이동시킬 수 있습니다.
      // API 응답 데이터에 serialNumber가 있다고 가정합니다. (실제 키 이름은 API 명세에 맞게 확인 필요)
      if (res.data) {
        alert(t("alert.authSuccess"));
        // 1. Redux 스토어에 serialNumber 저장
        // console.log("serialNumber:", res.data.data.certificate_serial);
        dispatch(setSerialNumber(res.data.data.certificate_serial));
        dispatch(requireVerification("/main")); // 로그인 성공 시 /main으로 이동하도록 설정
        // 2. 비밀번호 입력 페이지로 이동
        router.push("/auth/pw"); // 비밀번호 입력 페이지로 이동
      }
    } catch (err) {
      console.error("요청 실패:", err);
    }
  };

  const NameField = (
    <div className="w-full h-[70px] border border-gray-300 rounded-lg flex flex-col justify-center px-5">
      <label className="text-sm text-gray-600">{t("name.label")}</label>
      <input
        value={name}
        type="text"
        placeholder={t("name.placeholder")}
        className="w-full border-gray-300 focus:outline-none focus:border-[#1A3668] text-[20px] pb-1"
        onChange={(e) => setName(e.target.value)}
        onInput={(e) => {
          // 한글, 영문자, 공백만 허용하고 나머지는 제거합니다.
          const value = e.target.value.replace(
            /[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/g,
            ""
          );
          e.target.value = value;
          setName(value);
        }}
      />
    </div>
  );

  const PhoneField = (
    <div className="w-full h-[70px] border border-gray-300 rounded-lg flex flex-col justify-center px-5">
      <label className="text-sm text-gray-600 ">{t("phone.label")}</label>
      <input
        value={phoneNo}
        type="text"
        placeholder={t("phone.placeholder")}
        className="w-full border-gray-300 focus:outline-none focus:border-[#1A3668] text-[20px] pb-1 tracking-wider"
        onInput={(e) => {
          // 1️⃣ 숫자만 남기기
          let value = e.target.value.replace(/[^0-9]/g, "");

          // 2️⃣ 최대 11자리까지만 입력 가능
          if (value.length > 11) value = value.slice(0, 11);

          // 3️⃣ 하이픈 자동 삽입 (010-xxxx-xxxx)
          if (value.length > 7) {
            value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
          } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
          }

          e.target.value = value;
          setPhoneNo(value);
        }}
      />
    </div>
  );

  return (
    <main className="h-[100dvh] flex justify-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-[100dvh] mx-auto flex  flex-col bg-white">
        <AppHeader
          title={t("auth.title")}
          show={true}
          showHamburger={true}
          showBack={true}
        />
        <form onSubmit={LoginHandle} className="flex flex-col flex-1">
          <div className="flex-1 px-8 pt-8 pb-10 text-left space-y-6">
            {/* 상단 문구 */}
            <h1 className="text-[20px] font-bold mb-5">
              {t("auth.instructionPart1")}
              <br />
              {t("auth.instructionPart2")}
            </h1>

            {/* 입력 필드 */}
            {NameField}
            {PhoneField}
          </div>
          <footer>
            <BottomBar label={t("button.login")} isActive={true} />
          </footer>
        </form>
      </div>
    </main>
  );
}
