import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';

import {  useHistory } from 'react-router'; 
import { userProfileAction_details } from './Reducers/actions/userActions';

import './ProfileDetails.css' ;
// import { set } from 'mongoose';

function ProfileDetails() {
    let history = useHistory()

    const [Name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const dispatch = useDispatch()

    const userProfileDetails = useSelector(state => state.userProfileDetails)
    const {loading,user,error} =userProfileDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin

    // if(!(typeof(userInfoR)=='undefined') && userInfoR!=='Invalid details')
    // console.log("info len:-",Object.keys(userInfoR).length);
    // else
    // console.log("info lenyo:-",userInfoR);

    
    useEffect(() => {
        //when getting request, userinfo becomes true as  userLoginRequest is called.
        //length==0 becomes when 1st time login pg is visited
        //invalid details is received when details don't match

        //if user dosen't hv login, direct him there
        if(!( !(typeof(userInfo)=='undefined') && userInfo.length!=0 && userInfo!=='Invalid details'))
        {
            history.push(`/login_brad`)
        }

        else
        {
            //Q.use??...brad says:- if no user , dispatch userProfileAction..it means fetch user from database & then else part is entered where name,email is set
            console.log("USER NAME b4 if",user);
        //  if(!(typeof(user)=='undefined') && !user.name)
                {
                    console.log("userProfile b4");
                    dispatch(userProfileAction_details('profile'))
                    console.log("userProfile a4");
                }
             //Q.use??...brad says:- if we hv user, set email, name..not pass   
            // else
            {
                
                // setName(user.name)
                // setEmail(user.email)
            }
            // if(!(typeof(user)=='undefined'))
            // {
            //     setName(user.name)
            //     setEmail(user.email)
            //     console.log("USER NAME a4 if",user)
            // }
            
        }
    }, [dispatch,history,userInfo])

    useEffect(() => {

        if(!(typeof(user)=='undefined'))
        {
            setName(user.name)
            setEmail(user.email)
            console.log("USER NAME a4 if",user)
        }
       
    }, [user])

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
            // dispatch(userRegisterAction_details(Name,email,password))
               const userData={
                   "Name":Name, //Lhs as mentioned in postman api tezting or in routes-->exercise_route.js . Name as mentioned as in router.post function
                    "email":email,
                    "password":password,
                    "confirmPassword":confirmPassword
                }

                const config={
                    headers:{
                        'Content-Type':"application/json",
                        Authorization:`Bearer ${userInfo.token}`
                    }
                }

            axios.put(`http://localhost:4000/login_brad/profile`,userData,config)
             .then(res => console.log(res.data))

             console.log("data filled");

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

        //  setName('')
        //  setEmail('')
        //  setPassword('')
        //  setconfirmPassword('')
        
    }

    // setName(user.name)
    // setEmail(user.email)
    // if(!(typeof(user)=='undefined'))
    // {
    //     setName(user.name)
    //     setEmail(user.email)
    // }
    console.log("b4 return",user);
    return (
        <div className="register">
            <Link to="/">
                {/* <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/> */}
                <img className="logo" src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>

            </Link>

            <div className="registration_details">
                {/* <form> */}
                <h1 className="heading">Profile</h1>
                
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
                

                <button className="create_acc" onClick={submit_form} >Update</button>
                
                {/* </form> */}
            </div>

        </div>
    )
}

export default ProfileDetails
