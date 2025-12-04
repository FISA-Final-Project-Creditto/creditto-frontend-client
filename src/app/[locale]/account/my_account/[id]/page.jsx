"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import api, { credittoApi } from "@/src/app/api/axios";
import { useTranslations } from "next-intl";
import Image from "next/image";

function formatNumber(n) {
  // n이 유효한 숫자인지 확인하고, 아닐 경우 '0'을 반환합니다.
  if (typeof n !== "number" || isNaN(n)) {
    return "0";
  }
  return n.toLocaleString("ko-KR");
}

export default function AccountDetailPage() {
  const t = useTranslations("account.myAccount");
  const router = useRouter();
  const params = useParams(); // useParams()는 { id: '...' } 형태의 객체를 반환합니다.
  const accountId = params.id; // 객체에서 실제 id 값을 추출합니다.
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all, in, out'
  const [accountData, setAccountData] = useState();
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    const fetchAccountDetails = async () => {
      if (!accountId) return; // accountId가 없으면 API를 호출하지 않습니다.
      console.log("accountId :", accountId);
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const res = await credittoApi.get(`/api/accounts/${accountId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const Detailres = await credittoApi.get(
          `/api/accounts/${accountId}/transactions`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("계좌 상세 정보:", res.data);
        console.log("거래 내역:", Detailres.data);
        setAccountData(res.data.data);
        setTransactions(Detailres.data.data);
        // TODO: 가져온 데이터를 state에 저장하여 화면에 표시합니다.
      } catch (error) {
        console.error("계좌 상세 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchAccountDetails();
  }, [accountId]); // accountId가 변경될 때마다 useEffect가 다시 실행됩니다.

  const filtered = useMemo(() => {
    if (!transactions) return [];
    return transactions.filter((transaction) => {
      if (filter === "in" && transaction.txnType !== "DEPOSIT") return false;
      if (filter === "out" && transaction.txnType !== "WITHDRAWAL")
        return false;
      if (!query) return true;
      const title =
        transaction.txnType === "DEPOSIT" ? t("deposit") : t("withdrawal");
      return title.includes(query);
    });
  }, [transactions, query, filter, t]);

  return (
    <main className="min-h-[100dvh] flex flex-col">
      <AppHeader title={t("historyTitle")} show={true} showHamburger={false} />

      {/* 스크롤 가능한 컨테이너: 화면을 넘을 때 세로 스크롤 발생 */}
      <div className="flex-1 overflow-auto">
        {/* 기존 카드 / 검색 / 리스트 전체를 이 div 안에 넣습니다 */}
        <div className="mx-4 mb-12 rounded-lg  border-gray-200 p-3">
          {/* 헤더 (뒤로 버튼 + 타이틀) */}

          {/* 계좌 카드 */}
          <div className="mx-2 mb-4 rounded-lg border border-[#C9CDD4] p-4">
            <div className="flex items-center gap-4">
              <Image
                src="/icon/woori.png"
                alt={t("wooriLogo")}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {accountData?.accountName}
                </p>
                <p className="text-sm text-gray-400">
                  {accountData?.accountNo}
                </p>
              </div>
              <span className="ml-2 px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">
                {accountData?.accountType}
              </span>
            </div>
            <p className="mt-4 text-right text-2xl font-bold">
              <span className="font-bold">
                {formatNumber(accountData?.balance)}
              </span>
              <span className="font-medium">{t("currency")}</span>
            </p>
          </div>

          {/* 검색 / 필터 */}
          <div className="flex items-center gap-3 px-2 mb-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="flex-1 border-b pb-2 text-sm outline-none"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm"
            >
              <option value="all">{t("all")}</option>
              <option value="in">{t("deposit")}</option>
              <option value="out">{t("withdrawal")}</option>
            </select>
          </div>

          <div className="border-b mb-4" />

          {/* 거래 리스트 */}
          <div className="px-2 space-y-6">
            {filtered.length === 0 && (
              <p className="text-center text-gray-400 py-8">{t("noHistory")}</p>
            )}

            {filtered.map((tx) => {
              const isDeposit = tx.txnType === "DEPOSIT";
              const title = isDeposit ? t("deposit") : t("withdrawal");
              return (
                <div
                  key={tx.txnTime}
                  className="flex items-start justify-between"
                >
                  <div>
                    <p className="text-base font-medium">{title}</p>
                    {/* txnDate가 없으므로 시간 표시는 주석 처리 또는 제거합니다. */}
                    {/* <p className="text-xs text-gray-400 pt-1">
                      {new Date(tx.txnDate).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p> */}
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-base font-semibold ${
                        isDeposit ? "text-blue-600" : "text-red-500"
                      }`}
                    >
                      <span className="font-bold">
                        {formatNumber(tx.txnAmount)}
                      </span>
                      <span className="font-medium">{t("currency")}</span>
                    </p>
                    <p className="text-xs text-gray-400 pt-1">
                      {formatNumber(tx.balance)}
                      {t("currency")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
