import React from 'react'
import '../../styles/AccountPage.scss'

const Profile = () => {
  return (
    <div className='profile-box'>
        <div className='profile-account'>
            <img alt='userImage' className='profile-user-image' src='images/user/user_image.png' />

            <div className='profile-user-box'>
                <h4 className='profile-user-nickname'>NickName</h4>
                <h5 className='profile-user-about'>연령대 / 성별</h5>
            </div>
        </div>
        {/* 나에게만 보여지는 버튼 */}
        <button className='profile-edit-btn'>회원 정보 수정</button>
    </div>
  )
}

export default Profile