import { cookies } from "next/headers";
import SecurePage from "./page";

export default function PwLayout({ children }) {
  // 서버에서 httpOnly 쿠키를 안전하게 읽어옵니다.
  const serialNumber = cookies().get("serialNumber")?.value || null;

  // 클라이언트 컴포넌트인 SecurePage에 prop으로 전달합니다.
  // children을 렌더링하여 page.jsx의 기본 콘텐츠를 표시합니다.
  return <SecurePage serialNumber={serialNumber}>{children}</SecurePage>;
}