// NaverMap.jsx
"use client";

import { useRef, useState } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";

const NaverMap = () => {
  const mapElement = useRef(null);
  const mapInstance = useRef(null);
  const infoWindow = useRef(null);
  const [markers, setMarkers] = useState([]);
  const t = useTranslations("main.tabs");

  /**
   * 지도 초기화
   */
  const initializeMap = () => {
    if (!mapElement.current || !window.naver) return;

    const { naver } = window;

    // 서울 시청 근처를 기본 중심으로
    const center = new naver.maps.LatLng(37.5665, 126.9780);

    const map = new naver.maps.Map(mapElement.current, {
      center,
      zoom: 12,
      zoomControl: true,
    });

    mapInstance.current = map;

    // 인포윈도우 생성
    infoWindow.current = new naver.maps.InfoWindow({
      content: "",
    });
  };

  /**
   * 하드코딩된 "외국인 특화/글로벌 데스크" 우리은행 위치 마커 찍기
   */
  const searchAndMarkBanks = () => {
    if (!mapInstance.current || !window.naver) {
      alert(t("map_loading_alert"));
      return;
    }

    const { naver } = window;

    // 기존 마커 제거
    markers.forEach((marker) => marker.setMap(null));

    // 🔹 하드코딩 지점 리스트
    const branches = [
      {
        name: "우리은행 본점영업부 (Global Desk)",
        lat: 37.5597246787,  // 서울 중구 소공로 51
        lng: 126.9818823906,
        address: "서울 중구 소공로 51 (회현동1가)",
      },
      {
        name: "우리은행 광희동금융센터 (Global Desk)",
        lat: 37.5645,        // 서울 중구 퇴계로 307 근처
        lng: 127.0058,
        address: "서울 중구 퇴계로 307 (광희동1가)",
      },
      {
        name: "우리은행 안산외국인특화지점 (대략 위치)",
        lat: 37.319,         // 안산시 단원구 중심 근처
        lng: 126.812,
        address: "경기 안산시 단원구 다문화거리 일대 (대략 좌표)",
      },
    ];

    const newMarkers = [];
    const bounds = new naver.maps.LatLngBounds();

    branches.forEach((branch) => {
      const position = new naver.maps.LatLng(branch.lat, branch.lng);

      const marker = new naver.maps.Marker({
        position,
        map: mapInstance.current,
        title: branch.name,
      });

      const contentString = [
        '<div style="padding:10px;min-width:220px;line-height:150%;">',
        `  <h5 style="margin-top:5px;font-weight:bold;">${branch.name}</h5>`,
        `  <p style="margin:4px 0;">${branch.address}</p>`,
        "</div>",
      ].join("");

      // 인포윈도우 없으면 생성 (안전장치)
      if (!infoWindow.current) {
        infoWindow.current = new naver.maps.InfoWindow({ content: "" });
      }

      naver.maps.Event.addListener(marker, "click", () => {
        infoWindow.current.setContent(contentString);
        infoWindow.current.open(mapInstance.current, marker);
      });

      newMarkers.push(marker);
      bounds.extend(position);
    });

    setMarkers(newMarkers);

    // 모든 마커가 보이도록 지도 범위 조정
    if (!bounds.isEmpty()) {
      mapInstance.current.fitBounds(bounds);
    }
  };

  return (
    <>
      {/* 🔹 스크립트 URL / 파라미터 수정 중요!! */}
      <Script
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}`}
        onLoad={initializeMap}
        onError={(e) => console.error("Naver Map Script-Load-Error", e)}
      />

      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={searchAndMarkBanks}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "100px",
            border: "1px solid #ccc",
            background: "#fff",
          }}
        >
          {t("find_woori_bank")}
        </button>
      </div>

      <div
        ref={mapElement}
        style={{
          borderRadius: "10px",
          width: "100%",
          height: "340px",
          border: "1px solid #eee",
        }}
      />
    </>
  );
};

export default NaverMap;
