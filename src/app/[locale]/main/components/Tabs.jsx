"use client";
import React, { useEffect, useState } from "react";
import { CreditCard as CreditCardIcon, Home, MapPin } from "lucide-react";
import Credit from "../../maine/components/Credit/Credit";
import { CreditCard } from "@/components/ui/credit-card";
import CreditChart from "../../maine/components/Chart/CreditChart";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import NaverMap from "./FunctionButton/NaverMap/Navermap";
import { credittoApi } from "@/src/app/api/axios";

export default function RoundedIconTabs({ accountState }) {
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();
  const t = useTranslations("main.tabs");

  const [historyScore, setHistoryScore] = useState();
  useEffect(() => {
    const fetchCreditScore = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const userId = sessionStorage.getItem("userId");

        if (!accessToken) return;

        const res = await credittoApi.get(
          `/api/credit-score/history/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setHistoryScore(res.data.history);
        console.log(t("account_history_log"), res.data.history);
        sessionStorage.setItem("historyScore", res.data.history);
        // setHistoryScore(r);
      } catch (error) {
        console.error(t("credit_score_inquiry_failed"), error);
      }
    };
    fetchCreditScore();
  }, []);
  const tabs = [
    { id: "home", label: t("home"), icon: Home },
    { id: "QR", label: t("simplePayment"), icon: CreditCardIcon },
    { id: "location", label: t("location"), icon: MapPin },
  ];

  return (
    <div className="bg-gradient-to-b from-[#F4F8FF] via-[#E9F2FF] to-[#F4F8FF] p-3 shadow-b h-[480px] ">
      <div className="flex justify-center space-x-4 ">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full
                transition
                ${
                  isActive
                    ? " bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted/10"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 탭 내용 */}
      <div className="flex items-center justify-center mt-4">
        {activeTab === "home" && (
          <div className=" px-4 w-full flex justify-center flex-col items-center ">
            <Credit accountState={accountState} historyScore={historyScore} />
            <CreditChart historyScore={historyScore} />
          </div>
        )}
        {activeTab === "QR" && (
          <div
            className="flex justify-center items-center flex-col px-5"
            onClick={() => {
              router.push("/account/connection");
            }}
          >
            <div className="w-40 h-40 bg-gray-200 rounded-lg"></div>
            <div className="w-full h-full mt-6 ">
              <CreditCard
                accountState={accountState}
                variant="dark"
                cardNumber=""
                cardHolder={t("name")}
                expiryDate="06/25"
              />
            </div>
          </div>
        )}
        {activeTab === "location" && (
          <div className="w-[368px] h-[373px]">
            <NaverMap />
          </div>
        )}
      </div>
    </div>
  );
}
