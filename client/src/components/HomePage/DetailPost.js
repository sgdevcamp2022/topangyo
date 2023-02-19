import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../store/slice/modalslice';
import { joinMatching } from '../../store/slice/matchingslice';
import '../../styles/DetailPost.scss';

const DetailPost = () => {
  const dispatch = useDispatch();
  const getPost = useSelector((state) => state.posts);
  const [duplicate, setDuplicate] = useState(true);
  const category = useSelector((state) => state.category);
  const myStorage = localStorage; 
  const getMatchingPost = JSON.parse(myStorage.getItem('matchingPost'));

  const currentPost = getPost.currentPost;
  const matchingCount = getMatchingPost?.length;

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
    <div className='detailpost'>
      <div className='detailpost-main'>
        <div className='detailpost-title'>
          {
            category.map((categoryData, idx) => {
              if(currentPost.category === categoryData.category) {
                return (
                  <span key={idx}>{categoryData.text.slice(0, 2)}</span>
                )
              }
            })
          }
          {currentPost.title}
        </div>
        <img alt='cancelImage' width="15px" className="x-img" src='images/close.png' onClick={handleCloseModal}/>
      </div>
      <hr id = "detailpost-line"/>
      <div className='detailpost-detail'>
        <div className='detailpost-inform'>
          <div className='detailpost-item'>{currentPost.author_nickname}</div>
          <div className='detailpost-item'>{currentPost.category}</div> 
          <div className='detailpost-item'>{currentPost.meetTime} </div>
          <div className='detailpost-item'> 0 / {currentPost.memberLimit}명 </div>
        </div>
        <div className = "detailpost-description">{currentPost.description}</div>
      </div>
      <button className = "detailpost-button" onClick={handleJoinPost}>입장</button>
    </div>
  );
};

export default DetailPost;
