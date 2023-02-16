import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../store/slice/modalslice';
import axios from 'axios';
import { setCurrentPost } from '../../store/slice/postsslice';

const MatchingPost = ({data}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    

    const handleOpenModal = () => {
        dispatch(
            setCurrentPost(data)
        )
        dispatch(
            openModal({
                modalType : "MatchingDetailModal",
                isOpen : true,
                postPK : data.postPK
            })
        )
    }
        
    return (
    <a className="postCard" onClick={handleOpenModal} style={{
        backgroundColor : 'gray'
    }}>
        <p className="postTitle">{data.title}</p>
        <p>0 / {data.memberLimit}</p>
        <p>{data.meetTime.split('.')[0]}</p>
    </a>
    )
}

export default MatchingPost