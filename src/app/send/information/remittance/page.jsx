"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import StepProgressBar from "../components/StepProgressbar";
import BottomBar from "../../components/BottomBar";
import AppHeader from "@/src/common/AppHeader/AppHeader";

export default function RemittancePage() {
  const router = useRouter();

  // 송금인 정보값 상태 관리
  const [formData, setFormData] = useState({
    name: "", // 송금인 이름
    country: "", // 송금인 국적
    city: "", // 송금인 거주 도시
    address: "", // 주소
  });

  // 폼 유효성 검사
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.country.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.address.trim() !== "";

  // formData 상태값 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    if (isFormValid) {
      const submissionData = {
        ...formData,
      };
      console.log("작성된 폼", submissionData);

      router.push("/send/information/recipient"); // 수취인 페이지로 이동
    } else {
      console.log("모든 입력 칸이 채워져야 됩니다");
    }
  };

  return (
    <main>
      {/* 상단 바 */}

      <AppHeader
        title="해외 송금"
        show={true}
        showHamburger={false}
        showBack={true}
      />
      {/* 프로그레스 바 */}
      <div className="px-5">
        <StepProgressBar current={2} total={4} />

        <section className="flex flex-col gap-[2.188rem] mt-4">
          <h1 className="text-left text-[1.563rem] font-bold">
            <span className="text-[#1A3668]">해외 송금</span> 기본 정보를
            <br />
            입력해주세요
          </h1>

          <hr className="border-t border-[#E5E6EB]" />

          <section className="flex flex-col gap-6">
            <h2 className="text-left text-[1.563rem] text-[#1A3668] font-bold">
              보내시는 분
            </h2>

            <h3 className="text-left text-[1.125rem] text-black font-semibold">
              국내 체류 정보를 입력해주세요
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
                  placeholder="대문자로 입력해주세요"
                  className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
                />
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
                    className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] focus:outline-none ${
                      formData.country === "" ? "text-[#86909C]" : "text-black"
                    }`}
                  >
                    <option value="">국적을 선택하세요</option>
                    <option value="US">미국(USA)</option>
                    <option value="CHN">중국(CHINA)</option>
                    <option value="JPN">일본(JAPAN)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* 도시 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  거주 도시 (City)
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="거주 도시를 입력하세요"
                  className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
                />
              </div>

              {/* 상세 주소 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  주소 (Address)
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="주소를 입력하세요"
                  className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
                />
              </div>
            </form>
          </section>

          {/* 하단 버튼 */}
        </section>
      </div>
      <BottomBar label="다음" onClick={handleSubmit} isActive={isFormValid} />
    </main>
  );
}
