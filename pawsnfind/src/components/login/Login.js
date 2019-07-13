import React from 'react';

const Login = props => {
    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={props.auth.login}>Login</button>
        </div>
    )
}

export default Login;