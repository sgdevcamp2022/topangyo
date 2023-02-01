import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { changeToken } from '../../store/store';
import '../../styles/SignInPage.scss';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const navigate = useNavigate();
    const myStorage = sessionStorage;
    const dispatch = useDispatch();


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

    const postFetch = async (variables) => {
        try {
            const result = await axios.post('http://localhost:3500/auth/login', variables);
            const token = result.data.accessToken;
            dispatch(changeToken(token))
            myStorage.setItem('access-token', token);
            //다음 axios 동작 시 헤더에 기본으로 token을 붙여 보낸다.
            axios.defaults.headers.common['access-token'] = token;
            navigate('/');
        } catch(err) {
            alert(err.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const variables = {
            id : loginUser.id,
            password : loginUser.password
        }

        postFetch(variables)
    }

    return (
        <>
            <h1>동세권</h1>
            <form className="login-box" onSubmit={handleSubmit}>
                <input onChange={handleChange} className="input-box" name="id" type="text" required minLength={4} maxLength={30} placeholder = "ID"/>
                <input onChange={handleChange} className="input-box" name="password" type="password" required minLength={4} maxLength={30} placeholder = "PASSWORD"/>
                <button type='submit'>Log in</button>
            </form>
            <p className = "signUpText">Don't have an account? <span className = "signUpWord">Sign Up</span></p>
            <p className = "forgotPassWordText">forgot Password?</p>
        </>
    )
}

export default SignInForm