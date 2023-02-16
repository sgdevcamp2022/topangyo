import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../store/slice/modalslice';
import { joinMatching } from '../../store/slice/matchingslice';

const DetailPost = () => {
  const dispatch = useDispatch();
  const getPost = useSelector((state) => state.posts);
  const matching = useSelector((state) => state.matching);
  const [duplicate, setDuplicate] = useState(true);
  const myStorage = localStorage;
  const getMatchingPost = JSON.parse(myStorage.getItem('matchingPost'));

  const currentPost = getPost.currentPost;
  var matchingCount = getMatchingPost?.length;

  const handleDuplicate = () => {
    getMatchingPost?.map((data, idx) => {
      if(data.postPK === currentPost.postPK) {
        setDuplicate(false);
      }
    })
  }

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleJoinPost = () => {
    if(matchingCount === undefined) {
      matchingCount = 0;
    }
    if(matchingCount < 3 && duplicate) {
      dispatch(joinMatching());
      dispatch(
        openModal({
          modalType : "MatchingDetailModal",
          isOpen : true,
          postPK : currentPost.postPK,
        })
      )
      if(myStorage.getItem('matchingPost') === null) {
        myStorage.setItem('matchingPost', JSON.stringify([currentPost]));
      } else {
        myStorage.setItem('matchingPost', JSON.stringify([currentPost, ...JSON.parse(myStorage.getItem('matchingPost'))]));
      }
      
    } else {
      alert('더 이상 방을 입장할 수 없습니다!');
    }
  };
  
  const isToken = async () => {
    try {
      const myToken = myStorage.getItem('AccessToken');
      if(myToken) {

      } else {
        throw new Error('로그인을 먼저 해주세요!');
      }
    } catch(err) {
      if(err instanceof Error) {
        alert(err.message);
        handleCloseModal();
      }
      console.log(err);
    }
  }

  useEffect(() => {
    isToken();
    handleDuplicate();
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
      <h5>{currentPost.title}</h5>
      <h5>방장 : {currentPost.author_nickname}</h5>
      <h5>카테고리 : {currentPost.category}</h5>
      <h5>모집인원 : {currentPost.memberLimit}</h5>
      <h5>모임시간 : {currentPost.meetTime}</h5>
      <h5>{currentPost.description}</h5>
      <button onClick={handleCloseModal}>닫기</button>
      <button onClick={handleJoinPost}>입장</button>
    </div>
  );
};

export default DetailPost;
