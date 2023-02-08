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

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const myStorage = sessionStorage;

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
        const getData = await axios.get(`http://localhost:3600/user/users/${myId}`)
        const userInfo = getData.data.userInfo;
        dispatch(setUser(userInfo));
    }

    useEffect(() => {
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
        isToken();
    }, [user.accessToken])


    const handleWriteModal = () => {
        setIsWriteModal(!isWriteModal);
    }

    return (
        <div>
            <button onClick={handleWriteModal} style={{ zIndex : '2', position : 'absolute', bottom : '20px', left : '20px' }}>글쓰기✏️</button>
            <MainMap setIsPostModal={setIsPostModal} isPostModal={isPostModal} isJoinModal={isJoinModal} setIsDetailModal={setIsDetailModal} isDetailModal={isDetailModal} />
            {
                isWriteModal && (<WritePost setIsWriteModal={setIsWriteModal} isWriteModal={isWriteModal} />)
            }
            {
                isPostModal && (<DetailPost setIsPostModal={setIsPostModal} isPostModal={isPostModal} setIsJoinModal={setIsJoinModal} isJoinModal={isJoinModal} setIsDetailModal={setIsDetailModal}  />)
            }
            {
                isDetailModal && (<MatchingDetail isDetailModal={isDetailModal} setIsDetailModal={setIsDetailModal}/>)
            }
        </div>
    )
}
export default HomePage