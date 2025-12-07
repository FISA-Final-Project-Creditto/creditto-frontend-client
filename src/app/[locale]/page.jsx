import SplashScreen from "./components/SplashScreen";

export const metadata = {
  title: "시작하기",
  description: "Creditto 서비스를 시작하는 첫 화면입니다.",
};

export default function Page() {
  return <SplashScreen hasSerial={false} />;
}
