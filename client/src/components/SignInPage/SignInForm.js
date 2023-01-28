import '../../styles/SignInPage.scss';

const SignInForm = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('로그인 제출 완료!');
    }

    return (
        <>
            <h1>동세권</h1>
            <form className="login-box" onSubmit={handleSubmit}>
                <input className="input-box" name="id" type="text" required minLength={4} maxLength={30} placeholder = "ID"/>
                <input className="input-box" name="password" type="password" required minLength={4} maxLength={30} placeholder = "PASSWORD"/>
                <button type='submit'>Log in</button>
            </form>
            <p className = "signUpText">Don't have an account? <span className = "signUpWord">Sign Up</span></p>
            <p className = "forgotPassWordText">forgot Password?</p>
        </>
    )
}

export default SignInForm