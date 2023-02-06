import MainMap from '../components/HomePage/MainMap.js'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setToken } from '../store/slice/userslice'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import WritePost from '../components/HomePage/WritePost.js'
import { useNavigate } from 'react-router-dom'
import DetailPost from '../components/HomePage/DetailPost.js'
import MatchingDetail from '../components/HomePage/MatchingDetail.js'
import PostList from '../components/HomePage/PostList.js'
import "../styles/PostList.scss";

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const myStorage = sessionStorage;

    const [contents, setContents] = useState([]);

    const [isWriteModal, setIsWriteModal] = useState(false);
    const [isPostModal, setIsPostModal] = useState(false);
    const [isJoinModal, setIsJoinModal] = useState(false);
    const [isDetailModal, setIsDetailModal] = useState(false);
    


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

    const isContents = async () => {
        try {
            const getContentData = await axios.get('http://localhost:3000/data/sampleContents.json');
            //const getContentData = await axios.get(`http://localhost:3700/post/${1}`);
            setContents(getContentData.data)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        isToken();
        isContents();
    }, [user.accessToken])

    const handleWriteModal = () => {
        setIsWriteModal(!isWriteModal);
    }

    return (
        <div>
            <button onClick={handleWriteModal} style={{ zIndex : '2', position : 'absolute', bottom : '20px', left : '20px' }}>버튼</button>
            <MainMap setIsPostModal={setIsPostModal} isPostModal={isPostModal} isJoinModal={isJoinModal} setIsDetailModal={setIsDetailModal} isDetailModal={isDetailModal} contents={contents}/>
            {
                isWriteModal && (<WritePost setIsWriteModal={setIsWriteModal} isWriteModal={isWriteModal} />)
            }
            {
                isPostModal && (<DetailPost contents={contents} setIsPostModal={setIsPostModal} isPostModal={isPostModal} setIsJoinModal={setIsJoinModal} isJoinModal={isJoinModal} setIsDetailModal={setIsDetailModal}  />)
            }
            {
                isDetailModal && (<MatchingDetail isDetailModal={isDetailModal} setIsDetailModal={setIsDetailModal}/>)
            }
            <PostList setIsPostModal={setIsPostModal} isPostModal={isPostModal} isJoinModal={isJoinModal} setIsDetailModal={setIsDetailModal} isDetailModal={isDetailModal} contents={contents}/>
        </div>
    )
}

export default HomePage