'use client'
import Image from "next/image";
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    // 1) 단순 딜레이 후 이동
    const t = setTimeout(() => {
      router.replace('/home')   // 첫 화면 경로
    }, 1200)

    // 2) 예: 토큰 체크/초기 로딩 후 이동도 가능
    // async function init() {
    //   await hydrateUser() // 예: 로컬스토리지/IndexedDB/RTK Query 프리패치
    //   router.replace('/home')
    // }
    // init()

    return () => clearTimeout(t)
  }, [router])

  return (


   
    <main className="grid place-items-center min-h-[100dvh] bg-white text-black overflow-hidden">
      <div className="relative w-[min(92vw,520px)] h-[60vh]">
        <Image
          src="/접속로딩1.svg"
          alt="logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </main>
  )
}

