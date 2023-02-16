import React, { useEffect } from 'react'
import Profile from '../components/AccountPage/Profile'
import Alert from '../components/AccountPage/Alert'
import History from '../components/AccountPage/History'
import Friends from '../components/AccountPage/Friends'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { setUser, setToken } from '../store/slice/userslice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AccountPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const myStorage = localStorage;
  const navigate = useNavigate();

  const UpdateToken = async () => {
    myStorage.removeItem('AccessToken');
    const refreshToken = await axios.get('http://localhost:3500/auth/token_refresh');
    if(refreshToken.status === 201) {
        const token = refreshToken.data.accessToken;
        
        myStorage.setItem('AccessToken', token);

        const myToken = myStorage.getItem('AccessToken');
        dispatch(setToken(myToken));
        const decode = jwt_decode(myToken);
        const myId = decode.userInfo.id;
        getFetch(myId);
    }
  }

  const getFetch = async (myId) => {
    const getData = await axios.get(`http://localhost:3600/user/users/${myId}`)
    const userInfo = getData.data.userInfo;
    dispatch(setUser(userInfo));
  }

  const isToken = async () => {
    try {
        const myToken = myStorage.getItem('AccessToken');
        
        if(myToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${myToken}`;
          const tokenStatus = await axios.get('http://localhost:3500/auth/token_info');
          
          dispatch(setToken(myToken));
          const decode = jwt_decode(myToken);
          const myId = decode.userInfo.id;
          getFetch(myId);
        } else {
          throw new Error('로그인 되지 않은 사용자');
        }
    } catch(err) {
      if(err instanceof Error) {
        alert(err.message);
        navigate('/');
      }
      switch (err.response.status) {
        case 400:
          alert('잘못된 요청');
          navigate('/');
          break;
        case 403:
          try {
              UpdateToken();
          } catch(err) {
              alert('접근 권한 없음!');
              navigate('/');
          }
          break;
        default:
          navigate('/account');
          break;
      }
    }
  }

  useEffect(() => {
    isToken();
  }, [user.accessToken, user.name, user.nickname])


  return (
    <div className='container-col'>
      <Profile/>
      <hr/>
      <Alert/>
      <hr/>
      <History/>
      <hr/>
      <Friends/>
    </div>
  )
}

export default AccountPage