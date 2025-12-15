"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CircleProgress } from "./ProgressAnimation";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

function CarouselDemo() {
  const router = useRouter();
  const t = useTranslations("main.mainCarousel");
  return (
    <Carousel className="w-full h-[190px]">
      <CarouselContent>
        {/* ✅ 첫 번째 슬라이드 */}

        <CarouselItem
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/credit/first");
          }}
        >
          <div className="w-full cursor-pointer flex justify-center items-center text-gray-300  text-lg font-medium">
            {t("creditScoreLink")} &gt;
          </div>
          <div>
            <Card>
              <CardContent className="flex flex-col items-center justify-center ">
                <p className="text-sm font-medium">{t("credittoScore")}</p>
                <CircleProgress
                  value={50}
                  maxValue={100}
                  size={120}
                  strokeWidth={6}
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem
          onClick={(e) => {
            e.stopPropagation();
            router.push("/account/connection");
          }}
        >
          <div className="w-full cursor-pointer flex justify-center items-center text-gray-300  text-lg font-medium">
            {t("accountConnectionLink")} &gt;
          </div>
          <div className="">
            <Card>
              <CardContent className="flex flex-col w-full max-h-[203px]  items-center justify-center">
                <img
                  src="/icon/card.png"
                  alt={t("complete_alt")}
                  className="w-[220px] h-full  mt-4"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>

      {/* 캐러셀 버튼 */}
    </Carousel>
  );
}

export { CarouselDemo };
