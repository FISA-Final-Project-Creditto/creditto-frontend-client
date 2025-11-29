export const countryCodes = [
  { name: "대한민국", countryCode: "KOR" },
  { name: "미국", countryCode: "USA" },
  { name: "일본", countryCode: "JPN" },
  //   { name: "유로존(유럽연합)", countryCode: "EUU" },
  { name: "중국", countryCode: "CHN" },
  { name: "호주", countryCode: "AUS" },
  { name: "바레인", countryCode: "BHR" },
  { name: "홍콩", countryCode: "HKG" },
  { name: "싱가포르", countryCode: "SGP" },
  { name: "아랍에미리트", countryCode: "ARE" },
  { name: "영국", countryCode: "GBR" },
  { name: "태국", countryCode: "THA" },
  { name: "말레이시아", countryCode: "MYS" },
  { name: "인도네시아", countryCode: "IDN" },
  { name: "がはこと", countryCode: "UTO" },
];

// 국가명을 한국어로 변환
export const COUNTRY_TO_KOREAN = {
  KOR: "대한민국",
  USA: "미국",
  CHINA: "중국",
  JAPAN: "일본",
};

export const STATUS_TO_KOREAN = {
  ACTIVE: "정상",
  DELAYED: "연기",
  PAUSED: "일시중지",
  CANCELLED: "취소",
};
