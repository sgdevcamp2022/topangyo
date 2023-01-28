import { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import '../../styles/SignInPage.scss';

const SignInForm = () => {

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

        axios.post('http://localhost:3500/auth/login', variables)
        .then((response) => {
            const token = response.data.accessToken;
            const decode = jwt_decode(token);
            console.log(decode);
        })
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