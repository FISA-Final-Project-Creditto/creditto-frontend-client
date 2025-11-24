"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StepProgressBar from "../components/StepProgressbar";
import BottomBar from "../../components/BottomBar";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useSelector } from "react-redux";

const phoneCodes = {
  USD: "🇺🇸 +1",
  CHN: "🇨🇳 +86",
  JPY: "🇯🇵 +81",
};

// 국가 번호만 추출하는 함수 (예: "🇺🇸 +1" -> "1")
function extractDialCode(phoneCode) {
  if (!phoneCode) return "";
  const match = phoneCode.match(/\+(\d+)/);
  return match ? match[1] : "";
}

// 전화번호 포맷팅 함수
const formatPhoneNumber = (digits, phoneCode) => {
  // digits: 숫자만 들어있는 문자열
  // phoneCode: 숫자 (예: 1, 86, 81)

  let pattern;
  switch (phoneCode) {
    case 1: // 미국: 3-3-4
      pattern = [3, 3, 4];
      break;
    case 86: // 중국: 3-4-4
    case 81: // 일본: 3-4-4
      pattern = [3, 4, 4];
      break;
    default:
      return digits; // 패턴 없으면 그냥 숫자만
  }

  let result = "";
  let idx = 0;

  for (let i = 0; i < pattern.length && idx < digits.length; i++) {
    const blockSize = pattern[i];
    const block = digits.slice(idx, idx + blockSize);
    if (!block) break;

    result += (i === 0 ? "" : "-") + block;
    idx += blockSize;
  }

  return result;
};

export default function RecipientPage() {
  const router = useRouter();

  // Redux에서 수취 통화 코드 가져오기 (USD / CNH / JPY 등)
  const receivedCurrency = useSelector((state) => state.send.receivedCurrency);

  // 화면에 보여줄 전화 국가 코드
  const displayPhoneCode = phoneCodes[receivedCurrency] || "";

  // 포맷팅에 사용할 실제 다이얼 코드 숫자 ("1", "86", "81")
  const initialDialCode = extractDialCode(displayPhoneCode); // 문자열

  // 수취인 정보값 상태 관리
  const [formData, setFormData] = useState({
    name: "", // 수취인 이름
    phone: "", // 전화번호 (3-3-4 또는 3-4-4 등 포맷 적용)
    phonecode: initialDialCode, // 숫자 문자열: "1", "86", "81"
    address: "", // 수취인 주소
  });

  // 폼 유효성 검사
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.phonecode !== "" && // 숫자 코드 존재 여부로 체크
    formData.address.trim() !== "";

  // 폼 제출
  const handleSubmit = (e) => {
    e?.preventDefault?.(); // form submit / 버튼 클릭 둘 다 대응
    if (isFormValid) {
      const submissionData = {
        ...formData,
      };
      console.log("작성된 폼", submissionData);
      router.push("/send/information/bank"); // 수취 은행 페이지로 이동
    } else {
      console.log("모든 입력 칸이 채워져야 됩니다");
    }
  };

  // 공통 input 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 전화번호 입력 시: 국가 코드에 따라 포맷팅
    if (name === "phone") {
      const digits = value.replace(/\D/g, ""); // 숫자만 추출

      // phonecode가 없으면 그냥 숫자만
      if (!formData.phonecode) {
        setFormData((prevData) => ({
          ...prevData,
          phone: digits,
        }));
        return;
      }

      const dialCodeNum = Number(formData.phonecode); // "1" -> 1
      const formatted = formatPhoneNumber(digits, dialCodeNum);

      setFormData((prevData) => ({
        ...prevData,
        phone: formatted,
      }));
      return;
    }

    // 이름: 자동 대문자 변환
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "name" ? value.toUpperCase() : value,
    }));
  };

  return (
    <div className="flex min-h-dvh justify-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-dvh mx-auto flex flex-col bg-white">
        {/* 상단 바 + 프로그레스 바 */}
        <header className="pt-[env(safe-area-inset-top)]">
          <AppHeader
            title="해외 송금"
            show={true}
            showHamburger={false}
            showBack={true}
          />
        </header>

        <div className="px-5">
          <StepProgressBar current={3} total={4} />

          {/* 메인 컨텐츠 영역 */}
          <main className="flex-1 pt-4 pb-6 overflow-y-auto">
            <section className="flex flex-col gap-[2.188rem]">
              <h1 className="text-left text-[1.563rem] font-bold">
                <span className="text-[#1A3668]">해외 송금</span> 기본 정보를
                <br />
                입력해주세요
              </h1>

              <hr className="border-t border-[#E5E6EB]" />

              <section className="flex flex-col gap-6">
                <h2 className="text-left text-[1.563rem] text-[#1A3668] font-bold">
                  받는 분
                </h2>

                <h3 className="text-left text-[1.125rem] text-black font-semibold">
                  수취인 정보를 입력해주세요
                </h3>

                {/* 입력칸 */}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-[1.875rem]"
                >
                  {/* 이름 */}
                  <div className="flex flex-col items-start">
                    <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                      이름 (Full Name)
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="영문으로 입력하세요"
                      className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
                    />
                  </div>

                  {/* 수취인 전화번호 */}
                  <div className="flex w-full">
                    {/* 국가 코드 */}
                    <input
                      name="phonecodeDisplay"
                      disabled={true}
                      value={displayPhoneCode}
                      className={`w-[20%] px-3 py-3 bg-[#F7F8FA] text-sm focus:outline-none ${
                        !displayPhoneCode ? "text-[#86909C]" : "text-black"
                      }`}
                    />

                    {/* 실제 전화번호 */}
                    <input
                      type="text"
                      inputMode="numeric"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="전화번호를 입력하세요"
                      className="w-[80%] px-4 py-3 bg-[#F7F8FA] text-black placeholder:text-[#86909C] focus:outline-none"
                    />
                  </div>

                  {/* 주소 */}
                  <div className="flex flex-col items-start">
                    <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                      주소
                    </label>
                    <div className="relative w-full">
                      <input
                        name="address"
                        value={formData.address}
                        placeholder="주소를 입력하세요"
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none focus:outline-none ${
                          formData.address === ""
                            ? "text-[#86909C]"
                            : "text-black"
                        }`}
                      />
                    </div>
                  </div>
                </form>
              </section>
            </section>
          </main>
        </div>

        <BottomBar label="다음" onClick={handleSubmit} isActive={isFormValid} />
      </div>
    </div>
  );
}
