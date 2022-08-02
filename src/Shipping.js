import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';

import { useDispatch,useSelector } from 'react-redux';

import {  useHistory } from 'react-router'; 

import {  saveShippingAddressAction } from './Reducers/actions/cartActions';

import './Shipping.css' ;
// import { set } from 'mongoose';

function Shipping() {
    let history = useHistory()


    const dispatch = useDispatch()

    const cartList = useSelector(state => state.cartList)
    const {shippingAddr} =cartList  

    const [address, setAddress] = useState(shippingAddr.address)
    const [city, setCity] = useState(shippingAddr.city);
    const [postalCode, setPostalCode] = useState(shippingAddr.postalCode);
    const [country, setCountry] = useState(shippingAddr.country);

    // const redirect=`/`
    // if(!(typeof(userInfoR)=='undefined') && userInfoR!=='Invalid details')
    // console.log("info len:-",Object.keys(userInfoR).length);
    // else
    // console.log("info lenyo:-",userInfoR);

    
    // useEffect(() => {
    //     //when getting request, userinfo becomes true as  userLoginRequest is called.
    //     //length==0 becomes when 1st time login pg is visited
    //     //invalid details is received when details don't match
    //     //if user is logged in  direct to home page
    //     if( !(typeof(userInfoR)=='undefined') && userInfoR.length!=0 && userInfoR!=='Invalid details')
    //     {
    //         history.push(redirect)
    //     }
    // }, [history,userInfoR,redirect])

    const onAddress=(e)=> 
    { 
        setAddress(e.target.value)
    }
    const onCity=(e)=> 
    { 
        setCity(e.target.value)
    }
    const onPostalCode=(e)=> 
    { 
        setPostalCode(e.target.value)
    }
    const onCountry=(e)=> 
    { 
        setCountry(e.target.value)
    }
    
    const submit_form=()=>
    {
        dispatch(saveShippingAddressAction({address,city,postalCode,country}))
        history.push('/payment')
        // if(password!==confirmPassword)
        // {
        //     console.log("Pass not matching");
        // }
        // // else
        // {
        //     console.log("b4 reg actions");
        //     // dispatch(userRegisterAction_details(Name,email,password))
        //     console.log("a4 reg actions");

        // }
       
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

    return (
        <div className="register">
            <Link to="/">
                {/* <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/> */}
                <img className="logo" src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>

            </Link>

            <div className="registration_details">
                {/* <form> */}
                <h1 className="heading">Shipping</h1>
                
                {/* {error}
                {loading && <h2>Loading</h2>} */}

                <h2>Address</h2>
                <input value={address} onChange={onAddress} placeholder="Enter Full Name"/>
                
                <h2>City</h2>
                <input value={city} onChange={onCity} placeholder="Enter City"/>
                
                <h2>Postal Code</h2>
                <input type="text" value={postalCode} onChange={onPostalCode} placeholder="Enter PostalCode"/>

                <h2>Country</h2>
                <input type="text" value={country} onChange={onCountry} placeholder="Enter Country"/>
                

                <button className="create_acc" onClick={submit_form} >Continue</button>

                
                {/* </form> */}
            </div>

        </div>
    )
}

export default Shipping
