"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import StepProgressBar from "../../../components/StepProgressbar";
import BottomBar from "../../../components/BottomBar";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { setClientData } from "@/src/store/features/send/sendSlice";
import { useTranslations } from "next-intl";

// 수취 통화 코드를 송금인의 국적으로 변환할 때 사용
const currencyToNationality = {
  USD: "USA",
  JPY: "JAPAN",
  MYR: "MALAYSIA",
  THB: "THAILAND",
};

export default function RemittancePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const t = useTranslations("send");

  const receiveCurrency = useSelector((state) => state.send.receiveCurrency);
  const clientName = useSelector((state) => state.send.name);
  console.log("수취 통화 코드: ", receiveCurrency);

  // 국적
  const clientCountry = receiveCurrency
    ? currencyToNationality[receiveCurrency] || ""
    : "";

  // 송금인 정보값 상태 관리
  const [formData, setFormData] = useState({
    clientName: clientName || "", // 송금인 이름
    address: "", // 송금인 주소
    detailAddr: "", // 상세 주소
  });

  useEffect(() => {
    // 주소 입력 창에서 설정한 주소를 가져오기
    const address = searchParams.get("address");
    if (address) {
      setFormData((prev) => ({
        ...prev,
        address: decodeURIComponent(address),
      }));
    }
  }, [searchParams.get("address")]);

  // 폼 유효성 검사
  const isFormValid =
    formData.clientName.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.detailAddr.trim() !== "";

  // formData 상태값 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "clientName" ? value.toUpperCase() : value,
    }));
  };

  // 주소 입력칸 클릭 시 주소창으로 이동
  const handleAddressClick = () => {
    dispatch(setClientData({ name: formData.clientName }));

    // 카카오 주소창으로 이동
    router.push("/send/regular/information/remittance/address");
  };

  // 송금인 정보 저장 후 페이지 이동
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    if (isFormValid) {
      const clientAddress = `${formData.address} ${formData.detailAddr}`.trim(); // 주소 + 상세주소

      const submissionData = {
        ...formData,
        clientCountry, // 국적은 input이 아니라서 여기서 처리
        clientAddress,
      };
      console.log("작성된 폼", submissionData);

      dispatch(setClientData(submissionData));

      router.push("/send/regular/information/recipient"); // 수취인 페이지로 이동
    } else {
      console.log("모든 입력 칸이 채워져야 됩니다");
    }
  };

  return (
    <main>
      {/* 상단 바 */}

      <AppHeader
        title={t("common.remittance")}
        show={true}
        showHamburger={false}
        showBack={true}
      />
      {/* 프로그레스 바 */}
      <div className="px-5">
        <StepProgressBar current={2} total={4} />

        <section className="flex flex-col gap-[2.188rem] mt-4">
          <h1 className="text-left text-[1.563rem] font-bold">
            {t("regular.information.title")}
          </h1>

          <hr className="border-t border-[#E5E6EB]" />

          <section className="flex flex-col gap-6">
            <h2 className="text-left text-[1.563rem] text-[#1A3668] font-bold">
              {t("regular.information.remitterTitle")}
            </h2>

            <h3 className="text-left text-[1.125rem] text-black font-semibold">
              {t("regular.information.remitterSubtitle")}
            </h3>

            {/* 입력칸 */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[1.875rem]"
            >
              {/* 이름 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  {t("regular.information.fullName")}
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder={t("regular.information.englishNamePlaceholder")}
                  className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
                />
              </div>

              {/* 국적 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  {t("regular.information.nationality")}
                </label>
                <div className="relative w-full">
                  <input
                    name="clientCountry"
                    value={clientCountry}
                    readOnly
                    className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black ${
                      clientCountry === "" ? "text-[#86909C]" : "text-black"
                    }`}
                  ></input>
                </div>
              </div>

              {/* 주소 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  {t("regular.information.address")}
                </label>
                <div
                  onClick={handleAddressClick}
                  className="w-full cursor-pointer"
                >
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    readOnly
                    placeholder={t("regular.information.addressPlaceholder")}
                    className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
                  />
                </div>
              </div>

              {/* 상세 주소 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  {t("regular.information.detailAddress")}
                </label>
                <input
                  type="text"
                  name="detailAddr"
                  value={formData.detailAddr}
                  onChange={handleChange}
                  placeholder={t(
                    "regular.information.detailAddressPlaceholder"
                  )}
                  className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
                />
              </div>
            </form>
          </section>

          {/* 하단 버튼 */}
        </section>
      </div>

      <BottomBar
        label={t("common.next")}
        onClick={handleSubmit}
        isActive={isFormValid}
      />
    </main>
  );
}
