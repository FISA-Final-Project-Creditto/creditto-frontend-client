import React from 'react'

export default function form() {
  return (
       <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[1.875rem]"
            >
              {/* 송금 계좌 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  송금 계좌
                </label>
                <div className="relative w-full">
                  <select
                    name="accountNO"
                    value={formData.accountNO}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] focus:outline-none ${
                      formData.accountNO === ""
                        ? "text-[#86909C]"
                        : "text-black"
                    }`}
                  >
                    <option value="">계좌를 선택하세요</option>
                    {connectedAccounts.map((account, index) => (
                      <option key={index} value={account}>
                        {account}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86909C] pointer-events-none" />
                </div>
              </div>

              {/* 수취 통화 코드 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  수취 통화 코드
                </label>
                <div className="relative w-full">
                  <input
                    name="receiveCurrency"
                    disabled={true}
                    value={formData.receiveCurrency}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none focus:outline-none ${
                      formData.receiveCurrency === ""
                        ? "text-[#86909C]"
                        : "text-black"
                    }`}
                  ></input>
                </div>
              </div>

              {/* 외화 거래 금액 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  외화 거래 금액
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.targetAmount}
                  onChange={handleAmountChange}
                  placeholder="송금할 금액을 입력하세요"
                  className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
                />
              </div>

              {/* 송금 시작일 */}
              <div className="flex flex-col items-start">
                <label className="block text-sm font-semibold text-[#4E5969] mb-[6px]">
                  송금 시작일
                </label>
                <DatePicker
                  value={formData.startDate}
                  onChange={handleDateChange}
                />
              </div>
            </form>
  )
}
