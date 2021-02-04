import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css' ;

function Login() {
    return (
        <div className="login">
            <Link to="/">
                <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/>
            </Link>

            <div className="login_details">
                {/* <form> */}
                <h1 className="heading">Login</h1>
                
               
                <h2>Email</h2>
                <input placeholder="Enter Email"/>
                
                <h2>Password</h2>
                <input placeholder="Enter Password"/>

                <Link to="/">
                     <button className="login_button">Login</button>
                </Link>
                {/* </form> */}
            </div>

        </div>
    )
}

export default Login
