'use client';

import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PermissionPage() {
  const router = useRouter();
  const [camOk, setCamOk] = useState(null);
  const [micOk, setMicOk] = useState(null);
  const [geoOk, setGeoOk] = useState(null);
  const [log, setLog] = useState([]);

  const append = (s) => setLog((prev) => [...prev, s]);

  async function requestCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((t) => t.stop());
      setCamOk(true);
      append("카메라 권한 허용");
    } catch (e) {
      setCamOk(false);
      append("카메라 권한 거부/오류");
    }
  }

  // async function requestMic() {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     stream.getTracks().forEach((t) => t.stop());
  //     setMicOk(true);
  //     append("마이크 권한 허용");
  //   } catch (e) {
  //     setMicOk(false);
  //     append("마이크 권한 거부/오류");
  //   }
  // }

  function requestGeo() {
    if (!("geolocation" in navigator)) {
      append("지오로케이션 미지원");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoOk(true);
        append(`위치 허용: ${pos.coords.latitude}, ${pos.coords.longitude}`);
      },
      (err) => {
        setGeoOk(false);
        append(`위치 거부/오류: ${err.code}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async function handleNext() {
    await requestCamera();
    // await requestMic();
    requestGeo();

    setTimeout(() => {
      router.push("/signup/agree");
    }, 3000);
  }

  return (
        <>
             <AppHeader title="접근 권한" show={true} showHamburger={true} />
        <div className="flex-1 px-8 pt-16 pb-10 text-left">
          <h1 className="text-2xl font-bold leading-snug">
            서비스 이용을 위해
            <br />
            앱 접근 권한을 확인해주세요
          </h1>

          <p className="mt-12 text-sm text-gray-500">선택 권한</p>

          <ul className="mt-6 space-y-8">
            <li>
              <div className="flex items-start gap-4">
                <img src="/icon/camera.png" className="w-6 h-6 mt-1" />
                <div>
                  <p className="font-bold">
                    카메라 {camOk === true ? "✅" : camOk === false ? "❌" : ""}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                    신분증 촬영, QR코드 인식, 사진찍어 이체하기,
                    <br />
                    영상상담 등에 사용
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-4">
                <img src="/icon/location.png" className="w-6 h-6 mt-1" />
                <div>
                  <p className="font-bold">
                    위치 {geoOk === true ? "✅" : geoOk === false ? "❌" : ""}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                    가까운 영업점 및 ATM 찾기에 사용
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-4">
                <img src="/icon/mic.png" className="w-6 h-6 mt-1" />
                <div>
                  <p className="font-bold">
                    마이크 {micOk === true ? "✅" : micOk === false ? "❌" : ""}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                    영상상담 시 음성인식을 위해 사용
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>

             <div className="w-full  h-[118px]  flex justify-center">
            <button
        className="cursor-pointer w-[90%] h-[60px] text-[22px] font-semibold flex justify-center items-center transition-colors rounded-lg bg-[#1A3668] text-white"
        onClick={() => {
          handleNext()
        }}
      >
        다음
      </button>
      </div>
</>
  );
}
