"use client";
import api, { credittoApi } from "@/src/app/api/axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccounts } from "@/src/store/features/account/accountSlice";
import BottomBar from "@/src/app/[locale]/send/components/BottomBar";

export default function ImportAccount() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { accounts, status } = useSelector((state) => state.account);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access Token이 없습니다.");
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
          console.log("계좌 정보 저장 성공:", response.data.data);
        }
      } catch (error) {
        console.error("계좌 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    // 계좌 정보가 아직 없을 때만 API 호출
    if (status === "idle") {
      fetchAccounts();
    }
  }, [dispatch, status]);
  const handleAccount = () => {
    router.push("/account/create");
  };

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">우리은행 예·적금</h2>

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
                <img
                  src="/icon/woori.png"
                  alt="우리은행 로고"
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
                  {new Intl.NumberFormat("ko-KR").format(account.balance)}원
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <div className=" w-full h-full bg-blue-300 ">
              <p>연결된 계좌가 없습니다.</p>
            </div>
            <footer>
              <BottomBar
                label="계좌 개설하러 가기"
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
