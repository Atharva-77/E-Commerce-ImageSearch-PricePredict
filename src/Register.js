import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';

import {  useHistory } from 'react-router'; 
import { userAction_details } from './Reducers/actions/userActions';

import './Register.css' ;
// import { set } from 'mongoose';

function Register() {
    let history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading,userInfo,error} =userLogin

    const redirect=`/`
    console.log("USERINFO:-",(userInfo.length));
    useEffect(() => {
        if(userInfo.length!=0)
        {
            history.push(redirect)
        }
    }, [history,userInfo,redirect])

    const onName=(e)=> 
    { 
        setName(e.target.value)
    }
    const onEmail=(e)=> 
    { 
        setEmail(e.target.value)
    }
    const onPassword=(e)=> 
    { 
        setPassword(e.target.value)
    }
    const onconfirmPassword=(e)=> 
    { 
        setconfirmPassword(e.target.value)
    }
    
    const submit_form=()=>
    {
        dispatch(userAction_details(email,password))

        const userData={
            "Name":name, //Lhs as mentioned in postman api tezting or in routes-->exercise_route.js . Name as mentioned as in router.post function
            "email":email,
            "password":password,
            "confirmPassword":confirmPassword
        }

        axios.post(`http://localhost:4000/register_brad/add`,userData)
         .then(res => console.log(res.data))

         setName('')
         setEmail('')
         setPassword('')
         setconfirmPassword('')
        
    }

    return (
        <div className="register">
            <Link to="/">
                {/* <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/> */}
                <img className="logo" src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>

            </Link>

            <div className="registration_details">
                {/* <form> */}
                <h1 className="heading">Register</h1>
                
                {error}
                {loading && <h2>Loading</h2>}
                <h2>Your Name</h2>
                <input value={name} onChange={onName} placeholder="Enter Full Name"/>
                
                <h2>Email</h2>
                <input value={email} onChange={onEmail} placeholder="Enter Email"/>
                
                <h2>Password</h2>
                <input type="password" value={password} onChange={onPassword} placeholder="Enter Password"/>

                <h2>Confirm Password</h2>
                <input type="password" value={confirmPassword} onChange={onconfirmPassword} placeholder="Re-Enter Password"/>
                

                <button className="create_acc" onClick={submit_form} >Create Your Account</button>
                <h3>OR</h3>

                <Link to="/login" style={{ textDecoration: 'none' }}>
                     <button className="login" >Login</button>
                </Link>
                {/* </form> */}
            </div>

        </div>
    )
}

export default Register
