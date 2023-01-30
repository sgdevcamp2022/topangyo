import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { changeGender, changeId, changeNickname, changeToken } from '../../store/store';
import '../../styles/SignInPage.scss';

const SignInForm = () => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const [loginUser, setLoginUser] = useState({
        id : "",
        password : ""
    })

    const handleChange = (e) => {
        setLoginUser({
            ...loginUser,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const variables = {
            id : loginUser.id,
            password : loginUser.password
        }
        
        

        //Mock data용
        axios.get('http://localhost:3000/data/sample.json')
        .then((response) => {
            const token = response.data.accessToken;
            dispatch(changeToken(token))

            const decode = jwt_decode(token);
            dispatch(changeId(decode.userInfo.id));
            dispatch(changeNickname(decode.userInfo.nickname));
            dispatch(changeGender(decode.userInfo.gender));
        })
        

        //server용
        // axios.post('http://localhost:3500/auth/login', variables)
        // .then((response) => {
        //     const token = response.data.accessToken;
        //     dispatch(changeToken(token))

        //     const decode = jwt_decode(token);
        //     dispatch(changeId(decode.userInfo.id));
        //     dispatch(changeNickname(decode.userInfo.nickname));
        //     dispatch(changeGender(decode.userInfo.gender));
        // })
        // .catch((error) => {
        //     console.log(error.response.status);
        //     switch(error.response.status) {
        //         case 400:
        //             alert('입력한 input들의 type이 정확하지 않습니다');
        //             break;
        //         case 500:
        //             alert('아이디 또는 비밀번호가 일치하지 않습니다');
        //             break;
        //     }
        // })

    }

    return (
        <>
            <h1>동세권</h1>
            <form className="login-box" onSubmit={handleSubmit}>
                <input onChange={handleChange} className="input-box" name="id" type="text" required minLength={4} maxLength={30} placeholder = "ID"/>
                <input onChange={handleChange} className="input-box" name="password" type="password" required minLength={4} maxLength={30} placeholder = "PASSWORD"/>
                <button type='submit'>Log in</button>
                <div>{user.accessToken}</div>
                <div>{user.nickname}</div>
                <div>{user.id}</div>
                <div>{user.gender}</div>
            </form>
            <p className = "signUpText">Don't have an account? <span className = "signUpWord">Sign Up</span></p>
            <p className = "forgotPassWordText">forgot Password?</p>
        </>
    )
}

export default SignInForm