"use client";

import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BottomBar from "../../send/components/BottomBar";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function PermissionPage() {
  const t = useTranslations("signup.permission");
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
      append(t("cameraGranted"));
    } catch (e) {
      setCamOk(false);
      append(t("cameraDenied"));
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
      append(t("geolocationNotSupported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoOk(true);
        append(t("locationAllowed", { lat: pos.coords.latitude, lon: pos.coords.longitude }));
      },
      (err) => {
        setGeoOk(false);
        append(t("locationDenied", { code: err.code }));
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
      <AppHeader title={t("title")} show={true} showHamburger={false} />
      <div className="flex-1 px-8 pt-16 pb-10 text-left">
        <h1 className="text-2xl font-bold leading-snug">
          {t("description1")}
          <br />{t("description2")}
        </h1>

        <p className="mt-12 text-sm text-gray-500">{t("optional")}</p>

        <ul className="mt-6 space-y-8">
          <li>
            <div className="flex items-start gap-4">
              <Image src="/icon/camera.png" alt={t("camera")} width={24} height={24} className="w-6 h-6 mt-1" />
              <div>
                <p className="font-bold">
                  {t("camera")} {camOk === true ? "✅" : camOk === false ? "❌" : ""}
                </p>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                  {t("cameraDescription")}
                </p>
              </div>
            </div>
          </li>

          <li>
            <div className="flex items-start gap-4">
              <Image src="/icon/location.png" alt={t("location")} width={24} height={24} className="w-6 h-6 mt-1" />
              <div>
                <p className="font-bold">
                  {t("location")} {geoOk === true ? "✅" : geoOk === false ? "❌" : ""}
                </p>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                  {t("locationDescription")}
                </p>
              </div>
            </div>
          </li>

          <li>
            <div className="flex items-start gap-4">
              <Image src="/icon/mic.png" alt={t("microphone")} width={24} height={24} className="w-6 h-6 mt-1" />
              <div>
                <p className="font-bold">
                  {t("microphone")} {micOk === true ? "✅" : micOk === false ? "❌" : ""}
                </p>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                  {t("microphoneDescription")}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <footer>
        <BottomBar label={t("next")} onClick={handleNext} isActive={true} />
      </footer>
    </>
  );
}
