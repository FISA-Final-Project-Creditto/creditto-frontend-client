"use client";
import api, { credittoApi } from "@/src/app/api/axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccounts } from "@/src/store/features/account/accountSlice";
import BottomBar from "@/src/app/[locale]/send/components/BottomBar";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { requireVerification } from "@/src/store/features/simplepw/simplepwSlice";

export default function ImportAccount() {
  const t = useTranslations("account.myAccount");
  const t2 = useTranslations("account.import");
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { accounts, status } = useSelector((state) => state.account);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) {
          console.error(t2("noAccessToken"));
          return;
        }

        // `credittoApi` 인스턴스를 사용하여 API 호출
        const response = await credittoApi.get("/api/accounts/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // API 응답 데이터의 data 프로퍼티에 실제 계좌 배열이 들어있으므로, response.data.data를 저장합니다.
        if (response.data && response.data.data) {
          dispatch(setAccounts(response.data.data));
          // 계좌 목록 전체를 JSON 문자열로 변환하여 sessionStorage에 저장합니다.
          sessionStorage.setItem(
            "accounts",
            JSON.stringify(response.data.data)
          );
          console.log(t2("saveSuccess"), response.data.data);
        }
      } catch (error) {
        console.error(t2("fetchFail"), error);
      }
    };

    // 계좌 정보가 아직 없을 때 또는 refresh 파라미터가 있을 때 API 호출
    const shouldRefresh = searchParams.get("refresh") === "true";
    if (status === "idle" || shouldRefresh) {
      fetchAccounts();
    }
  }, [dispatch, status, t2, searchParams]);

  // 페이지 포커스 시마다 계좌 목록을 새로고침
  useEffect(() => {
    const handleFocus = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) return;

        const response = await credittoApi.get("/api/accounts/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data && response.data.data) {
          dispatch(setAccounts(response.data.data));
          sessionStorage.setItem(
            "accounts",
            JSON.stringify(response.data.data)
          );
        }
      } catch (error) {
        console.error(t2("fetchFail"), error);
      }
    };

    // 브라우저 탭이 다시 포커스될 때 계좌 목록 갱신
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [dispatch, t2]);
  const handleAccount = () => {
    // 비밀번호 확인을 요청하고, 성공 시 '/account/create'로 이동하도록 설정
    dispatch(requireVerification("/account/create"));
    router.push("/auth/pw"); // 비밀번호 페이지로 이동
  };

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{t("wooriBank")}</h2>

      <div className="space-y-4">
        {accounts?.length > 0 ? (
          accounts.map((account) => (
            <div
              key={account.accountId}
              className="bg-white border-b border-gray-200 p-2 cursor-pointer"
              onClick={() => {
                router.push(`/account/my_account/${account.accountId}`);
              }}
            >
              <div className="flex items-start text-left gap-4 flex-1">
                <Image
                  src="/icon/woori.png"
                  alt={t("wooriLogo")}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />

                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-900">
                    {account.accountName}
                  </p>
                  <p className="text-sm text-gray-500">{account.accountNo}</p>
                </div>
              </div>
              <div>
                <p className="text-lg text-right font-bold text-gray-900">
                  {new Intl.NumberFormat("ko-KR").format(account.balance)}{t("currency")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <div className=" w-full h-full bg-blue-300 ">
              <p>{t("noLinkedAccount")}</p>
            </div>
            <footer>
              <BottomBar
                label={t("goToCreate")}
                onClick={handleAccount}
                isActive={true}
              />
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}
