'use client'
import AppHeader from '@/src/common/AppHeader/AppHeader'
import React from 'react'
import BottomBar from '../../send/components/BottomBar'
import { useRouter } from 'next/navigation'

export default function AccountConnectionPage() {
    const router = useRouter();
  return (
    <>
    <AppHeader title="계좌 연결" show={true} showBack={true} showHamburger={false}/>
    <div className='w-full text-left p-5 text-xl font-bold'>
        <div className='flex items-end'><div className='text-[#0C72BA] text-2xl'>WON 클릭&nbsp;</div>한번으로</div>
        <div>정용준님의 계좌를 연결할 수 있어요</div>
    </div>
    <div className='w-full  min-h-[440px] justify-center items-center flex flex-col'>
        <img src="/icon/woori.png" className='w-15 h-15'/>
        <div className="px-5 mt-4">
        <button
          type="button"
          className="flex items-center gap-2 text-[15px] text-slate-700"
        >
          {/* 체크 아이콘 */}
          <span className="flex items-end justify-center w-4 h-4">
            <svg
              className="w-4 h-4 text-blue-500"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4 10.5L8 14.5L16 5.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          {/* 텍스트 */}
          <span>
            <span className="font-medium">[필수]</span>{" "}
            본인 확인 서비스 약관 및 동의사항
          </span>
        </button>
      </div>
    </div>
          
         <footer>
            <BottomBar
              label="완료"
              onClick={() => router.push("/account/my_account")}
              isActive={true}
            />
          </footer>
    </>
  )
}
