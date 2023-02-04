import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ChangeAccountPage = () => {
  const user = useSelector((state) => state.user);
  const [nickname, setNickname] = useState(user.nickname);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeAccount = () => {
    navigate('/account');
  }
  
  const onChangeText = (e) => {
    e.preventDefault();
    setNickname(e.target.value);
  }

  return (
    <div className='container-col align-center'>
      <div className='profile-user-box'>
        <input type="text" onChange={onChangeText} value={nickname} />
        <h4 className='profile-user-nickname'>{user.nickname}</h4>
        <h5 className='profile-user-about'>{user.birth} / { user.gender == 1 ? '남' : '여'}</h5>
        <h5 className='profile-user-about'>가입 일자 : {user.createdAt.split('T')[0] }</h5>
        <h5 className='profile-user-about'>정보 수정 일자 : {user.updatedAt.split('T')[0] }</h5>
      </div>
      <button onClick={onChangeAccount}>완료!</button>
    </div>
  )
}

export default ChangeAccountPage