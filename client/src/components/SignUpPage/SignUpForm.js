import { useState } from 'react';
import axios from 'axios';
import '../../styles/SignUpPage.scss';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const navigate = useNavigate();

    //비밀번호 정규식(나중에 alert창 ui할 때 사용)
    //var pwCheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,20}$/;
    //var numCheck = /^\d{3}\d{4}\d{4}$/;

    const [registerUser, setRegisterUser] = useState({
        id : "",
        password : "",
        name : "",
        nickname : "",
        birth : "",
        email : "",
        phoneNumber : "",
        gender : 1,
    })

    const handleChange = (e) => {
        setRegisterUser({
            ...registerUser,
            [e.target.name] : e.target.value,
        })
    }

    const handleSignup = async (variables) => {
        try {
            const result = await axios.post('http://localhost:3500/auth/register', variables);
            if(result) {
                alert('생성 완료하였습니다!');
            }
            navigate('/signin');
        } catch(err) {
            switch(err.response.status) {
                case 409:
                    alert('중복된 아이디입니다');
                    break;
                case 500:
                    alert('요청 오류로 생성되지 않았습니다');
                    break;
                default:
                    alert('알 수 없는 오류가 발생하였습니다');
                    break;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const variables = {
            id : registerUser.id,
            password : registerUser.password,
            name : registerUser.name,
            nickname : registerUser.nickname,
            birth : registerUser.birth,
            email : registerUser.email,
            phoneNumber : registerUser.phoneNumber,
            gender : parseInt(registerUser.gender)
        }
        handleSignup(variables);
    }

	return(
        <>
            <form className="signup-box" onSubmit={handleSubmit}>
                <input 
                    onChange={handleChange} 
                    className="input-box" 
                    name="id" 
                    type="text" 
                    minLength={4} 
                    maxLength={20} 
                    placeholder="ID"
                    required
                />
                <input 
                    onChange={handleChange} 
                    className="input-box" 
                    name="password" 
                    type="password" 
                    minLength={4} 
                    maxLength={20} 
                    placeholder="PASSWORD"
                    pattern="^(?=.*[a-zA-Z])(?=.*[0-9]).{1,}$"
                    required
                />
                <input 
                    onChange={handleChange}
                    className="input-box" 
                    name="name" 
                    type="text" 
                    minLength={1} 
                    maxLength={10} 
                    placeholder="NAME"
                    required
                />
                <input 
                    onChange={handleChange} 
                    className="input-box" 
                    name="nickname" 
                    type="text" 
                    minLength={2} 
                    maxLength={10} 
                    placeholder="NICKNAME"
                    required
                />
                <input 
                    onChange={handleChange} 
                    className="input-box" 
                    name="birth" 
                    type="date"
                    required
                />
                <input 
                    onChange={handleChange} 
                    className="input-box" 
                    name="email" 
                    type="email" 
                    minLength={4} 
                    maxLength={30}
                    placeholder="EMAIL (example@gmail.com)" 
                    required
                />
                <input 
                    onChange={handleChange} 
                    className="input-box" 
                    name ="phoneNumber" 
                    type="tel"
                    placeholder="phone Number (01012345678)"
                    pattern='[0-9]{3}[0-9]{4}[0-9]{4}'
                    required
                />
                <>
                    <label htmlFor='men'>
                        <input 
                            onChange={handleChange} 
                            type='radio' 
                            id='men' 
                            name='gender' 
                            value="1"
                            defaultChecked
                        />
                        남자
                    </label>
                    <label htmlFor='women'>
                        <input 
                            onChange={handleChange} 
                            type='radio' 
                            id='women'
                            name='gender' 
                            value="2"
                        />
                        여자
                    </label>
                </>
                <button type='submit'>Sign Up</button>
            </form>
            <p className="signInText">Already have an account? <span className="signInWord">Sign In</span></p>
        </>
    );
}

export default SignUpForm;