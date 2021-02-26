import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'


import './Login.css' ;

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [boolpg, setboolpg] = useState(0); //success or fail

    const onEmail=(e)=> 
    { 
        setEmail(e.target.value)
    }
    const onPassword=(e)=> 
    { 
        setPassword(e.target.value)
    }
    
    const submit_form=()=>
    {
        console.log(email,password);

        const login_data=
        {
            "email":email,
            "password":password
        }

        axios.post(`http://localhost:4000/login_be`,login_data)
         .then((res) => 
          {
            // setresult(res.data)
            console.log(1,res.data);

            if(res.data=="Success")
            {
              setboolpg(1)
            //   console.log("Jeet gaya",boolpg);

            }
            else
            {
            //   console.log("Haar gaya");
            }
          })

         setEmail('')
         setPassword('')
    }

    if(boolpg==0)
    {
        return (
            <div className="login">
                <Link to="/">
                    {/* <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/> */}
                    <img className="logo" src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>
    
                </Link>
    
                <div className="login_details">
                    {/* <form> */}
                    <h1 className="heading">Login</h1>
                    
                   
                    <h2>Email</h2>
                    <input value={email} onChange={onEmail} placeholder="Enter Email"/>
                    
                    <h2>Password</h2>
                    <input type="password" value={password} onChange={onPassword} placeholder="Enter Password"/>
    
                    {/* <Link to="/"> */}
                         <button className="login_button" onClick={submit_form}>Login</button>
                    {/* </Link> */}
                    {/* </form> */}
                </div>
    
            </div>
        )

    }

    else
    {

        return (
            <div>
                 <Redirect to="/" /> 
            </ div>
         )
    }
    
}

export default Login
