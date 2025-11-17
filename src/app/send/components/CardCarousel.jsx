"use client";

import { useState, useRef, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CardCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [centerPos, setCenterPos] = useState(1); // 스크롤 기준의 실시간 중심 위치
  const carouselRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const cards = [
    { id: 1, content: "" },
    { id: 2, content: "" },
    { id: 3, content: "" },
  ];

  // 중심 인덱스 추정 업데이트
  const updateCenterPos = () => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.6;
    const gap = 16;
    const centerOffset = (el.offsetWidth - cardWidth) / 2;
    const pos = (el.scrollLeft + centerOffset) / (cardWidth + gap);
    setCenterPos(pos);
  };

  // activeIndex 변경 시 해당 카드로 스크롤 + centerPos 동기화
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.6;
    const gap = 16;
    const centerOffset = (el.offsetWidth - cardWidth) / 2;
    const scrollPosition = (cardWidth + gap) * activeIndex - centerOffset;
    el.scrollTo({ left: scrollPosition, behavior: "smooth" });
    const t = setTimeout(updateCenterPos, 180);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchStart = (e) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
    updateCenterPos();
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
    updateCenterPos();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.6;
    const gap = 16;
    const centerOffset = (el.offsetWidth - cardWidth) / 2;
    const scrollPosition = el.scrollLeft + centerOffset;
    const newIndex = Math.round(scrollPosition / (cardWidth + gap));
    setActiveIndex(Math.max(0, Math.min(cards.length - 1, newIndex)));
    updateCenterPos();
  };

  return (
    <div className="relative pb-5">
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-hidden h-[340px] cursor-grab active:cursor-grabbing"
        style={{ perspective: "1000px" }} // 원근감
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        onScroll={updateCenterPos}
      >
        {cards.map((card, index) => {
          // 중심(스크롤 기준)으로부터의 오프셋
          const offset = index - centerPos;

          // 곡선 파라미터 (원하는 느낌으로 조절 가능)
          const ROT_Y = -12; // 좌/우로 말리는 각도
          const DEPTH = 90; // 뒤로 들어가는 깊이
          const LIFT = 14; // 아치 곡률 (옆으로 갈수록 살짝 내려감)
          const SCALE_DROP = 0.08; // 축소 비율

          const rotateY = `${offset * ROT_Y}deg`;
          const translateZ = `${-Math.abs(offset) * DEPTH}px`;
          const translateY = `${Math.pow(offset, 2) * LIFT}px`;
          const scale = 1 - Math.min(Math.abs(offset) * SCALE_DROP, 0.3);
          const opacity = 1 - Math.min(Math.abs(offset) * 0.4, 0.5);

          return (
            <div
              key={card.id}
              className="min-w-[60%] rounded-3xl select-none transition-[transform,opacity] duration-200 will-change-transform"
              style={{
                background: "#A8C7FA",
                transform: `translateY(${translateY}) translateZ(${translateZ}) rotateY(${rotateY}) scale(${scale})`,
                transformStyle: "preserve-3d",
                opacity,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
