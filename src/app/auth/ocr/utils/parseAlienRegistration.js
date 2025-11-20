// utils/parseAlienRegistration.js

export function parseAlienRegistration(ocrData) {
  if (!ocrData) return null;

  const image = ocrData.images?.[0];
  const ac = image?.idCard?.result?.ac;

  if (!ac) return null;

  // formatted.value → text 순으로 값 가져오기
  const getValue = (fieldArr) => {
    if (!fieldArr || fieldArr.length === 0) return "";
    const item = fieldArr[0];
    if (item?.formatted?.value) return item.formatted.value;
    if (item?.text) return item.text;
    return "";
  };

  // 날짜 → { raw: ". ..", iso: "YYYY-MM-DD" }
  const getDate = (fieldArr) => {
    if (!fieldArr || fieldArr.length === 0) return { raw: "", iso: "" };
    const item = fieldArr[0];

    const rawText = item.text ?? "";

    if (item.formatted?.year && item.formatted?.month && item.formatted?.day) {
      const { year, month, day } = item.formatted;
      const iso = `${year}-${month}-${day}`; // "2011-01-01"
      return { raw: rawText, iso };
    }

    return { raw: rawText, iso: "" };
  };

  return {
    idtype: image?.idCard?.result?.idtype ?? "",

    // 주요 필드
    alienRegNum: getValue(ac.alienRegNum),
    sex: getValue(ac.sex),
    name: getValue(ac.name),
    nationality: getValue(ac.nationality),
    visaType: getValue(ac.visaType),

    // 날짜
    issueDateRaw: getDate(ac.issueDate).raw,
    issueDateIso: getDate(ac.issueDate).iso,

    // 발급 기관
    authority: getValue(ac.authority),
    authorityEng: getValue(ac.authorityEng),

    // 기타 번호
    alienRegNumEtc: getValue(ac.alienRegNumEtc),
  };
}
