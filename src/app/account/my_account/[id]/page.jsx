"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import api from "@/src/app/api/axios";

const mockAccount = {
  accountId: 1,
  accountNo: "1810908621009",
  accountName: "테스트 계좌",
  balance: 1592000,
  accountType: "SAVINGS",
  accountState: "ACTIVE",
  userId: "2",
};

const mockTransactions = [
  {
    accountId: 1,
    date: "2024-10-27",
    title: "상암 GS25",
    txtamount: -4500,
    balanceAfter: 1200000,
  },
  {
    accountId: 2,
    date: "2024-10-27",
    title: "상암 교촌치킨",
    txtamount: -22500,
    balanceAfter: 1204500,
  },
  {
    accountId: 3,
    date: "2024-10-25",
    title: "급여",
    txtamount: 1200000,
    balanceAfter: 1227000,
  },
  {
    accountId: 4,
    date: "2024-10-25",
    title: "9월 교통대금",
    txtamount: -65000,
    balanceAfter: 27000,
  },
];

function formatNumber(n) {
  return n.toLocaleString("ko-KR");
}

function groupByDate(list) {
  return list.reduce((acc, tx) => {
    (acc[tx.date] ||= []).push(tx);
    return acc;
  }, {});
}

export default function AccountDetailPage() {
  const router = useRouter();
  const accountId = useParams(); // 필요 시 사용
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all, in, out'
  const accesstoken = sessionStorage.getItem("accessToken");

  // useEffect(() => {
  //   const res = api.get(`/api/accounts/id/${accountId}`, { accesstoken });
  //   console.log(res.data);
  // }, []);

  const filtered = useMemo(() => {
    return mockTransactions.filter((t) => {
      if (filter === "in" && t.amount <= 0) return false;
      if (filter === "out" && t.amount >= 0) return false;
      if (!query) return true;
      return t.title.includes(query);
    });
  }, [query, filter]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);
  const dates = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1));

  return (
    <main className="min-h-[100dvh] flex flex-col">
      <AppHeader title="계좌 내역 조회" show={true} showHamburger={false} />

      {/* 스크롤 가능한 컨테이너: 화면을 넘을 때 세로 스크롤 발생 */}
      <div className="flex-1 overflow-auto">
        {/* 기존 카드 / 검색 / 리스트 전체를 이 div 안에 넣습니다 */}
        <div className="mx-4 mb-12 rounded-lg  border-gray-200 p-3">
          {/* 헤더 (뒤로 버튼 + 타이틀) */}

          {/* 계좌 카드 */}
          <div className="mx-2 mb-4 rounded-lg border border-[#C9CDD4] p-4">
            <div className="flex items-center gap-4">
              <img
                src="/icon/woori.png"
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {mockAccount.accountName}
                </p>
                <p className="text-sm text-gray-400">
                  {mockAccount.accountNo}
                </p>
              </div>
              <span className="ml-2 px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">
                제한 계좌
              </span>
            </div>
            <p className="mt-4 text-right text-2xl font-bold">
              <span className="font-bold">
                {formatNumber(mockAccount.balance)}
              </span>
              <span className="font-medium">원</span>
            </p>
          </div>

          {/* 검색 / 필터 */}
          <div className="flex items-center gap-3 px-2 mb-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="거래 내역 검색"
              className="flex-1 border-b pb-2 text-sm outline-none"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm"
            >
              <option value="all">전체</option>
              <option value="in">입금</option>
              <option value="out">출금</option>
            </select>
          </div>

          <div className="border-b mb-4" />

          {/* 거래 리스트 */}
          <div className="px-2 space-y-6">
            {dates.length === 0 && (
              <p className="text-center text-gray-400 py-8">
                거래내역이 없습니다.
              </p>
            )}

            {dates.map((date) => (
              <div key={date}>
                <p className="text-sm text-gray-500 mb-3 text-left">
                  {new Date(date).toLocaleDateString("ko-KR", {
                    month: "numeric",
                    day: "numeric",
                  })}
                </p>
                <div className="space-y-4">
                  {grouped[date].map((tx) => (
                    <div
                      key={tx.accountId}
                      className="flex items-start justify-between"
                    >
                      <div>
                        <p className="text-base font-medium">{tx.title}</p>
                      </div>

                      <div className="text-right mt-8">
                        <p
                          className={`text-base font-semibold ${
                            tx.txtamount >= 0 ? "text-blue-600" : "text-red-500"
                          }`}
                        >
                          {tx.txtamount >= 0 ? "" : ""}
                          <span className="font-bold">
                            {formatNumber(Math.abs(tx.txtamount))}
                          </span>
                          <span className="font-medium">원</span>
                        </p>
                        <p className="text-sm text-gray-400 font-thin mt-1">
                          <span className="">
                            {formatNumber(tx.balanceAfter)}
                          </span>
                          <span className="font-medium">원</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
