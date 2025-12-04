"use client";

import AppHeader from "@/src/common/AppHeader/AppHeader";
import BottomBar from "../../components/BottomBar";
import Term from "../components/Term";
import Divider from "./components/Divider";
import InfoRow from "./components/InfoRow";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  selectBankData,
  selectClientData,
  selectRecipientData,
  selectTypeData,
} from "@/src/store/features/send/sendSelectors";
import { useTranslations } from "next-intl";

export default function ResultPage() {
  const router = useRouter();
  const t = useTranslations("send");

  // selector로 데이터 가져오기
  const typeData = useSelector(selectTypeData);
  const clientData = useSelector(selectClientData);
  const recipientData = useSelector(selectRecipientData);
  const bankData = useSelector(selectBankData);

  return (
    <main className="min-h-dvh flex flex-col bg-white">
      <header>
        <AppHeader
          title={t("common.remittance")}
          show={true}
          showHamburger={false}
          showBack={true}
        />
      </header>
      <div className="px-5">
        <section className="flex flex-col gap-[2.188rem]">
          <h1 className="text-left mt-[3.438rem] text-[1.563rem] font-bold mb-[2.188rem]">
            <span className="text-[#2E5796]">{t("regular.result.title")}</span>{" "}
            <br />
            {t("regular.result.subtitle")}
          </h1>
        </section>
        {/* 신청 내역 */}
        <section className="border border-[#86909C] rounded-xl px-[1.563rem] py-5 mb-[2.188rem]">
          {/* 송금 유형 정보 */}
          <div className="space-y-3.75">
            <InfoRow
              label={t("regular.result.account")}
              value={typeData.accountNo}
            />
            <InfoRow
              label={t("regular.result.receiveCurrency")}
              value={typeData.receiveCurrency}
            />
            <InfoRow
              label={t("regular.result.sendCurrency")}
              value={typeData.sendCurrency}
            />
            <InfoRow
              label={t("regular.result.amount")}
              value={typeData.sendAmount}
            />
            {typeData.regRemType === "MONTHLY" ? (
              <InfoRow
                label={t("regular.result.cycle")}
                value={`${t("regular.result.monthly")} ${
                  typeData.scheduledDate
                }${t("common.day")}`}
              />
            ) : (
              <InfoRow
                label={t("regular.result.cycle")}
                value={`${t("regular.result.weekly")} ${
                  t("common.dayOfWeek")[typeData.scheduledDay]
                }`}
              />
            )}

            <InfoRow
              label={t("regular.result.startDate")}
              value={typeData.startedDate}
            />
          </div>

          <Divider />

          {/* 송금인 정보 */}
          <div>
            <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
              {t("regular.result.senderInfo")}
            </h3>
            <div className="space-y-3.75">
              <InfoRow label={t("common.name")} value={clientData.clientName} />
              <InfoRow
                label={t("common.country")}
                value={clientData.clientCountry}
              />
              <InfoRow
                label={t("common.address")}
                value={clientData.clientAddress}
              />
            </div>
          </div>

          <Divider />

          {/* 수신인 정보 */}
          <div>
            <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
              {t("regular.result.recipientInfo")}
            </h3>
            <div className="space-y-3.75">
              <InfoRow
                label={t("common.country")}
                value={recipientData.recipientCountry}
              />
              <InfoRow
                label={t("common.name")}
                value={recipientData.recipientName}
              />
              <InfoRow
                label={t("common.phoneNumber")}
                value={`${recipientData.recipientPhoneCc} ${recipientData.recipientPhoneNo}`}
              />
              <InfoRow
                label={t("regular.result.receiveCurrency")}
                value={typeData.receiveCurrency}
              />
              <InfoRow
                label={t("regular.result.bankName")}
                value={bankData.recipientBankName}
              />
              <InfoRow
                label={t("regular.result.bankCode")}
                value={bankData.recipientBankCode}
              />
              <InfoRow
                label={t("common.accountNumber")}
                value={bankData.recipientAccountNo}
              />
            </div>
          </div>
        </section>
        <Term />
      </div>
      {/* 약관 동의 */}

      {/* 하단 버튼 */}
      <footer>
        <BottomBar
          label={t("common.next")}
          onClick={() => router.push("/send/regular/loading")}
          isActive={true}
        />
      </footer>
    </main>
  );
}
