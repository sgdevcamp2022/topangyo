import '../../styles/SignUpPage.scss';

const SignUpForm = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('회원가입 제출 완료!');
    }

	return(
        <>
            <form className="signup-box" onSubmit={handleSubmit}>
                <input className="input-box" name="id" type="text" required minLength={4} maxLength={30} placeholder = "ID"/>
                <input className="input-box" name="password" type="password" required minLength={4} maxLength={30} placeholder = "PASSWORD"/>
                <input className="input-box" name="name" type="text" required minLength={4} maxLength={10} placeholder = "NAME"/>
                <input className="input-box" name="nickname" type="text" required minLength={4} maxLength={10} placeholder = "NICKNAME"/>
                <input className="input-box" name="birth" type="date"/>
                <input className="input-box" name="email" type="email"  placeholder="EMAIL (example@gmail.com)" required minLength={4} maxLength={30} required/>
                <input className="input-box" name ="phone" type = "number" placeholder="phone Number"/>
                <form className='gender-box'>
                <input type='radio' name='gender' value='1' checked/>남
                <input type='radio' name='gender' value='2' />여
                </form>
                <button type='submit' name='button'>Sign Up</button>
            </form>
            <p className = "signUpText">Already have an account? <span className = "signUpWord">Sign In</span></p>
        </>
    );
}

export default SignUpForm;