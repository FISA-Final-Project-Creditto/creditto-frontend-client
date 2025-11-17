export default function request(request) {
  // 간단히 기본 로케일을 KO로 고정 (필요하면 Negotiator로 브라우저 언어 처리)
  return { locale: "ko" };
}