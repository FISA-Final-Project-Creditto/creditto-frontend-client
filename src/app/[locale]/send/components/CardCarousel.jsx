"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { Globe, Repeat } from "lucide-react";
import { useState, useEffect } from "react"; // ✅ useEffect 추가
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux"; // ✅ 계좌 가져오기
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SendBtn from "../regular/components/SendBtn";
import { credittoApi } from "@/src/app/api/axios";

// 송금 유형 데이터
const transferTypes = [
  {
    id: "regular",
    title: "정기 해외 송금",
    subtitle: "매주 · 매달 정기적으로",
    description: "한 번만 등록하면\n약속한 날짜에 자동 송금",
    icon: Repeat,
    color: "bg-gradient-to-br from-[#002057] to-[#334D79]",
  },
  {
    id: "one-off",
    title: "일회성 해외 송금",
    subtitle: "원할 때 자유롭게",
    description: "기다릴 필요 없이\n즉시 송금",
    icon: Globe,
    color: "bg-gradient-to-br from-[#4D6389] to-[#99A6BC]",
  },
];

export default function CardCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // 다른 팀원의 작업으로 주석 처리!!
  // useEffect(() => {
  //   // 계좌 잔액 합산 조회 by UserId
  //   const fetchAccountBalance = async () => {
  //     try {
  //       const accessToken = sessionStorage.getItem("accessToken");

  //       const res = await credittoApi.get("/api/accounts/me/balance", {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       const { code, data } = res.data;
  //       if (code === 200) {
  //         // 송금 화면 이용 가능
  //         console.log("연동된 계좌 있음");
  //       } else {
  //         // 메인페이지로 이동
  //         alert("연동된 계좌가 없습니다");
  //         router.replace("/");
  //       }
  //     } catch (error) {
  //       console.error("계좌 잔액 합산 조회 by UserId 오류 발생: ", error);
  //     }
  //   };

  //   fetchAccountBalance();
  // }, []);

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
                        title="새로운 송금 등록"
                        subtitle={"원하는 날짜와\n금액을 설정해요"}
                        icon="plus"
                        onClick={() =>
                          router.push("/send/consent?type=regular")
                        } // 약관 동의 페이지로 이동
                      />
                      <SendBtn
                        title="송금 조회 · 관리"
                        subtitle={"송금 내역과\n신청 정보를 한눈에"}
                        icon="file"
                        onClick={() => router.push("/send/regular/history")}
                      />
                    </div>
                  )}
                  {/* 일회성 송금 */}
                  {type.id === "one-off" && (
                    <div className="flex flex-col gap-2 mt-2 w-full">
                      <SendBtn
                        title="바로 송금하기"
                        subtitle={"기다리지 않고\n지금 즉시 보내요"}
                        icon="plus"
                        onClick={() =>
                          router.push("/send/consent?type=one-off")
                        }
                      />
                      <SendBtn
                        title="송금 내역 조회"
                        subtitle={"지금까지 보낸\n기록을 모아봐요"}
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
