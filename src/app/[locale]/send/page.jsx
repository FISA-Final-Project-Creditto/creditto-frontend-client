import SendMainClient from "./components/SendMainClient";

export const metadata = {
  title: "해외 송금",
  description: "정기 및 일회성 해외 송금 기능",
};

export const dynamic = "force-static"; // 정적으로 만들어줘서 TTFB 크게 감소시킴

export default function Page() {
  return <SendMainClient />;
}
