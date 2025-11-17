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
    <div className='w-full  min-h-[440px] justify-center items-center flex'>
        <img src="/icon/woori.png" className='w-15 h-15'/>
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
