import React from 'react'

const WritePost = ({setIsWriteModal, isWriteModal}) => {

    const handleCloseModal = () => {
        setIsWriteModal(!isWriteModal);
        
    }

    const handleCreatePost = () => {
        console.log('모집글 생성');
    }

  return (
    <div
        style={{
            position : 'absolute',
            maxWidth : '400px',
            zIndex : '20',
            backgroundColor : 'white',
            padding:'20px',
            top : '50%',
            left : '50%',
            transform:`translate(-50%, -50%)`
        }}
    >
        <h3>모집 글 작성</h3>
        <input className="input-box" type='text' name='title' placeholder='제목' />
        <input className="input-box" type='number' max='6' min='2' name='limit' placeholder='제한인원' />
        <input className="input-box" type='date' name='date' placeholder='만남날짜' />
        <input className="input-box" type='time' name='time' placeholder='만남시간' />
        <textarea className="input-box" name='description' placeholder='본문' />
        <button onClick={handleCloseModal}>닫기</button>
        <button onClick={handleCreatePost}>생성</button>
    </div>
  )
}

export default WritePost