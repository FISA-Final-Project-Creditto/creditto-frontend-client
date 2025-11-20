"use client";

import Image from "next/image";

/**
 * props
 * - src: 미리보기 URL
 * - state: { isPending, isFileRejected, error, data }
 */
export default function ScanPreview({ src, state }) {
  const { isPending, isFileRejected, error, data } = state || {};

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-xs sm:max-w-sm aspect-[1.586/1] rounded-2xl overflow-hidden border-2 border-[#C9CDD4] shadow-lg">
        {/* 이미지 미리보기 */}
        {src && (
          <Image
            src={src}
            alt="preview"
            fill
            className="object-cover"
            unoptimized // blob: URL은 최적화 불가 → 경고 방지
          />
        )}

        {/* 로딩 중: Lottie */}
        {/* {isPending && (
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center">
              <div className="w-50">  
                <DotLottieReact
                  src="https://lottie.host/5e3d00b3-79ca-4abd-9808-99013190e330/8EXayNOkme.lottie"
                  loop
                  autoplay
                  className="w-fit"
                />
              </div>
              <p className="text-white text-lg">분석 중입니다…</p>
            </div>
          )} */}

        {/* 로딩 중 오버레이 */}
        {isPending && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-scan pointer-events-none" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <p className="text-sm font-medium text-[#4485EE]">분석 중...</p>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
