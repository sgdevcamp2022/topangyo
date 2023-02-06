import React from 'react'
import './styles/_normalize.scss'
import AccountPage from './pages/AccountPage'
import ChangeAccountPage from './pages/ChangeAccountPage'
import UserPage from './pages/UserPage'
import SignInPage from "./pages/SignInPage";
import {SignUpPage} from "./pages/SignUpPage";
import HomePage from './pages/HomePage'
import {Routes, Route} from 'react-router-dom';
import ChatPage from './pages/ChatPage';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/signin' element={<SignInPage/>} />
      <Route path='/signup' element={<SignUpPage/>} />
      <Route path='/account' element={<AccountPage/>} />
      <Route path='/account/change' element={<ChangeAccountPage/> } />
      <Route path='/users/:userid' element={<UserPage/>} />
      <Route path='*' element={<div>없는 페이지</div>} />
      <Route path='/chat' element ={<ChatPage/>}/> {/**채팅방 확인을 위해 임시로 만들어봄*/}
    </Routes>
  )
}

export default Router