import React from 'react'
import Hambuger from '../Hambuger'
import { Bell, CreditCard, Settings } from 'lucide-react'

export default function Header() {
  return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm  ">
        <div className="bg-white px-5 py-3 flex items-center justify-between max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 rounded-3xl  rounded-lg flex items-center justify-center flex-shrink-0">
              <CreditCard className=" w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold text-foreground">Creditto</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded-lg transition">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>
  )
}
