import React from 'react'

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
<div
    style={{
        position : 'absolute',
        zIndex : '100',
        backgroundColor : 'white',
        padding:'20px',
        top : '50%',
        left : '50%',
        transform:`translate(-50%, -50%)`
    }}
>
    <h3>모집 글 상세</h3>
    <h3>제목</h3>
    <h3>방 정보</h3>
    <h3>본문</h3>
    <button onClick={handleCloseModal}>닫기</button>
    <button onClick={handleJoinPost}>입장</button>
</div>
)
}

export default DetailPost