"use client";

import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

// 요일 라벨 매핑
const WEEKDAY_LABELS = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
};

const STATUS_TO_KOREAN = {
  ACTIVE: "정상",
  DELAYED: "연기",
  PAUSED: "일시중지",
  CANCELLED: "취소",
};

export default // 수정 가능한 필드
function EditableField({
  label,
  edit, // 편집 여부
  value,
  rawValue,
  type,
  regRemType, // 송금 주기(MONTHLY / WEEKLY)
  scheduledDate,
  scheduledDay,
  regRemStatus,
  onChange, // 계좌, 외화거래 변경 핸들러
  onChangeScheduledDate, // 날짜(매월) 변경 핸들러
  onChangeScheduledDay, // 요일(매주) 변경 핸들러
  onChangeRegRemStatus, // 정기 송금 상태 변경 핸들러
}) {
  // ✅ TODO: api에서 계좌 조회 호출로 가져올 예정(현재는 Redux로)
  const accounts = useSelector((state) => state.account.accounts); // Redux에서 저장된 연동계좌 목록 조회
  const connectedAccounts = accounts?.map((acc) => acc.accountNo) ?? []; // 계좌 번호만 추출

  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-left text-[#86909C] min-w-[100px]">{label}</span>

      {edit ? (
        type === "select-account" ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 text-right border-[#C9CDD4] rounded-md px-3 py-2 text-[#1D2129]"
          >
            {/* 연결된 계좌가 없을 경우 */}
            {connectedAccounts.length === 0 && (
              <option value="">연결된 계좌가 없습니다</option>
            )}

            {/* 연결된 계좌가 있을 경우 */}
            {connectedAccounts.map((account, idx) => (
              <option key={idx} value={account}>
                {account}
              </option>
            ))}
          </select>
        ) : type === "sendAmount" ? (
          <Input
            value={rawValue}
            type="number"
            inputMode="numeric"
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 text-right border-[#C9CDD4] text-[#1D2129]"
          />
        ) : type === "scheduled" ? (
          <div className="flex flex-1 justify-end">
            {regRemType === "MONTHLY" ? (
              <select
                value={scheduledDate}
                onChange={(e) => onChangeScheduledDate(e.target.value)}
                className="border-[#C9CDD4] rounded-md px-3 py-2 text-[#1D2129]"
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                    {i + 1}일
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={scheduledDay}
                onChange={(e) => onChangeScheduledDay(e.target.value)}
                className="border-[#C9CDD4] rounded-md px-3 py-2 text-[#1D2129]"
              >
                {Object.entries(WEEKDAY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ) : type === "regRemStatus" ? (
          <select
            value={regRemStatus}
            onChange={(e) => onChangeRegRemStatus(e.target.value)}
            className="flex-1 text-right border-[#C9CDD4] rounded-md px-3 py-2 text-[#1D2129]"
          >
            {Object.entries(STATUS_TO_KOREAN).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        ) : null
      ) : (
        // 읽기 모드 – 한 줄로 "매월 14일" / "매주 화요일" 표기
        <span className="text-right text-[#1D2129] font-medium flex-1 whitespace-pre-line">
          {type === "scheduled"
            ? regRemType === "MONTHLY"
              ? `매월 ${scheduledDate}일`
              : `매주 ${WEEKDAY_LABELS[scheduledDay] || ""}`
            : value}
        </span>
      )}
    </div>
  );
}
