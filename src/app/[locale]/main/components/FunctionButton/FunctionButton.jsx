"use client";
import { FileChartColumnIcon, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectItem,
  SelectListBox,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { credittoApi } from "@/src/app/api/axios";

export default function FunctionButton() {
  const router = useRouter();
  const t = useTranslations("main.functionButton");

  const [userId, setUserId] = useState(null);
  const [lang, setLang] = useState("");

  // ⭐ sessionStorage는 클라이언트에서만 가능 → useEffect 안에서 읽기
  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    setUserId(id);
  }, []);

  // 언어 변경 시 PDF 요청
  useEffect(() => {
    const fetchPDF = async () => {
      if (!lang || !userId) return;

      try {
        const accessToken = sessionStorage.getItem("accessToken");

        const res = await credittoApi.get(
          `/api/credit-score/report/${lang}/pdf/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/pdf",
            },
            responseType: "blob",
          }
        );

        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `credit-report-${userId}-${lang}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.log("PDF 다운로드 오류:", err);
      }
    };

    fetchPDF();
  }, [lang, userId]);

  return (
    <div className="w-full flex flex-row mb-4">
      {/* Loan Button */}
      <button
        className="w-full flex justify-center flex-row bg-card border border-border rounded-bl-2xl p-2 flex flex-col items-center gap-2 hover:bg-muted transition mb-4"
        onClick={() => router.push("/loan")}
      >
        <Wallet className="w-6 h-6 text-primary" />
        <span className="text-xs font-medium">{t("loan")}</span>
      </button>

      <button
        className="w-full flex justify-center flex-row bg-card border border-border rounded-br-2xl p-2 flex flex-col items-center gap-2 hover:bg-muted transition mb-4"
        onClick={() => router.push("/credit/analysis")}
      >
        <FileChartColumnIcon className="w-6 h-6 text-primary" />
        <span className="text-xs font-medium">신용도 분석</span>
      </button>

    </div>
  );
}
