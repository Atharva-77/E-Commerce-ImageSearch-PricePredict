import React from 'react'
import './Register.css' 

function Register() {
    return (
        <div className="register">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/>

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

                <button className="login">Login</button>
                {/* </form> */}
            </div>

        </div>
    )
}

export default Register
