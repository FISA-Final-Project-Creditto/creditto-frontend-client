"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BottomBar from "../../send/components/BottomBar";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import api, { credittoApi } from "../../api/axios";

export default function AccountCreatePage() {
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState(""); // 기본값을 빈 문자열로 설정
  const [savedToken, setSavedToken] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      setSavedToken(accessToken);
    }
  }, []);

  const CreateHandle = async (e) => {
    e.preventDefault(); //새로고침 방지
    const res = await credittoApi.post(
      "/api/accounts",
      {
        accountName,
        accountType,
      },
      {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      }
    );

    console.log("데이터 정보:", res.data); // 서버 응답 확인
  };

  const Accountfield = (
    <div className="w-full h-[70px] border border-gray-300 rounded-lg flex flex-col justify-center px-5">
      <label className="text-sm text-gray-600">계좌 이름</label>
      <input
        value={accountName}
        type="text"
        placeholder="계좌 명을 입력하세요"
        className="w-full border-gray-300 focus:outline-none focus:border-[#1A3668] text-[20px] pb-1"
        onChange={(e) => setAccountName(e.target.value)}
        onInput={(e) => {
          // 한글, 영문자, 공백만 허용하고 나머지는 제거합니다.
          const value = e.target.value.replace(
            /[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/g,
            ""
          );
          e.target.value = value;
          setAccountName(value);
        }}
      />
    </div>
  );

  const AccountTypefield = (
    <div className="w-full h-[70px] border border-gray-300 rounded-lg flex flex-col justify-center px-5">
      <label htmlFor="accountType" className="text-sm text-gray-600 ">
        계좌 종류
      </label>
      <select
        id="accountType"
        value={accountType}
        onChange={(e) => setAccountType(e.target.value)}
        className="w-full border-gray-300 focus:outline-none focus:border-[#1A3668] text-[20px] pb-1"
      >
        <option value="" disabled>
          계좌 종류를 선택하세요
        </option>
        <option value="DEPOSIT">입출금 계좌</option>
        <option value="SAVINGS">적금 계좌</option>
        <option value="LOAN">대출 계좌</option>
        <option value="INVESTMENT">투자 계좌</option>
      </select>
    </div>
  );

  return (
    <>
      <AppHeader
        title="계좌 생성"
        show={true}
        showHamburger={true}
        showBack={true}
      />
      <form onSubmit={CreateHandle} className="flex flex-col flex-1">
        <div className="flex-1 px-8 pt-8 pb-10 text-left space-y-6">
          {/* 상단 문구 */}
          <h1 className="text-[20px] font-bold mb-5">
            계좌 생성을 위해
            <br />
            정보를 입력해주세요
          </h1>

          {/* 입력 필드 */}
          {Accountfield}
          {AccountTypefield}
        </div>
        <footer>
          <BottomBar label="계좌 생성하기" isActive={!!savedToken} />
        </footer>
      </form>
    </>
  );
}
