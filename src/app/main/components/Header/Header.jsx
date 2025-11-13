import React from 'react'
import Hambuger from '../Hambuger'

export default function Header() {
  return (
     <div className="w-full  flex justify-evenly items-center p-2 ">
          <div className="w-9 h-10"></div>
          <img src="/logo/logo.png" className="w-[177px]" />
          <Hambuger />
         </div>
  )
}
