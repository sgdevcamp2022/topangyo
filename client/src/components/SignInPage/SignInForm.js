import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/slice/userslice';
import '../../styles/SignInPage.scss';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const navigate = useNavigate();
    const myStorage = localStorage;
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
            if(result.data === '') {
                throw new SyntaxError('존재하지 않는 사용자');
            }
            const token = result.data.accessToken;
            dispatch(setToken(token));
            myStorage.setItem('AccessToken', token);
            const myToken = myStorage.getItem('AccessToken');
            if(myToken) {
                axios.defaults.headers.common['Authorization'] = myToken;
                navigate('/');
            }
        } catch(err) {
            if(err instanceof SyntaxError) {
                alert(err.message);
            }
            switch (err.response.status) {
                case 400:
                    alert('잘못된 요청');
                    break;
                case 403:
                    alert('권한없음');
                    break;
                case 500:
                    alert('아이디 또는 비밀번호 틀림');
                    break;
                default:
                    alert(err);
                    break;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const variables = {
            id : loginUser.id,
            password : loginUser.password
        }
        postFetch(variables);
    }

    const onChangeSignup = (e) => {
        e.preventDefault();
        navigate('/signup');
    }

    return (
        <div class = "signin">
            <div className='sigin-long-title'>우리 동네 세권</div>
            <div className='signin-title'>동세권</div>
            <form className="login-box" onSubmit={handleSubmit}>
                <input onChange={handleChange} className="input-box" name="id" type="text" required minLength={4} maxLength={30} placeholder = "ID"/>
                <input onChange={handleChange} className="input-box" name="password" type="password" required minLength={4} maxLength={30} placeholder = "PASSWORD"/>
                <button type='submit' className = "logbutton">Log in</button>
            </form>
            <div>
            <p className = "signup-text">Don't have an account? <button className = "signup-word" onClick={onChangeSignup}>Sign Up</button></p>
            </div>
            <p className = "forgotPassWordText">forgot Password?</p>
        </div>
    )
}

export default SignInForm