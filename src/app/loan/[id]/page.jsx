import AppHeader from "@/src/common/AppHeader/AppHeader";
import React from "react";

export default function LoanDetailPage() {
  return (
    <>
      <div className="h-dvh flex flex-col">
        <AppHeader title="" show={true} showBack={true} showHamburger={false} />

        <div className="w-full  px-5 mt-10 ">
          <div className="text-2xl text-left font-semibold">신용대출</div>
          <div className="text-xl text-left font-medium text-[#7B7B7B]">
            신용점수에 따라 평균 금리가 바뀌어요
          </div>
        </div>

        {/* 대출 상품 */}
        <div className=" w-full flex justify-center items-center px-5 mt-5">
          <div className="w-full p-4">
            <div className="flex flex-row">
              <img src="/icon/woori.png" className="w-12 h-12 mr-5" />
              <div className="flex-1 text-left min-w-0">
                <div className="text-xl font-semibold text-gray-900">
                  우리은행
                </div>
                <div className="text-lg text-gray-500 line-clamp-2">
                  우리 WON 갈아타기 직장인 대출
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 신용점수  */}
        <div className="w-full h-12 flex flex-row items-center gap-2 px-5 mb-5">
          <div className="w-fit h-fit bg-[#EAEAEA] rounded-xl p-1 font-bold text-xs text-[#878787]">
            나의 신용점수
          </div>
          <span className="font-semibold">982 점</span>
        </div>

        {/* 예상금리 & 평균 금리 */}
        <div className="w-full h-fit text-left px-5 ">
          <div class="flex gap-16 text-gray-900  pb-5 border-b border-gray-300">
            <div class="flex flex-col gap-4">
              <div>
                <p class="text-sm text-gray-500">예상 금리</p>
                <p class="text-2xl font-semibold">5.01 %</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">평균 금리</p>
                <p class="text-2xl font-semibold">4.42 %</p>
              </div>
            </div>

            <div class="flex flex-col gap-4">
              <div>
                <p class="text-sm text-gray-500">예상 최대 한도</p>
                <p class="text-2xl font-semibold">2억원</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">최대 한도</p>
                <p class="text-2xl font-semibold">3억원</p>
              </div>
            </div>
          </div>
        </div>
        {/* 상품정보 */}
        <sapn>상품정보</sapn>
      </div>
    </>
  );
}
