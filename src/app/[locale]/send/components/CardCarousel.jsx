"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { Globe, Repeat } from "lucide-react";
import { useState, useEffect } from "react"; // ✅ useEffect 추가
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux"; // ✅ 계좌 가져오기
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SendBtn from "../regular/components/SendBtn";
import { useTranslations } from "next-intl";

export default function CardCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const t = useTranslations("send.main");

  // 송금 유형 데이터
  const transferTypes = [
    {
      id: "regular",
      title: t("regularTitle"),
      subtitle: t("regularSubtitle"),
      description: t("regularDescription"),
      icon: Repeat,
      color: "bg-gradient-to-br from-[#002057] to-[#334D79]",
    },
    {
      id: "one-time",
      title: t("oneOffTitle"),
      subtitle: t("oneOffSubtitle"),
      description: t("oneOffDescription"),
      icon: Globe,
      color: "bg-gradient-to-br from-[#4D6389] to-[#99A6BC]",
    },
  ];

  // 연동된 계좌 정보 가져오기
  const accounts = useSelector((state) => state.account.accounts);

  // 페이지 진입 시 연동 계좌 있는지 체크
  useEffect(() => {
    // accounts가 아직 로딩 중이거나 undefined/null이면 일단 패스
    if (!Array.isArray(accounts)) return;

    if (accounts.length === 0) {
      alert(t("noLinkedAccountAlert"));
      router.push("/");
    }
  }, [accounts, router, t]);

  const handleGoToChoose = () => {
    if (!Array.isArray(accounts) || accounts.length === 0) {
      alert(t("noLinkedAccountAlert"));
      router.push("/");
      return;
    }
    router.push("/send/regular/choose");
  };

  return (
    <div className="flex-1 flex justify-center relative">
      <div className="relative w-full h-[420px] flex items-center justify-center mb-10">
        {transferTypes.map((type, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={type.id}
              className={clsx(
                "absolute w-full max-w-[300px] h-[400px] rounded-3xl shadow-2xl cursor-pointer [transform-style:preserve-3d]",
                "absolute w-full max-w-[300px] h-[400px] rounded-3xl shadow-2xl cursor-pointer [transform-style:preserve-3d]",
                isActive ? "shadow-blue-200" : "shadow-none"
              )}
              initial={{ x: 100, opacity: 0 }}
              animate={{
                x: isActive ? 0 : activeIndex === 0 ? 40 : -40,
                scale: isActive ? 1 : 0.85,
                opacity: isActive ? 1 : 0.4,
                zIndex: isActive ? 10 : 0,
                rotateY: isActive
                  ? isFlipped
                    ? 180
                    : 0
                  : activeIndex === 0
                  ? -10
                  : 10,
                rotateY: isActive
                  ? isFlipped
                    ? 180
                    : 0
                  : activeIndex === 0
                  ? -10
                  : 10,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => {
                if (index === activeIndex) {
                  setIsFlipped((prev) => !prev);
                } else {
                  setActiveIndex(index);
                  setIsFlipped(false);
                }
              }}
              drag={isActive && !isFlipped ? "x" : false}
              dragElastic={0}
              dragMomentum={false}
              onDragEnd={(e, info) => {
                if (
                  info.offset.x < -50 &&
                  activeIndex < transferTypes.length - 1
                ) {
                  setActiveIndex((prev) => prev + 1);
                  setIsFlipped(false);
                  setIsFlipped(false);
                } else if (info.offset.x > 50 && activeIndex > 0) {
                  setActiveIndex((prev) => prev - 1);
                  setIsFlipped(false);
                  setIsFlipped(false);
                }
              }}
            >
              {/* 카드 앞면 */}
              <div
                className={clsx(
                  "absolute w-full h-full rounded-3xl p-8 translate-z-0",
                  type.color
                )}
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-12 backdrop-blur-sm">
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium mb-3 backdrop-blur-sm">
                    {type.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {type.title}
                  </h3>
                  <p className="text-white/80 whitespace-pre-line leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>
              {/* 카드 앞면 */}
              <div
                className={clsx(
                  "absolute w-full h-full rounded-3xl p-8 translate-z-0",
                  type.color
                )}
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-12 backdrop-blur-sm">
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium mb-3 backdrop-blur-sm">
                    {type.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {type.title}
                  </h3>
                  <p className="text-white/80 whitespace-pre-line leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>

              {/* 카드 뒷면 */}
              <div
                className={clsx(
                  "absolute w-full h-full rounded-3xl p-8 flex flex-col justify-center text-white [transform:rotateY(180deg)_translateZ(0)] backface-hidden",
                  type.color
                )}
              >
                <div
                  className={clsx(
                    isFlipped ? "opacity-100 visible" : "opacity-0 invisible"
                  )}
                >
                  {/* 정기 송금 */}
                  {type.id === "regular" && (
                    <div className="flex flex-col gap-2 mt-2 w-full">
                      <SendBtn
                        title={t("newTransfer")}
                        subtitle={t("newTransferSubtitle")}
                        icon="plus"
                        onClick={handleGoToChoose}
                      />
                      <SendBtn
                        title={t("historyTitle")}
                        subtitle={t("historySubtitle")}
                        icon="file"
                        onClick={() => router.push("/send/regular/history")}
                      />
                    </div>
                  )}
                  {/* 일회성 송금 */}
                  {type.id === "one-time" && (
                    <div className="flex flex-col gap-2 mt-2 w-full">
                      <SendBtn
                        title={t("sendNow")}
                        subtitle={t("sendNowSubtitle")}
                        icon="plus"
                        onClick={() => {router.push('/send/one-off/choose')}}
                      />
                      <SendBtn
                        title={t("historyOneOffTitle")}
                        subtitle={t("historyOneOffSubtitle")}
                        icon="file"
                        onClick={() => {}}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
