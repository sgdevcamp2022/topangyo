import React, { useEffect } from 'react'
import '../styles/Navbar.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  const myStorage = localStorage;

  const postFetch = async () => {
    try {
      const myToken = myStorage.getItem('AccessToken');
      if(myToken) {
        const result = await axios.post('http://localhost:3500/auth/logout');
        myStorage.removeItem('AccessToken');
        navigate('/');
      }

    } catch(err) {
      alert(err.message);
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    postFetch();
  }



  return (
    <header>
        <a className='logo-box' href='/'>
            <img alt='logo' className='logo' src='images/logo/DSG_white_logo.png' />
            <h3>DSG</h3> 
        </a>
        
        {
          !myStorage.getItem('AccessToken') ?
          (
            //로그인 하기 전에 보여주는 Navbar
            <a className='signin-button' href='/signin'><button>Log in</button></a>
          )
          :
          (
            //로그인 했을 때 보여주는 Navbar
            <div className='user-box'>
              <a className='user-box' href='/account'>
                <img alt='userImage' className='user-icon' src='images/user/user_image.png' />
                <h4>{user.nickname}</h4>
              </a>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          )
        }
    </header>
  )
}

export default Navbar