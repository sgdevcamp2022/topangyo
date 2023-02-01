import React, { useEffect } from 'react'
import '../styles/Navbar.scss';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { changeGender, changeId, changeNickname, changeToken } from '../store/store';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const getFetch = async () => {
      try {
        const myToken = sessionStorage.getItem('access-token');
        
        if(myToken) {
          axios.defaults.headers.common['access-token'] = myToken;
          const decode = jwt_decode(myToken);
          const myId = decode.userInfo.id;

          const result = await axios.get(`http://localhost:3600/user/users/${myId}`);
          const userInfo = result.data.userInfo;
          dispatch(changeId(userInfo.id));
          dispatch(changeNickname(userInfo.nickname));
          dispatch(changeGender(userInfo.gender));
        }
      
      } catch(err) {
        alert('아이디 또는 비밀번호가 틀렸습니다!');
      }
    }
    getFetch();
  }, [user])

  const postFetch = async () => {
    try {
      const myToken = sessionStorage.getItem('access-token');
      if(myToken) {
        const result = await axios.post('http://localhost:3500/auth/logout');
        sessionStorage.removeItem('access-token');
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
          !sessionStorage.getItem('access-token') ?
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