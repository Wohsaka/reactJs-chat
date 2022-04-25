const Login = (props) => {
    return (
        <>
        <h1>Login to <span>Chat</span></h1>
        <h4>Fill in the form below to access.</h4>
        <form onSubmit={props.handleSubmit}>
            <input type='email' placeholder='Email' name='Email' value={props.email} onChange={(e) => {props.setEmail(e.target.value)}} ></input>
            <input id='password' type='password' placeholder='Password' name='Password' value={props.password} onChange={(e) => {props.setPassword(e.target.value)}}></input>
            <button type='submit'>Login</button>
            <hr></hr>
        </form>
        <h5>Don't have an account? <span className='switch' onClick={props.handleSwitch}>SignUp</span></h5>
        </>
    )
}

export default Login