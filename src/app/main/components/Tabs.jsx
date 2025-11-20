'use client'
import React, { useState } from "react";
import { CreditCard as CreditCardIcon, Home, MapPin } from "lucide-react";
import Credit from "../../maine/components/Credit/Credit";
import { CreditCard } from "@/components/ui/credit-card"
import CreditChart from "../../maine/components/Chart/CreditChart";

const tabs = [
  { id: "home", label: "홈", icon: Home },
  { id: "QR", label: "간편 결제", icon: CreditCardIcon },
  { id: "location", label: "위치", icon: MapPin },
];

export default function RoundedIconTabs() {
  const [activeTab, setActiveTab] = useState("home");

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
            <Credit />
            <CreditChart/>
          </div>
        )}
        {activeTab === "QR" && (
          <div className="flex justify-center items-center flex-col px-5">
            <div className="w-40 h-40 bg-gray-200 rounded-lg"></div>
            <div className="w-full h-full mt-6 ">
                <CreditCard
        variant="dark"
        cardNumber="1234 5678 4298 5403"
        cardHolder="Jane Smith"
        expiryDate="06/25"
      />
            </div>
          </div>
        )}
        {activeTab === "location" && (
          <div className="w-[368px] h-[373px]">네이버 지도 연동 예정</div>
        )}
      </div>
    </div>
  );
}

