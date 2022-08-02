import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';

import {  useHistory } from 'react-router'; 
import { userAction_details, userRegisterAction_details } from './Reducers/actions/userActions';

import './Register.css' ;
// import { set } from 'mongoose';

function Register() {
    let history = useHistory()

    const [Name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading,userInfoR,error} =userRegister

    const redirect=`/`
    if(!(typeof(userInfoR)=='undefined') && userInfoR!=='Invalid details')
    console.log("info len:-",Object.keys(userInfoR).length);
    else
    console.log("info lenyo:-",userInfoR);

    
    useEffect(() => {
        //when getting request, userinfo becomes true as  userLoginRequest is called.
        //length==0 becomes when 1st time login pg is visited
        //invalid details is received when details don't match
        //if user is logged in  direct to home page
        if( !(typeof(userInfoR)=='undefined') && userInfoR.length!=0 && userInfoR!=='Invalid details')
        {
            history.push(redirect)
        }
    }, [history,userInfoR,redirect])

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
        if(password!==confirmPassword)
        {
            console.log("Pass not matching");
        }
        else
        {
            console.log("b4 reg actions");
            dispatch(userRegisterAction_details(Name,email,password))
            console.log("a4 reg actions");

        }
       
        // const userData={
        //     "Name":name, //Lhs as mentioned in postman api tezting or in routes-->exercise_route.js . Name as mentioned as in router.post function
        //     "email":email,
        //     "password":password,
        //     "confirmPassword":confirmPassword
        // }

        // axios.post(`http://localhost:4000/register_brad/add`,userData)
        //  .then(res => console.log(res.data))

        //  dispatch(userAction_details(email,password))

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
                
                {/* {error}
                {loading && <h2>Loading</h2>} */}

                <h2>Your Name</h2>
                <input value={Name} onChange={onName} placeholder="Enter Full Name"/>
                
                <h2>Email</h2>
                <input value={email} onChange={onEmail} placeholder="Enter Email"/>
                
                <h2>Password</h2>
                <input type="password" value={password} onChange={onPassword} placeholder="Enter Password"/>

                <h2>Confirm Password</h2>
                <input type="password" value={confirmPassword} onChange={onconfirmPassword} placeholder="Re-Enter Password"/>
                

                <button className="create_acc" onClick={submit_form} >Create Your Account</button>
                <h3>OR</h3>

                <Link to="/login_brad" style={{ textDecoration: 'none' }}>
                     <button className="login" >Login</button>
                </Link>
                {/* </form> */}
            </div>

        </div>
    )
}

export default Register
