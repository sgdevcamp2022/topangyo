import MainMap from '../components/HomePage/MainMap.js'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setToken } from '../store/slice/userslice'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PostList from '../components/HomePage/PostList.js'
import "../styles/PostList.scss";

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const modal = useSelector((state) => state.modal);
    
    const myStorage = localStorage;
    const [page, setPage] = useState(1);

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
        const getUserData = await axios.get(`http://localhost:3600/user/users/${myId}`)
        const userInfo = getUserData.data.userInfo;
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
            }
        } catch(err) {
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
                    alert(err);
                    navigate('/');
                    break;
            }
        }
    }

    useEffect(() => {
        isToken();
    }, [user.accessToken, modal.isOpen])




    return (
        <div>
            <PostList page={page} setPage={setPage} />
            <MainMap setPage={setPage}/>
        </div>
    )
}

export default HomePage