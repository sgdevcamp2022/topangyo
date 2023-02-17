import React from 'react'
import './../../styles/WritePost.scss';

const WritePost = ({setIsWriteModal, isWriteModal}) => {

    const handleCloseModal = () => {
        setIsWriteModal(!isWriteModal);
        
    }

    const handleCreatePost = () => {
        console.log('모집글 생성');
    }

  return (
    <div className = "writepost-container">
        <div className='writepost-title'>
          모집글 작성
          <button className = "x" onClick={handleCloseModal}><img className = "x-img" src = {process.env.PUBLIC_URL + '/images/close.png'} ></img></button>
        </div>
        <hr id = "writepost-line"/>
        <input className="input-box" type='text' name='title' placeholder='제목' />
        <input className="input-box" type='number' max='6' min='2' name='limit' placeholder='제한인원' />
        <input className="input-box" type='date' name='date' placeholder='만남날짜' />
        <input className="input-box" type='time' name='time' placeholder='만남시간' />
        <textarea className="input-box description" name='description' placeholder='본문' />
        <button className = "writepost-button" onClick={handleCreatePost}>생성</button>
    </div>
  )
}

export default WritePost