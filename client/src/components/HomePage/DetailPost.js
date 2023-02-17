import React from 'react'
import './../../styles/DetailPost.scss';

const DetailPost = ({setIsPostModal, isPostModal, setIsJoinModal, isJoinModal, setIsDetailModal}) => {

  const handleCloseModal = () => {
    setIsPostModal(!isPostModal);
  }

  const handleJoinPost = () => {
    setIsJoinModal(true);
    setIsPostModal(false);
    setIsDetailModal(true);
  }

return (
<div className='detailpost'>
  <div className='detailpost-main'>
    <div className='detailpost-title'>🎳 고깃집 혼밥 같이 할 사람? 같이 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ먹어요요요뉸노ssssssssssssssssssssssssssssssssssss</div>
    <button className = "x detailpost-delete" onClick={handleCloseModal}><img className = "x-img" src = {process.env.PUBLIC_URL + '/images/close.png'} ></img></button>
  </div>
  <hr id = "detailpost-line"/>
  <div className='detailpost-detail'>
    <div className='detailpost-inform'>
      <div className='detailpost-item'>방장</div>
      <div className='detailpost-item'>맛집</div> 
      <div className='detailpost-item'>2002년 3월 11일 00:00분 </div>
      <div className='detailpost-item'>03/ 10명 </div>
    </div>
    <div className = "detailpost-description">본문sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss sssssssssssssssssss sssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssss</div>
  </div>
  <button className = "detailpost-button" onClick={handleJoinPost}>입장</button>
</div>
)
}

export default DetailPost