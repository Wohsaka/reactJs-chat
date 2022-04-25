const SignUp = (props) => {
    return (
        <>
        <h1>SignUp to <span>Chat</span></h1>
        <h4>Fill in the form below to create an account.</h4>
        <form onSubmit={props.handleSubmit}>
            <input type='text' placeholder='Username' name='Username' value={props.nickName} onChange={(e) => {props.setNickName(e.target.value)}}></input>
            <input type='email' placeholder='Email' name='Email' value={props.email} onChange={(e) => {props.setEmail(e.target.value)}} ></input>
            <input id='passwordInput' type='password' placeholder='Password' name='Password' value={props.password} onChange={(e) => {props.setPassword(e.target.value)}}></input>
            <span className='info' id='passwordInfo'>Password must be alphanumeric only.</span>
            <button type='submit'>SignUp</button>
            <hr></hr>
        </form>
        <h5>Already have an account? <span className='switch' onClick={props.handleSwitch}>Login</span></h5>
        </>
    )
}

export default SignUp