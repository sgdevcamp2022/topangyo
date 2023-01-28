import { useState } from 'react';
import axios from 'axios';
import '../../styles/SignUpPage.scss';

const SignUpForm = () => {

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

        axios.post('http://localhost:3500/auth/register', variables,
            {
                headers:{"Content-Type" : "application/json"}
            }
        )
        .then((response) => {
            console.log(response);
        })
        
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
                    placeholder = "ID"
                />
                <input 
                    onChange={handleChange} 
                    className="input-box" 
                    name="password" 
                    type="password" 
                    minLength={4} 
                    maxLength={20} 
                    placeholder = "PASSWORD"
                />
                <input 
                    onChange={handleChange}
                    className="input-box" 
                    name="name" 
                    type="text" 
                    minLength={1} 
                    maxLength={10} 
                    placeholder = "NAME"
                />
                <input 
                    onChange={handleChange} 
                    className="input-box" 
                    name="nickname" 
                    type="text" 
                    minLength={2} 
                    maxLength={10} 
                    placeholder = "NICKNAME"
                />
                <input 
                    onChange={handleChange} 
                    className="input-box" 
                    name="birth" 
                    type="date"
                />
                <input 
                    onChange={handleChange} 
                    className="input-box" 
                    name="email" 
                    type="email" 
                    minLength={4} 
                    maxLength={30}
                    placeholder="EMAIL (example@gmail.com)" 
                />
                <input 
                    onChange={handleChange} 
                    className="input-box" 
                    name ="phoneNumber" 
                    type = "number" 
                    placeholder="phone Number (01012345678)"
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
            <p className = "signInText">Already have an account? <span className = "signInWord">Sign In</span></p>
        </>
    );
}

export default SignUpForm;