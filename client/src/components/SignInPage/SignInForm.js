import '../../styles/SignInPage.scss';

const SignInForm = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('제출 완료!');
    }

    return (
        <form className="login-box" onSubmit={handleSubmit}>
            <input className="input-box" name="id" type="text" required minLength={4} maxLength={30}/>
            <input className="input-box" name="password" type="password" required minLength={4} maxLength={30}/>
            <button type='submit'>Log in</button>
        </form>
    )
}

export default SignInForm