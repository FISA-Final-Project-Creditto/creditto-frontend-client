"use client";

import { Button } from "@/components/ui/button";
import { credittoApi } from "@/src/app/api/axios";
import { CheckCircle2, X } from "lucide-react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setConsentChecked } from "@/src/store/features/consent/consentSlice";
import { useDispatch } from "react-redux";

export default function ConsentDetailPage() {
  const { id } = useParams(); // 동의서 ID (string)
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [term, setTerm] = useState({
    consentCategory: "",
    consentDefVer: 0,
    consentDesc: "", // 동의서 내용
    consentTitle: "", // 동의서 제목
    definitionId: 0, // 동의서 ID
  });

  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [status, setStatus] = useState("");

  const agreeConsent = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const res = await credittoApi.post("/api/consents/agree", {
        params: {
          consentCode: term.consentcode,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { code, message, data } = res.data;
      if (code === 201 && data.consentStatus === "AGREE") {
        console.log(message);
        setStatus(data.consentStatus); // 동의서 상태를 "AGREE"로 업데이트

        return true;
      }
    } catch (error) {
      console.error("특정 동의서 실패: ", error);
    }
  };

  const handleScroll = (e) => {
    const target = e.currentTarget;
    const isBottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      10;
    setScrolledToBottom(isBottom);
  };

  // 동의 완료 버튼
  const handleAgree = async () => {
    // 동의 성공 시에만 Redux에 저장 후 네비게이션 처리
    const currentId = String(id);
    dispatch(setConsentChecked({ id: currentId, checked: true }));

    // bulk 모드인지 확인
    const isBulk = searchParams.get("bulk") === "1";
    const idsParam = searchParams.get("ids");
    const idxParam = searchParams.get("idx");

    if (isBulk && idsParam) {
      const ids = idsParam.split(",").filter(Boolean);
      const currentIndex = parseInt(idxParam ?? "0", 10);
      const nextIndex = currentIndex + 1;

      if (nextIndex < ids.length) {
        const nextId = ids[nextIndex];
        // 다음 동의서 내용 페이지로 이동
        router.replace(
          `/credit/consent/${nextId}?bulk=1&ids=${idsParam}&idx=${nextIndex}`
        );
      } else {
        // 마지막 동의서까지 완료 → 동의 리스트 페이지로 이동
        router.push("/credit/consent");
      }
    } else {
      // 이전 페이지로 돌아가기
      router.back();
    }
  };

  // 특정 동의서 조회 (API 붙일 때 주석 해제)
  useEffect(() => {
    const fetchConsent = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        const res = await credittoApi.get(`/api/consents/definitions/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { code, data } = res.data;
        if (code === 200) {
          console.log("특정 동의서 조회 성공: ", data);
          setTerm(data);
        }
      } catch (error) {
        console.error("특정 동의서 조회 실패: ", error);
      }
    };

    fetchConsent();
  }, [id]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center">
      <div className="relative flex h-[66vh] w-full max-w-2xl flex-col animate-in slide-in-from-bottom-10 rounded-t-2xl bg-card shadow-2xl sm:rounded-2xl">
        {/* 동의서 상단바 */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-card px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            {/* 동의서 제목 */}
            <h2 className="text-lg font-semibold text-black">
              {term.consentTitle}
            </h2>

            {/* 필수 태그 */}
            <span className="mt-1 inline-block rounded-full bg-[#E5E6EB] px-2 py-1 text-xs font-medium">
              필수
            </span>
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={() => {
              const isBulk = searchParams.get("bulk") === "1";
              if (isBulk) {
                // bulk 모드에서는 리스트로 보내는 편이 UX 좋음
                router.push("/credit/consent");
              } else {
                router.back();
              }
            }}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 동의서 내용 */}
        <div
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 py-4" // 남은 높이를 다 쓰고 넘치면 스크롤
        >
          <div className="whitespace-pre-wrap text-sm leading-[3.0] text-left text-black">
            {term.consentDesc}
          </div>
        </div>

        {/* 스크롤 바 */}
        {!scrolledToBottom && (
          <div className="pointer-events-none absolute bottom-24 left-0 right-0 h-20 bg-gradient-to-t from-card to-transparent" />
        )}

        {/* 고정 하단 버튼 */}
        <div className="sticky bottom-0 bg-[card] px-6 py-4">
          <Button
            onClick={handleAgree}
            className="w-full rounded-xl py-6 text-base font-semibold bg-[#1A3668]"
            size="lg"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              동의 완료
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
