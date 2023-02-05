import React from 'react'

const MatchingPost = ({isDetailModal, setIsDetailModal}) => {
    const handleOpenModal = () => {
        setIsDetailModal(!isDetailModal);
    }
        
    return (
    <a className="postCard" onClick={handleOpenModal} style={{
        backgroundColor : 'gray'
    }}>
        <p className="postTitle">모집글 제목  모집상태</p> 
        <p>모집정보</p>
        <p>현재인원 / 모집인원</p>
        <p>만남시간</p>
    </a>
    )
}

export default MatchingPost