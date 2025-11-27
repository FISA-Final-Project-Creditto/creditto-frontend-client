"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Globe,
  Plus,
  Repeat,
  Settings,
} from "lucide-react";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SendBtn from "./SendBtn";

// 송금 유형 데이터
const transferTypes = [
  {
    id: "regular",
    title: "정기 해외 송금",
    subtitle: "매달 보내야 할 때",
    description: "한 번 등록으로\n알아서 척척 송금",
    icon: Repeat,
    color: "bg-gradient-to-br from-[#002057] to-[#334D79]",
  },
  {
    id: "one-time",
    title: "일회성 해외 송금",
    subtitle: "급하게 보내야 할 때",
    description: "지금 바로 송금 가능",
    icon: Globe,
    color: "bg-gradient-to-br from-[#4D6389] to-[#99A6BC]",
  },
];

// 버튼 그룹 컨테이너 애니메이션 설정
const actionsContainerVariants = {
  hidden: { opacity: 0, y: 24 }, // 아래쪽 + 투명
  visible: {
    opacity: 1,
    y: 0, // 제자리로
    transition: {
      duration: 0.25,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.06, // 자식들 순서대로 탁탁 나옴
    },
  },
  exit: {
    opacity: 0,
    y: 24, // 다시 아래로 빠지면서 사라짐
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// onSelectType: 카드의 id를 상위로 올려주는 콜백
export default function CardCarousel({ onSelectType }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [regClick, setRegClick] = useState(false);

  return (
    <div className="flex-1 flex justify-center relative">
      <div className="relative w-full h-[420px] flex items-center justify-center mb-10">
        {transferTypes.map((type, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={type.id}
              className={clsx(
                "absolute w-full max-w-[300px] h-[400px] rounded-3xl p-8 flex flex-col justify-between shadow-2xl cursor-pointer",
                type.color,
                isActive ? "shadow-blue-200" : "shadow-none"
              )}
              initial={{ x: 100, opacity: 0 }}
              animate={{
                x: isActive ? 0 : activeIndex === 0 ? 40 : -40,
                scale: isActive ? 1 : 0.85,
                opacity: isActive ? 1 : 0.4,
                zIndex: isActive ? 10 : 0,
                rotateY: isActive ? 0 : activeIndex === 0 ? -10 : 10,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              // 카드 탭하면 활성 카드 변경
              onClick={() => setActiveIndex(index)}
              // 활성 카드만 좌우 제스처 허용
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0}
              dragMomentum={false}
              onDragEnd={(e, info) => {
                if (
                  info.offset.x < -50 &&
                  activeIndex < transferTypes.length - 1
                ) {
                  setActiveIndex((prev) => prev + 1);
                } else if (info.offset.x > 50 && activeIndex > 0) {
                  setActiveIndex((prev) => prev - 1);
                }
              }}
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm">
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

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/20">
                <span className="text-white font-semibold">선택하기</span>
                <div
                  className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation(); // 카드 클릭 이벤트 막기

                    // 상위 컴포넌트에 선택 이벤트 전달
                    // onSelectType?.(type.id);

                    onSelectType(type.id);
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
