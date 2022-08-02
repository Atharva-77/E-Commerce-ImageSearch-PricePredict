import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import {  useHistory } from 'react-router'; 

import './Admin_EditUser.css' ;

function Admin_EditUser() {
    let history = useHistory()
    const {id}=useParams()

    const [Name, setName] = useState('')
    const [email, setEmail] = useState('');


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin


    
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
                    console.log("userProfile b4");

                    const config={
                        headers:{
                            'Content-Type':"application/json",
                            Authorization:`Bearer ${userInfo.token}`
                        }
                    }
                    axios.get(`http://localhost:4000/login_brad/admin/profile/${id}`,config)
                    .then(res=>
                        {
                            console.log("RES.DATA ",res.data);
                            setName(res.data.name)
                            setEmail(res.data.email)
                            console.log(email);
                        })
            
        }

    }, [history,userInfo])


    const onName=(e)=> 
    { 
        setName(e.target.value)
    }
    const onEmail=(e)=> 
    { 
        setEmail(e.target.value)
    }
    
    
    const submit_form=()=>
    {
               const userData={
                   "Name":Name, //Lhs as mentioned in postman api tezting or in routes-->exercise_route.js . Name as mentioned as in router.post function
                    "email":email,
                    
                }

                const config={
                    headers:{
                        'Content-Type':"application/json",
                        Authorization:`Bearer ${userInfo.token}`
                    }
                }

            axios.put(`http://localhost:4000/login_brad/admin/profile/${id}`,userData,config)
             .then(res => console.log("UPDTED ADMIN",res.data))


        
    }

   
    return (
        <div className="register">
            <Link to="/">
                <img className="logo" src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>

            </Link>

            <div className="registration_details">
                {/* <form> */}
                <h1 className="heading">Profile-admin</h1>
                
                {/* {error}
                {loading && <h2>Loading</h2>} */}

                <h2>Your Name</h2>
                <input value={Name} onChange={onName} placeholder="Enter Full Name"/>
                
                <h2>Email</h2>
                <input value={email} onChange={onEmail} placeholder="Enter Email"/>
                

                <button className="create_acc" onClick={submit_form} >Update</button>
                
                {/* </form> */}
            </div>

         

        </div>
    )
}

export default Admin_EditUser
