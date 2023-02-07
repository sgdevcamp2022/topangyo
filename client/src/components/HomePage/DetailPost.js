import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../store/slice/modalslice';
import axios from 'axios';
import { haveMatching } from '../../store/slice/matchingslice';

const DetailPost = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const [post, setPost] = useState({});

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleJoinPost = () => {
    dispatch(
      haveMatching(parseInt(modal.postPK))
    )
    dispatch(
      openModal({
        modalType : "MatchingDetailModal",
        isOpen : true,
        postPK : post.postPK,
      })
    )
  };

  const isContents = async () => {
    try {
      const getContentData = await axios.get('http://localhost:3700/post/list?page=1&lat=37.566770151102844&lon=126.97869755044226');
        getContentData.data.forEach(data => {
          if(data.postPK == modal.postPK) {
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
    <div
      style={{
          position: "absolute",
          zIndex: "100",
          backgroundColor: "white",
          padding: "50px",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%)`,
      }}
    > 
      <h3>모집 글 상세</h3>
      <h5>{post.title}</h5>
      <h5>방장 : {post.author_nickname}</h5>
      <h5>카테고리 : {post.category}</h5>
      <h5>모집인원 : {post.memberLimit}</h5>
      <h5>모임시간 : {post.meetTime}</h5>
      <h5>{post.description}</h5>
      <button onClick={handleCloseModal}>닫기</button>
      <button onClick={handleJoinPost}>입장</button>
    </div>
  );
};

export default DetailPost;
