import AppHeader from '@/src/common/AppHeader/AppHeader'
import React from 'react'
import ImportAccount from './components/ImportAccount/ImportAccount'

export default function page() {
  return (
    <>
    <AppHeader title='내 계좌' show={true} showBack={true} showHamburger={false}/>
    <ImportAccount/>
    </>
  )
}
