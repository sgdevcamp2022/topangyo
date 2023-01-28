import React from 'react'
import '../styles/Navbar.scss';

const Navbar = () => {
  return (
    <header>
        <a className='logo-box' href='#'>
            <img alt='logo' className='logo' src='images/logo/DSG_white_logo.png' />
            <h3>DSG</h3> 
        </a>
        {/* 로그인 하기 전에 보여주는 Navbar */}
        {/* <a className='signin-button' href='#'><button>Log in</button></a> */}
        
        {/* 로그인 했을 때 보여주는 Navbar */}
        <a className='user-box' href='#'>
          <img alt='userImage' className='user-icon' src='images/user/user_image.png' />
          <h4>Name</h4>
        </a>
    </header>
  )
}

export default Navbar