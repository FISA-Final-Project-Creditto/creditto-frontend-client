'use client';

import React from 'react';
import { X, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsSidebar({ isOpen, onClose }) {
  const router = useRouter();

  const handleLogout = () => {
    // 세션 스토리지에서 사용자 정보 제거
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userId');
    onClose(); // 사이드바 닫기
    router.push('/login'); // 로그인 페이지로 이동
  };

  // isOpen이 false이면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[99] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-background shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-title"
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 id="sidebar-title" className="text-lg font-semibold">
            설정
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left">
            <LogOut className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">로그아웃</span>
          </button>
        </div>
      </div>
    </>
  );
}