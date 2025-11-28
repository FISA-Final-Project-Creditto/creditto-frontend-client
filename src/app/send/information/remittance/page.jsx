"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StepProgressBar from "../components/StepProgressbar";
import BottomBar from "../../components/BottomBar";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useDispatch, useSelector } from "react-redux";

const currencyToNationality = {
  USD: "USA",
  CHN: "CHINA",
  JPY: "JAPAN",
};

export default function RemittancePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // 수취 통화 코드 가져오기
  const receivedCurrency = useSelector((state) => state.send.receivedCurrency);

  // 송금인 정보값 상태 관리
  const [formData, setFormData] = useState({
    name: "", // 송금인 이름
    nationality: currencyToNationality[receivedCurrency], // 송금인 국적
    address: "", // 송금인 주소
    detailAddr: "", // 상세 주소
  });

  // 폼 유효성 검사
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.detailAddr.trim() !== "";

  // formData 상태값 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "name" ? value.toUpperCase() : value,
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
                  placeholder="영문으로 입력하세요"
                  className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
                />
              </div>

              {/* 국적 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  국적 (Nationality)
                </label>
                <div className="relative w-full">
                  <input
                    name="nationality"
                    disabled={true}
                    value={formData.nationality}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black ${
                      formData.nationality === ""
                        ? "text-[#86909C]"
                        : "text-black"
                    }`}
                  ></input>
                </div>
              </div>

              {/* 주소 */}
              {/* ✅ 카카오 지도 API로 주소 가져오기 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  주소 (Address)
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="송금인의 거주 주소를 입력하세요"
                  className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
                />
              </div>

              {/* 상세 주소 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  상세 주소
                </label>
                <input
                  type="text"
                  name="detailAddr"
                  value={formData.detailAddr}
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
