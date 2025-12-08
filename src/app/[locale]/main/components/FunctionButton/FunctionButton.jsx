"use client";
import { Earth, FileChartColumnIcon, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectItem,
  SelectListBox,
  SelectPopover,
  SelectTrigger,
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
        console.log(t("pdf_download_error"), err);
      }
    };

    fetchPDF();
  }, [lang, userId, t]);

  return (
    <div className="w-full flex flex-row mb-4">
      {/* Loan Button */}
      <button
        className="w-full flex justify-center flex-row bg-card border border-border rounded-bl-2xl p-2 flex flex-col items-center gap-2 hover:bg-muted transition mb-4"
        onClick={() => router.push("/credit/first")}
      >
        <Earth className="w-6 h-6 text-primary" />
        <span className="text-xs font-medium">{t("foreign_credit_info")}</span>
      </button>

      {/* Language Select */}
      <Select
        className="w-full flex justify-center flex-row border border-border rounded-br-2xl p-2 flex flex-col items-start gap-2 hover:bg-muted transition mb-4"
        aria-label={t("report_language_select_aria_label")}
        onSelectionChange={(key) => setLang(String(key))}
      >
        <SelectTrigger>
          <div className="flex items-center gap-2">
            <FileChartColumnIcon className="w-6 h-6 text-primary" />

            <span className="text-xs font-medium">{t("pdf_download")}</span>
          </div>
        </SelectTrigger>

        <SelectPopover>
          <SelectListBox>
            <SelectItem id="ko" value="ko">
              <span className="text-xs font-medium">{t("korean")}</span>
            </SelectItem>
            <SelectItem id="en" value="en">
              <span className="text-xs font-medium">{t("english")}</span>
            </SelectItem>
          </SelectListBox>
        </SelectPopover>
      </Select>
    </div>
  );
}
