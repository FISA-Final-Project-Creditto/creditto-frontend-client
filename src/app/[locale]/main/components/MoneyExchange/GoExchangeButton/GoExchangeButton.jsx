import React from "react";

export default function GoExchangeButton() {
  return (
    <div className="w-full h-[122px]  flex justify-end items-center flex-col">
      <div className="w-[90%] h-[100px] bg-white rounded-xl flex justify-around items-center flex-row">
        <div>
          <h2 className="text-[18px] font-bold text-black leading-tight text-left">
            환율 그래프
          </h2>
          <p className="font-medium text-[14px] text-gray-500 mt-1">
            미국, 중국, 일본 다양한 환율을 한번에 !
          </p>
        </div>
         <div>
            <img src='/icon/exchange.png' className="w-[82px] h-full"/>
        </div>
      </div>
    </div>
  );
}
