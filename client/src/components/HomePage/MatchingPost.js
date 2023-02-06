import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../store/slice/modalslice';
import axios from 'axios';

const MatchingPost = ({matchingData}) => {
    const dispatch = useDispatch();
    const [post, setPost] = useState({});

    const handleOpenModal = () => {
        dispatch(
            openModal({
                modalType : "MatchingDetailModal",
                isOpen : true,
                postPK : matchingData
            })
        )
    }

    const isContents = async () => {
        try {
          const getContentData = await axios.get('http://localhost:3700/post/list?page=1&lat=37.566770151102844&lon=126.97869755044226');
            getContentData.data.forEach(data => {
              if(data.postPK == matchingData) {
                setPost(data);
              }
            });
        } catch(err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        isContents();
    }, [])


        
    return (
    <a className="postCard" onClick={handleOpenModal} style={{
        backgroundColor : 'gray'
    }}>
        <p className="postTitle">{post.title}</p>
        <p>0 / {post.memberLimit}</p>
        <p>{post.meetTime}</p>
    </a>
    )
}

export default MatchingPost