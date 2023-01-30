import React from 'react'
import '../styles/Navbar.scss';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const user = useSelector((state) => state.user)

  return (
    <header style={{ zIndex : '20' }}>
        <a className='logo-box' href='/'>
            <img alt='logo' className='logo' src='images/logo/DSG_white_logo.png' />
            <h3>DSG</h3> 
        </a>
        
        

        {
          !user.accessToken ?
          (
            //로그인 하기 전에 보여주는 Navbar
            <a className='signin-button' href='/signin'><button>Log in</button></a>
          )
          :
          (
            //로그인 했을 때 보여주는 Navbar
            <a className='user-box' href='/account'>
              <img alt='userImage' className='user-icon' src='images/user/user_image.png' />
              <h4>{user.nickname}</h4>
            </a>
          )
        }
        
        
        
    </header>
  )
}

export default Navbar