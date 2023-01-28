const SignUpForm = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('회원가입 제출 완료!');
    }

	return(
        <>
            <form className="signUp-box" onSubmit={handleSubmit}>
                <input className="input-box" name="id" type="text" required minLength={4} maxLength={30} placeholder = "ID"/>
                <input className="input-box" name="password" type="password" required minLength={4} maxLength={30} placeholder = "PASSWORD"/>
                <input className="input-box" name="name" type="text" required minLength={4} maxLength={10} placeholder = "NAME"/>
                <input className="input-box" name="nickname" type="text" required minLength={4} maxLength={10} placeholder = "NICKNAME"/>
                <input className="input-box" name="birth" type="date"/>
                <input className="input-box" name="email" type="email"  placeholder="example@gmail.com" required/>
                <input className="input-box" name ="phone" type = "number" placeholder="phone Number"/>
                <input type='radio' name='gender' value='1' />남
                <input type='radio' name='gender' value='2' />여
                <button type='submit'>Sign Up</button>
            </form>
            <p className = "signUpText">Already have an account? <span className = "signUpWord">Sign In</span></p>
        </>
    );
}

export default SignUpForm;