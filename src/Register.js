import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css' ;

function Register() {
    return (
        <div className="register">
            <Link to="/">
                <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/>
            </Link>

            <div className="registration_details">
                {/* <form> */}
                <h1 className="heading">Register</h1>
                
                <h2>Your Name</h2>
                <input placeholder="Enter Full Name"/>
                
                <h2>Email</h2>
                <input placeholder="Enter Email"/>
                
                <h2>Password</h2>
                <input placeholder="Enter Password"/>
                

                <button className="create_acc">Create Your Amazon Account</button>
                <h3>OR</h3>

                <Link to="/login" style={{ textDecoration: 'none' }}>
                     <button className="login">Login</button>
                </Link>
                {/* </form> */}
            </div>

        </div>
    )
}

export default Register
