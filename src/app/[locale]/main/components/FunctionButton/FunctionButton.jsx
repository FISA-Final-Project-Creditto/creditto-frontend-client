"use client";
import { FileChartColumnIcon, Send, TrendingUp, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/field";
import {
  Select,
  SelectItem,
  SelectListBox,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FunctionButton() {
  const router = useRouter();
  const t = useTranslations("main.functionButton");
  return (
    <div className=" w-full flex flex-row mb-4 ">
      <button
        className="w-full flex justify-center flex-row bg-card border border-border rounded-bl-2xl p-2 flex flex-col items-center gap-2 hover:bg-muted transition mb-4 "
        onClick={() => {
          router.push("/loan");
        }}
      >
        <Wallet className="w-6 h-6 text-primary " />
        <span className="text-xs font-medium">{t("loan")}</span>
      </button>
      <Select
        className="w-full flex justify-center flex-row  border border-border rounded-br-2xl p-2 flex flex-col items-start gap-2 hover:bg-muted transition mb-4"
        aria-label="신용분석 리포트 언어 선택"
      >
        <SelectTrigger>
          <div className="flex items-center gap-2">
            <FileChartColumnIcon className="w-6 h-6 text-primary " />
            <SelectValue placeholder="신용분석" />
          </div>
        </SelectTrigger>
        <SelectPopover>
          <SelectListBox>
            <SelectItem>
              <span className="text-xs font-medium">한국어</span>
            </SelectItem>
            <SelectItem>
              <span className="text-xs font-medium">영어</span>
            </SelectItem>
          </SelectListBox>
        </SelectPopover>
      </Select>

      {/* <button className="w-full flex justify-center flex-row bg-card border border-border rounded-br-2xl p-2 flex flex-col items-center gap-2 hover:bg-muted transition mb-4"
          onClick={()=>{router.push('/credit/analysis')}}>
            <TrendingUp className="w-6 h-6 text-primary" />
          
          </button> */}
    </div>
  );
}
