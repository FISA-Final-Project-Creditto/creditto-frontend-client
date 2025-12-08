"use client";

import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  {
    ssr: false,
    loading: () => (
      <div className="w-[200px] h-[200px] rounded-xl bg-slate-100 animate-pulse" />
    ),
  }
);

export default function LottieClient() {
  return (
    <div className="w-[200px] h-[200px] mt-6">
      <DotLottieReact
        src="https://lottie.host/5e3d00b3-79ca-4abd-9808-99013190e330/8EXayNOkme.lottie"
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
