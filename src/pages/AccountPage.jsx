import React from 'react'
import Header from '../components/Header'
import AccountInfo from '../components/AccountInfo'

function AccountPage({isAuthenticated}) {
  return (
    <>
      <AccountInfo isAuthenticated={isAuthenticated}/>
    </> 
      
  )
}

export default AccountPage