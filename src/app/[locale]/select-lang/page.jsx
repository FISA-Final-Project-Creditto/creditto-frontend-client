"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";

export default function LanguageSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const languages = [
    { code: "ko", name: "한국어", flag: "🇰🇷", englishName: "Korean" },
    { code: "en", name: "English", flag: "🇺🇸", englishName: "English" },
    { code: "ja", name: "日本語", flag: "🇯🇵", englishName: "Japanese" },
  ];

  // 언어 선택 함수
  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
  };

  // 계속하기 버튼 클릭 실행 함수
  const handleContinue = () => {
    if (!selectedLanguage) return;

    // URL 쿼리에서 'next' 파라미터 값을 가져옵니다. 없으면 '/main'을 기본값으로 사용합니다.
    const nextPath = searchParams.get("next") || "/main";

    // 선택된 언어와 다음 경로를 조합하여 최종 URL로 이동합니다.
    router.push(`/${selectedLanguage}${nextPath}`);
  };

  return (
    <div className="flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* 제목 */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#E5E6EB] flex items-center justify-center">
              <Globe className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-[1.625rem] font-bold">언어 선택</h1>
          <p className="text-sm text-[#4E5969]">
            계속하려면 사용하실 언어를 선택해주세요
          </p>
        </div>

        {/* 언어 선택 옵션 */}
        <div className="grid gap-3">
          {languages.map((language) => (
            <Card
              key={language.code}
              className={`cursor-pointer transition-all ${
                selectedLanguage === language.code
                  ? "ring-2 ring-[#1A3668] bg-[#C9CDD40D]"
                  : "hover:bg-accent"
              }`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              <div className="p-4 flex items-center gap-4">
                <span className="text-4xl">{language.flag}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{language.name}</h3>
                  <p className="text-sm text-[#4E5969]">
                    {language.englishName}
                  </p>
                </div>
                {selectedLanguage === language.code && (
                  <div className="w-6 h-6 rounded-full bg-[#1A3668] flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* 계속 버튼 */}
        <Button
          className="w-full h-12 text-lg font-semibold bg-[#1A3668]"
          disabled={!selectedLanguage}
          onClick={handleContinue}
        >
          계속하기
        </Button>
      </div>
    </div>
  );
}
