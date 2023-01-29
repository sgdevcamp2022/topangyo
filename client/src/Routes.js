import React from 'react'
import './styles/_normalize.scss'
import AccountPage from './pages/AccountPage'
import ChangeAccountPage from './pages/ChangeAccountPage'
import UserPage from './pages/UserPage'
import SignInPage from "./pages/SignInPage";
import {SignUpPage} from "./pages/SignUpPage";
import HomePage from './pages/HomePage'

const Routes = () => {
  return (
    <div>
      {/* <HomePage/> */}
      {/*<AccountPage/>*/}
      <SignInPage/>
      <SignUpPage/>
      {/* <UserPage/> */}
      {/* <ChangeAccountPage/> */}
    </div>
  )
}

export default Routes