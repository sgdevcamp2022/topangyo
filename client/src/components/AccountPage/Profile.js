import React from 'react'
import '../../styles/AccountPage.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleChangeAccount = () => {
    navigate('/account/change');
  }

  return (
    <div className='profile-box'>
        <div className='profile-account'>
            <img alt='userImage' className='profile-user-image' src='images/user/user_image.png' />

            <div className='profile-user-box'>
                <h4 className='profile-user-nickname'>{user.nickname}</h4>
                <h4 className='profile-user-nickname'>{user.name}</h4>
                <h5 className='profile-user-about'>{user.birth} / {user.gender=== 1?'남':'여'}</h5>
                <h5 className='profile-user-about'>가입 일자 : {user.createdAt.split('T')[0] }</h5>
                <h5 className='profile-user-about'>최근 접속 일자 : {user.updatedAt.split('T')[0]}</h5>
            </div>
        </div>
        <button className='profile-edit-btn' onClick={handleChangeAccount}>회원 정보 수정</button>
    </div>
  )
}

export default Profile