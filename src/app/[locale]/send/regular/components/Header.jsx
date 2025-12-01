import { ChevronLeft, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("send.common");
  return (
    <header className="flex items-center justify-between gap-2 py-4">
      <section className="flex items-center gap-2">
        <button>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[1.125rem] font-medium">{t("remittance")}</h1>
      </section>
      <button>
        <X className="w-6 h-6" />
      </button>
    </header>
  );
}
