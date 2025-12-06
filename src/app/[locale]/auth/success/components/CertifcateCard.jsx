import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";

export default function CertificateCard({ name, expiryDate }) {
  return (
    <div className="relative w-full max-w-sm mx-auto perspective-1000 animate-fade-in-up">
      <div className="relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl p-6 shadow-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
        {/* 백그라운드 패턴 */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,rgba(255,255,255,0.1)_35px,rgba(255,255,255,0.1)_70px)]">
          <div className="absolute inset-0" />
        </div>

        {/* 카드 투명 컨테이너 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl translate-y-24 -translate-x-24" />

        {/* 내용 */}
        <div className="flex items-start justify-between">
          {/* 이름, 만료일 */}
          <div>
            {/* 송금인 이름 */}
            <h3 className="text-2xl font-bold text-white text-left tracking-wide">
              {name}
            </h3>
            {/* 만료일(현재 생성일로부터 1년 후) */}
            <p className="text-sm text-[#C9CDD4] mt-1">{expiryDate} 만료</p>
          </div>
          {/* 로고 */}

          <Image
            src="/logo/whiteLogo.png"
            alt="whiteLogo"
            width={62}
            height={35}
            className="object-contain"
            loading="eager"
          />
        </div>

        <div className="flex items-center gap-2 mt-10">
          <CheckCircleIcon className="text-[#C9CDD4]" />
          <p className="text-xs text-[#C9CDD4] text-left">
            전자서명에 따른 <br />
            안전한 인증서
          </p>
        </div>

        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
