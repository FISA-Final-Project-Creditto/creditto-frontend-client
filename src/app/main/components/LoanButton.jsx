export default function LoanCard() {
  return (
    <div className="cursor-pointer relative w-[170px] h-[75px] bg-[#E8ECFF] rounded-xl overflow-hidden">
      {/* 텍스트 영역 */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <h2 className="text-[16px] font-bold text-black leading-tight">대출 상품 추천</h2>
        <p className="font-medium text-[12px] text-gray-500 mt-1">나에게 딱 맞는 대출</p>
      </div>

      {/* 오른쪽 이미지 (일부 잘리도록 배치) */}
      <img
        src="/icon/money.png"
        alt="money"
        className="absolute -bottom-5 -right-12 w-[120px] h-[90px] object-cover"
      />
    </div>
  );
}
