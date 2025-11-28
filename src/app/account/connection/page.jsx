'use client'
import AppHeader from '@/src/common/AppHeader/AppHeader'
import React, { useEffect } from 'react'
import BottomBar from '../../send/components/BottomBar'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

export default function AccountConnectionPage() {
    const router = useRouter();
    // Redux 스토어에서 계좌 목록을 가져옵니다.
    const accounts = useSelector((state) => state.account.accounts);

    useEffect(() => {
        // accounts 상태가 null이 아니거나 배열의 길이가 0보다 크면
        // 이미 계좌 정보가 있는 것으로 간주하고 페이지를 이동시킵니다.
        if (accounts && accounts.length > 0) {
            router.replace("/account/my_account");
        }
    }, [accounts, router]);

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
