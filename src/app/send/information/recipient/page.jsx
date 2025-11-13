"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import StepProgressBar from "../components/StepProgressbar";
import BottomBar from "../../components/BottomBar";

// 국가 코드 별 은행 목록
const BANK_OPTIONS = {
  "+1": [
    { name: "JP모건 체이스", code: "JPMCUS33" },
    { name: "뱅크 오브 아메리카", code: "BOFAUS3N" },
    { name: "웰스 파고", code: "WFBIUS6S" },
  ],
  "+86": [
    { name: "교통은행", code: "COMMCNSH" },
    { name: "중국은행", code: "BKCHCNBJ" },
    { name: "중국농업은행", code: "ABOCCNBJ" },
  ],
  "+81": [
    { name: "미쓰비시UFJ은행", code: "BOTKJPJT" },
    { name: "미쓰이스미토모은행", code: "SMBCJPJT" },
    { name: "미즈호은행", code: "MHCBJPJT" },
  ],
};

export default function RecipientPage() {
  const router = useRouter();

  // 수취인 정보값 상태 관리
  const [formData, setFormData] = useState({
    name: "", // 수취인 이름
    phone: "", // 전화번호
    phonecode: 0, // 전화번호 국가 코드
    bankname: "", // 수취 은행명
    bankcode: "", // 수취 은행 코드
    account: "", // 수취 계좌 번호
    country: "", // 수취인 국적
    currencycode: "", // 수취 통화 코드
  });

  const selectedBankList = BANK_OPTIONS[`+${formData.phonecode}`] || [];

  // 폼 유효성 검사
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.phonecode > 0 &&
    formData.bankname.trim() !== "" &&
    formData.bankcode.trim() !== "" &&
    formData.account.trim() !== "" &&
    formData.country.trim() !== "" &&
    formData.currencycode.trim() !== "";

  // 국가 코드에 따른 전화번호 자동 하이픈 포맷팅
  const formatPhoneNumber = (rawValue, phoneCode) => {
    const digits = rawValue.replace(/\D/g, ""); // 숫자만 추출

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
        return digits;
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

  // 폼 제출
  const handleSubmit = (e) => {
    e?.preventDefault?.(); // form submit / 버튼 클릭 둘 다 대응
    if (isFormValid) {
      const submissionData = {
        ...formData,
      };
      console.log("작성된 폼", submissionData);
      router.push("/send/information/bank");
    } else {
      console.log("모든 입력 칸이 채워져야 됩니다");
    }
  };

  // 공통 input 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 전화번호 입력 시: 국가 코드에 따라 포맷팅
    if (name === "phone") {
      const formatted =
        formData.phonecode === 0
          ? value.replace(/\D/g, "") // 코드 미선택 시 숫자만
          : formatPhoneNumber(value, formData.phonecode);

      setFormData((prevData) => ({
        ...prevData,
        phone: formatted,
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 국가 코드 변경 시: phone 코드 업데이트 + 기존 phone 값 포맷팅 적용
  const handlePhoneCodeChange = (e) => {
    const value = Number(e.target.value); // 정수 변환

    setFormData((prev) => {
      const formattedPhone =
        value === 0 ? prev.phone : formatPhoneNumber(prev.phone, value);

      return {
        ...prev,
        phonecode: value,
        phone: formattedPhone, // 기존 입력 전화번호를 새 국가 포맷에 맞게 변환
      };
    });
  };

  // 은행 선택 시 은행명 + 코드 동시 업데이트
  const handleBankChange = (e) => {
    const { value } = e.target; // value를 은행명으로 사용
    const bank = selectedBankList.find((b) => b.name === value);

    setFormData((prev) => ({
      ...prev,
      bankname: value,
      bankcode: bank?.code || "",
    }));
  };

  return (
    <div className="flex min-h-dvh justify-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-dvh mx-auto flex flex-col bg-white">
        {/* 상단 바 + 프로그레스 바 */}
        <header className="pt-[env(safe-area-inset-top)]">
          {/* 상단 바 */}
          <Header />

          {/* 프로그레스 바 */}
          <StepProgressBar current={3} total={4} />
        </header>

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
                    placeholder="대문자로 입력하세요"
                    className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] placeholder:text-[#86909C] focus:outline-none"
                  />
                </div>

                {/* 수취인 전화번호 */}
                <div className="flex flex-col items-start">
                  <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                    전화번호 (Phone Number)
                  </label>

                  <div className="flex w-full">
                    {/* 국가 코드 드롭다운 */}
                    <select
                      name="phonecode"
                      value={formData.phonecode}
                      onChange={handlePhoneCodeChange}
                      className="px-3 py-3 bg-[#F7F8FA] text-[#4E5969] text-sm focus:outline-none"
                    >
                      <option value={0}>코드</option>
                      <option value={1}>🇺🇸 +1</option>
                      <option value={86}>🇨🇳 +86</option>
                      <option value={81}>🇯🇵 +81</option>
                    </select>

                    {/* 전화번호 입력 */}
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="전화번호를 입력하세요"
                      className="w-full px-4 py-3 bg-[#F7F8FA] text-[#86909C] placeholder:text-[#86909C] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 수취 은행명 + 은행 코드 */}
                <div className="flex flex-col items-start">
                  <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                    은행명 (Bank Name)
                  </label>

                  <div className="flex w-full gap-2 items-center">
                    {/* 은행명 셀렉트 */}
                    <div className="relative flex-1">
                      <select
                        name="bankname"
                        value={formData.bankname}
                        onChange={handleBankChange}
                        className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] focus:outline-none"
                      >
                        <option value="">
                          {selectedBankList.length > 0
                            ? "은행명을 선택하세요"
                            : "국가 코드를 먼저 선택하세요"}
                        </option>
                        {selectedBankList.map((bank) => (
                          <option key={bank.code} value={bank.name}>
                            {bank.name}
                          </option>
                        ))}
                      </select>
                      {selectedBankList.length > 0 ? (
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86909C] pointer-events-none" />
                      ) : (
                        " "
                      )}
                    </div>

                    {/* 은행 코드 표시 */}
                    <div className="min-w-[120px] px-3 py-3 bg-[#F7F8FA] border border-dashed border-[#E5E6EB] text-[0.875rem] text-[#4E5969] text-center">
                      {formData.bankcode || "은행 코드"}
                    </div>
                  </div>
                </div>

                {/* 국가 */}
                <div className="flex flex-col items-start">
                  <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                    국가 (Country)
                  </label>
                  <div className="relative w-full">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] focus:outline-none"
                    >
                      <option value="">국적을 선택하세요</option>
                      <option value="US">미국(USA)</option>
                      <option value="CHN">중국(CHINA)</option>
                      <option value="JPN">일본(JAPAN)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* 계좌번호 */}
                <div className="flex flex-col items-start">
                  <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                    계좌 번호 (Account Code)
                  </label>
                  <input
                    type="text"
                    name="account"
                    value={formData.account}
                    onChange={handleChange}
                    placeholder="계좌번호를 입력하세요"
                    className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] placeholder:text-[#86909C] focus:outline-none"
                  />
                </div>

                {/* 통화 코드 */}
                <div className="flex flex-col items-start">
                  <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                    통화 코드
                  </label>
                  <div className="relative w-full">
                    <select
                      value={formData.currencycode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] focus:outline-none"
                    >
                      <option value="">
                        송금 통화를 선택하세요 (예: USD, JPY 등)
                      </option>
                      <option value="USD">USD - 미국 달러</option>
                      <option value="JPY">JPY - 일본 엔화</option>
                      <option value="CHY">CHY - 중국 위안화</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <BottomBar
                  label="다음"
                  onClick={handleSubmit}
                  isActive={isFormValid}
                />
              </form>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}
