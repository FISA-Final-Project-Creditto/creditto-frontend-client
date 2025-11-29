"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import StepProgressBar from "../../../components/StepProgressbar";
import BottomBar from "../../../components/BottomBar";
import Modal from "../../components/Modal";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { setBankData } from "@/src/store/features/send/sendSlice";
import {
  selectTypeData,
  selectClientData,
  selectRecipientData,
  selectBankData,
} from "@/src/store/features/send/sendSelectors";
import { credittoApi } from "@/src/app/api/axios";
import { useTranslations } from "next-intl";

export default function BankPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations("send");

  // 국가별 은행 목록
  const BANK_OPTIONS = {
    USD: [
      { name: t("oneOff.choose.bankJPMorgan"), code: "JPMCUS33" },
      { name: t("oneOff.choose.bankBOA"), code: "BOFAUS3N" },
      { name: t("oneOff.choose.bankWellsFargo"), code: "WFBIUS6S" },
    ],
    CNY: [
      { name: t("oneOff.choose.bankBOC"), code: "COMMCNSH" },
      { name: t("oneOff.choose.bankICBC"), code: "BKCHCNBJ" },
      { name: t("oneOff.choose.bankABC"), code: "ABOCCNBJ" },
    ],
    JPY: [
      { name: t("oneOff.choose.bankMUFG"), code: "BOTKJPJT" },
      { name: t("one-off.choose.bankSMBC"), code: "SMBCJPJT" },
      { name: t("oneOff.choose.bankMizuho"), code: "MHCBJPJT" },
    ],
  };

  // selector로 데이터 가져오기
  const typeData = useSelector(selectTypeData);
  const clientData = useSelector(selectClientData);
  const recipientData = useSelector(selectRecipientData);
  const bankData = useSelector(selectBankData);

  // 수취 통화 코드 가져오기
  const receiveCurrency = useSelector((state) => state.send.receiveCurrency);

  // 해당 국가의 은행 가져오기
  const banks = BANK_OPTIONS[receiveCurrency] || [];

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 수취인 정보값 상태 관리
  const [formData, setFormData] = useState({
    recipientBankName: "", // 은행명
    recipientBankCode: "", // 은행 코드
    recipientAccountNo: "", // 계좌 번호
  });

  // 폼 유효성 검사
  const isFormValid =
    formData.recipientBankName.trim() !== "" &&
    formData.recipientBankCode.trim() !== "" &&
    formData.recipientAccountNo.trim() !== "";

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    if (isFormValid) {
      const submissionData = {
        ...formData,
      };
      console.log("작성된 폼", submissionData);

      // Redux에 저장
      dispatch(setBankData(submissionData));

      // Redux에 저장
      dispatch(setBankData(submissionData));

      setIsModalOpen(!isModalOpen);
    } else {
      console.log("모든 입력 칸이 채워져야 됩니다");
    }
  };

  // formData 상태값 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 은행 선택 시: 은행명 + 은행코드 동시 업데이트
  const handleBankChange = (e) => {
    const { value } = e.target; // value = 은행명
    const bank = banks.find((b) => b.name === value);

    setFormData((prev) => ({
      ...prev,
      recipientBankName: value,
      recipientBankCode: bank?.code || "",
    }));
  };

  const handleConfirm = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      console.log("accessToken: ", accessToken);
      if (!accessToken) {
        console.error("Access Token이 없습니다.");
        return;
      }
      const res = await credittoApi.post(
        "/api/remittance/scheduled/add",
        {
          ...typeData,
          ...clientData,
          ...recipientData,
          ...bankData,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.code === 200) {
        // 신청 결과 페이지로 이동
        router.push("/send/regular/result");
      }
    } catch (error) {
      console.log("정기 해외 송금 신청 실패: ", error.response);
    }
  };

  return (
    <div className="flex min-h-dvh justify-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-dvh mx-auto flex flex-col bg-white">
        {/* 상단 바 + 프로그레스 바 */}
        <header className="pt-[env(safe-area-inset-top)]">
          {/* 상단 바 */}
          <AppHeader
            title={t("common.remittance")}
            show={true}
            showHamburger={false}
            showBack={true}
          />

          {/* 프로그레스 바 */}
        </header>
        <div className="px-5">
          <StepProgressBar current={4} total={4} />
          {/* 메인 컨텐츠 영역 */}

          <main className="flex-1 pt-4 pb-6 overflow-y-auto">
            <section className="flex flex-col gap-[2.188rem]">
              <h1 className="text-left text-[1.563rem] font-bold">
                <span className="text-[#1A3668]">
                  {t("common.remittance")}
                </span>{" "}
                {t("regular.information.title")}
              </h1>

              <hr className="border-t border-[#E5E6EB]" />

              <section className="flex flex-col gap-6">
                <h2 className="text-left text-[1.563rem] text-[#1A3668] font-bold">
                  {t("regular.information.bankInfoTitle")}
                </h2>

                <h3 className="text-left text-[1.125rem] text-black font-semibold">
                  {t("regular.information.bankInfoSubtitle")}
                </h3>

                {/* 입력칸 */}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-[1.875rem]"
                >
                  {/* 수취 은행명 + 은행 코드 */}
                  <div className="flex flex-col items-start">
                    <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                      {t("regular.information.bankName")}
                    </label>

                    <div className="flex w-full gap-2 items-center">
                      {/* 은행명 셀렉트 */}
                      <div className="relative flex-1">
                        <select
                          name="recipientBankName"
                          value={formData.recipientBankName}
                          onChange={handleBankChange}
                          className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none focus:outline-none ${
                            formData.recipientBankName === ""
                              ? "text-[#86909C]"
                              : "text-black"
                          }`}
                        >
                          <option value="">
                            {banks.length > 0
                              ? t("regular.information.bankNamePlaceholder")
                              : t("regular.information.noCurrencyWarning")}
                          </option>

                          {banks.map((bank) => (
                            <option key={bank.code} value={bank.name}>
                              {bank.name}
                            </option>
                          ))}
                        </select>
                        {banks.length > 0 && (
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86909C] pointer-events-none" />
                        )}
                      </div>

                      {/* 은행 코드 표시 */}
                      <div
                        className={`min-w-[120px] px-3 py-3 bg-[#F7F8FA] border border-dashed border-[#E5E6EB] text-[0.875rem] text-center ${
                          formData.recipientBankCode === ""
                            ? "text-[#86909C]"
                            : "text-black"
                        }`}
                      >
                        {formData.recipientBankCode ||
                          t("regular.information.bankCode")}
                      </div>
                    </div>
                  </div>

                  {/* 계좌 번호 (Account Code) */}
                  <div className="flex flex-col items-start">
                    <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                      {t("common.accountNumber")}
                    </label>
                    <input
                      type="text"
                      name="recipientAccountNo"
                      value={formData.recipientAccountNo}
                      onChange={handleChange}
                      placeholder={t(
                        "regular.information.accountNumberPlaceholder"
                      )}
                      className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
                    />
                  </div>
                </form>
              </section>

              {isModalOpen && (
                <Modal
                  title={t("regular.information.modalTitle")}
                  message={t("regular.information.modalMessage")}
                  onClose={() => setIsModalOpen(false)}
                  onConfirm={handleConfirm}
                />
              )}
            </section>
          </main>
        </div>
        <BottomBar
          label={t("common.next")}
          onClick={handleSubmit}
          isActive={isFormValid}
        />
      </div>
    </div>
  );
}
