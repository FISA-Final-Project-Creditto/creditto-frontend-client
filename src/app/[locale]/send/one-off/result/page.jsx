"use client";

import AppHeader from "@/src/common/AppHeader/AppHeader";
import BottomBar from "../../components/BottomBar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import Divider from "../../regular/result/components/Divider";
import Term from "../../regular/components/Term";
import InfoRow from "../../regular/result/components/InfoRow";
import {
  selectReceiveCurrency,
  selectRecipientInfo,
  selectSendInfo,
} from "@/src/store/features/send/sendSelectors";

export default function ResultPage() {
  const router = useRouter();
  const t = useTranslations("send.oneOff.result");

  // selector로 데이터 가져오기
  const sendInfo = useSelector(selectSendInfo);
  const recipientInfo = useSelector(selectRecipientInfo);
  const receiveCurrency = useSelector(selectReceiveCurrency);

  return (
    <main className="min-h-dvh flex flex-col bg-white">
      <header>
        <AppHeader
          title={t("title")}
          show={true}
          showHamburger={false}
          showBack={true}
        />
      </header>
      <div className="px-5">
        <section className="flex flex-col gap-[2.188rem]">
          <h1 className="text-left mt-[3.438rem] text-[1.563rem] font-bold mb-[2.188rem]">
            <span className="text-[#2E5796]">{t("page_title_pt1")}</span>
            <br />
            {t("page_title_pt2")}
          </h1>
        </section>
        {/* 신청 내역 */}
        <section className="border border-[#86909C] rounded-xl px-[1.563rem] py-5 mb-[2.188rem]">
          {/* 송금인 정보 */}
          <div>
            <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
              {t("sender_info")}
            </h3>
            <div className="space-y-3.75">
              <InfoRow label={t("sender_account_no")} value={sendInfo.accountNo} />
              <InfoRow
                label={t("foreign_currency_amount")}
                value={`${sendInfo.targetAmount} ${sendInfo.sendCurrency}`}
              />
              <InfoRow label={t("remittance_start_date")} value={sendInfo.startDate} />
            </div>
          </div>

          <Divider />

          {/* 수신인 정보 */}
          <div>
            <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
              {t("recipient_info")}
            </h3>
            <div className="space-y-3.75">
              <InfoRow label={t("name")} value={recipientInfo.name} />
              <InfoRow label={t("nationality")} value={recipientInfo.country} />
              <InfoRow label={t("account_no")} value={recipientInfo.accountNo} />
              <InfoRow
                label={t("phone_no")}
                value={`${recipientInfo.phoneCc} ${recipientInfo.phoneNo}`}
              />
              <InfoRow
                label={t("bank")}
                value={`${recipientInfo.bankName}(${recipientInfo.bankCode})`}
              />
            </div>
          </div>
        </section>
        {/* 약관 동의 */}
        <Term />
      </div>
      {/* 하단 버튼 */}
      <footer>
        <BottomBar
          label={t("next_button")}
          onClick={() => router.replace("/send")}
          isActive={true}
        />
      </footer>
    </main>
  );
}
