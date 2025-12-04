"use client";

import { Button } from "@/components/ui/button";
import { credittoApi } from "@/src/app/api/axios";
import { CheckCircle2 } from "lucide-react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setConsentChecked } from "@/src/store/features/consent/consentSlice";
import { useDispatch } from "react-redux";
import BottomSheet from "@/src/common/UI/BottomSheet/BottomSheet";

export default function ConsentDetailPage() {
  const { id } = useParams(); // 동의서 ID
  const searchParam = useSearchParams();
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
  const [isOpen, setIsOpen] = useState(true);

  const handleScroll = (e) => {
    const target = e.currentTarget;
    const isBottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      10;
    setScrolledToBottom(isBottom);
  };

  // 닫기 버튼 클릭 시 bulk가 현재 1이면 약관 동의 페이지로 이동
  const handleClose = () => {
    setIsOpen(false);
    // 애니메이션
    setTimeout(() => {
      const isBulk = searchParam.get("bulk") === "1";
      if (isBulk) {
        // bulk 모드에서는 리스트로 보내는 편이 UX 좋음
        router.replace("/send/consent");
      } else {
        router.back();
      }
    }, 300);
  };

  // 동의 완료 버튼
  const handleAgree = async () => {
    // 동의 성공 시에만 Redux에 저장 후 네비게이션 처리
    const currentId = String(id);
    const isBulk = searchParam.get("bulk") === "1";
    const idsParam = searchParam.get("ids");
    const idxParam = searchParam.get("idx");

    dispatch(setConsentChecked({ id: currentId, checked: true }));

    if (isBulk && idsParam) {
      const ids = idsParam.split(",").filter(Boolean);
      const currentIndex = parseInt(idxParam ?? "0", 10);
      const nextIndex = currentIndex + 1;

      if (nextIndex < ids.length) {
        const nextId = ids[nextIndex];
        // 다음 동의서 내용 페이지로 이동
        router.replace(
          `/send/consent/${nextId}?bulk=1&ids=${idsParam}&idx=${nextIndex}`
        );
      } else {
        // 마지막 동의서까지 완료 - 동의 리스트 페이지로 이동
        router.replace("/send/consent");
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
    <BottomSheet
      open={isOpen}
      onOpenChange={handleClose}
      title={term.consentTitle}
    >
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
        <div className="pointer-events-none absolute bottom-24 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      )}

      {/* 고정 하단 버튼 */}
      <div className="sticky bottom-0 bg-white px-6 py-4">
        <Button
          onClick={handleAgree}
          disabled={!scrolledToBottom}
          className="w-full rounded-xl py-6 text-base font-semibold bg-[#1A3668] disabled:bg-[#E5E6EB]"
          size="lg"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            동의 완료
          </span>
        </Button>
      </div>
    </BottomSheet>
  );
}
