import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';

import {  useHistory } from 'react-router'; 
import { userAction_details } from './Reducers/actions/userActions';


import './Login.css' ;

function Login_brad() {
    let history = useHistory()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [boolpg, setboolpg] = useState(0); //success or fail
   

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading,userInfo,error} =userLogin

    const redirect=`/`
    // console.log("USERINFO:-",typeof(userInfo)=='undefined',userInfo,userLogin);
    // if(!(typeof(userInfo)=='undefined') && userInfo!=='Invalid details')
    // console.log("info len:-",Object.keys(userInfo).length);
    // else
    // console.log("info lenyo:-",userInfo);

    useEffect(() => {
        //when getting request, userinfo becomes true as  userLoginRequest is called.
        //length==0 becomes when 1st time login pg is visited
        //invalid details is received when details don't match

        //if user is logged in  direct to home page..not working when aftr login  i type login_brad url, everything gets refreshed
        if( !(typeof(userInfo)=='undefined') && userInfo.length!=0 && userInfo!=='Invalid details')
        {
            console.log("Login useeffect, redirect");
            history.push(redirect)
        }
    }, [history,userInfo,redirect])


    const onEmail=(e)=> 
    { 
        setEmail(e.target.value)
    }
    const onPassword=(e)=> 
    { 
        setPassword(e.target.value)
    }
    
    const submit_form=(e)=>
    {
        e.preventDefault()

        dispatch(userAction_details(email,password))

        // console.log(email,password);

        // const login_data=
        // {
        //     "email":email,
        //     "password":password
        // }

        // axios.post(`http://localhost:4000/login_brad/add`,login_data)
        //  .then((res) => 
        //   {
        //     // setresult(res.data)
        //     console.log("Dtat is:",res.data);

        //     // if(res.data=="Success")
        //     // {
        //     //   setboolpg(1)
        //     // //   console.log("Jeet gaya",boolpg);

        //     // }

        //   })

         setEmail('')
         setPassword('')
    }

    // if(boolpg==0)
    // {
        return (
            <div className="login">
                <Link to="/">
                    {/* <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/> */}
                    <img className="logo" src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>
    
                </Link>
    
                <div className="login_details">
                    {/* <form> */}
                    <h1 className="heading">Login</h1>
                    
                   {(userInfo=="Invalid details" || error) && <h2>Error</h2>}
                {loading && <h2>Loading</h2>}

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

    // }

    // else
    // {

    //     return (
    //         <div>
    //              <Redirect to="/" /> 
    //         </ div>
    //      )
    // }
    
}

export default Login_brad
