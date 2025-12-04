import React, { useState } from "react";
import Hambuger from "../Hambuger";
import { Bell, Check, CreditCard, Globe, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import SettingsSidebar from "./SettingsSidebar";

// 선택 언어 리스트
const languages = [
  { code: "ko", flag: "🇰🇷", label: "한국어" },
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "jp", flag: "🇯🇵", label: "日本語" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLanguageChange = (newLocale) => {
    // 언어(locale) 부분만 교체
    const pathParts = pathname.split("/");
    if (pathParts.length > 1) {
      pathParts[1] = newLocale;
      const newPath = pathParts.join("/");
      router.push(newPath);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="bg-white px-5 py-3 flex items-center justify-between max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 rounded-3xl rounded-lg flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold text-foreground">Creditto</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* 언어 설정 메뉴 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="group relative p-2 rounded-xl transition-all duration-200">
                  <Globe className="w-5 h-5 text-[#4E5969] transition-colors" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[180px] bg-white border border-[#F2F3F5] shadow-lg rounded-md p-1 mt-2"
              >
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 focus:outline-none group"
                    onSelect={() => handleLanguageChange(language.code)}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg leading-none">
                        {language.flag}
                      </span>
                      <span className="text-sm font-medium transition-colors text-[#1A3668]">
                        {language.label}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button className="p-2 hover:bg-muted rounded-lg transition">
              <Settings className="w-5 h-5 text-[#4E5969]" />
            </button>
          </div>
        </div>
      </header>

      <SettingsSidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}
