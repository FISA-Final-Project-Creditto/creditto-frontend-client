"use client";

import { Input } from "@/components/ui/input";

// 요일 라벨 매핑
const WEEKDAY_LABELS = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
};

export default // 수정 가능한 필드
function EditableField({
  label,
  edit,
  value,
  rawValue,
  onChange,
  type,
  regRemType,
  scheduledDate,
  scheduledDay,
  onChangeRegRemType,
  onChangeScheduledDate,
  onChangeScheduledDay,
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-left text-[#86909C] min-w-[100px]">{label}</span>

      {edit ? (
        type === "select-account" ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 text-right border-[#C9CDD4] rounded-md px-3 py-2 text-[#1D2129]"
          >
            {/* TODO: 실제 계좌 리스트로 교체 */}
            <option value="1002797795658">1002797795658</option>
            <option value="123-4567-89">123-4567-89</option>
            <option value="987-6543-21">987-6543-21</option>
          </select>
        ) : type === "number" ? (
          <Input
            value={rawValue}
            type="number"
            inputMode="numeric"
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 text-right border-[#C9CDD4] text-[#1D2129]"
          />
        ) : type === "remType" ? (
          <div className="flex flex-1 justify-end gap-2">
            <select
              value={remType}
              onChange={(e) => onChangeRegRemType(e.target.value)}
              className="border-[#C9CDD4] rounded-md px-3 py-2 text-[#1D2129]"
            >
              <option value="MONTHLY">MONTHLY</option>
              <option value="WEEKLY">WEEKLY</option>
            </select>

            {remType === "MONTHLY" ? (
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
        ) : null
      ) : (
        <span className="text-right text-[#1D2129] font-medium flex-1 whitespace-pre-line">
          {type === "remType"
            ? regRemType === "MONTHLY"
              ? `매월 ${scheduledDate}일`
              : `매주 ${WEEKDAY_LABELS[scheduledDay]}`
            : value}
        </span>
      )}
    </div>
  );
}
