import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ChangeAccountPage = () => {
  const user = useSelector((state) => state.user);
  const [nickname, setNickname] = useState(user.nickname);
  const [name, setName] = useState(user.name);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeAccount = async () => {
    console.log(name, nickname);
    try {
      const variables = {
        id : user.id,
        password : user.password,
        name : name,
        nickname : nickname,
        birth : user.birth,
        email : user.email,
        phoneNumber : user.phoneNumber,
        gender : user.gender
      }

      const result = await axios.put(`http://localhost:3600/user/users`, variables);
      console.log(result);
      if(result) {
        navigate('/account');
      }
    } catch(err) {
      console.log(err);
    }
  }
  
  const onChangeNickname = (e) => {
    e.preventDefault();
    setNickname(e.target.value);
  }
  const onChangeName = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setName(e.target.value);
  }

  return (
    <div className='container-col align-center'>
      <div className='profile-user-box'>
        <h4>닉네임</h4><input className='input-box' type="text" onChange={onChangeNickname} value={nickname} />
        <h4>이름</h4><input className='input-box' type="text" onChange={onChangeName} value={name} />
        <h5 className='profile-user-about'>생년월일 : {user.birth}</h5>
        <h5 className='profile-user-about'>성별 : { user.gender === 1 ? '남' : '여'}</h5>
        <h5 className='profile-user-about'>가입 일자 : {user.createdAt.split('T')[0] }</h5>
        <h5 className='profile-user-about'>정보 수정 일자 : {user.updatedAt.split('T')[0] }</h5>
      </div>
      <button onClick={onChangeAccount}>완료!</button>
    </div>
  )
}

export default ChangeAccountPage