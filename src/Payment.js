import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';

import { useDispatch,useSelector } from 'react-redux';

import {  useHistory } from 'react-router'; 

import {  paymentMethodAction } from './Reducers/actions/cartActions';

import './Payment.css' ;
// import { set } from 'mongoose';

function Payment() {
    let history = useHistory()


    const dispatch = useDispatch()

    const cartList = useSelector(state => state.cartList)
    const {shippingAddr} =cartList 
    // console.log("Shipping ADDR",shippingAddr,Object.keys(shippingAddr).length,typeof(shippingAddr)=='undefined') 

    const [paymentMethod, setPaymentMethod] = useState('Paypal')
  
    // const redirect=`/`
    if((Object.keys(shippingAddr).length)==0)
        history.push('/shipping')
        // console.log("Ship if len:-",Object.keys(shippingAddr).length);
    else
    console.log("Ship else len:-",shippingAddr);

    
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

    // const onAddress=(e)=> 
    // { 
    //     setAddress(e.target.value)
    // }
    // const onCity=(e)=> 
    // { 
    //     setCity(e.target.value)
    // }
    // const onPostalCode=(e)=> 
    // { 
    //     setPostalCode(e.target.value)
    // }
    // const onCountry=(e)=> 
    // { 
    //     setCountry(e.target.value)
    // }
    
    const submit_form=()=>
    {
        dispatch(paymentMethodAction(paymentMethod))
        history.push('/placeorder')
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
        <div className="payment">
            <Link to="/">
                {/* <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/> */}
                <img className="logo" src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>

            </Link>

            <div className="registration_details">
                {/* <form> */}
                <h1 className="heading">Payment</h1>
                
                {/* {error}
                {loading && <h2>Loading</h2>} */}

                {/* <h2>Address</h2> */}
                {/* <input value={address} onChange={onAddress} placeholder="Enter Full Name"/> */}
                <p>
                    <input type="radio" 
                            id="paypal1" //id same value as in label
                            name="paymentmeth" // only 1 frm this name is selected when submitted.Hence all have same name
                            value="Paypal" // This value is submitted when form submitted
                            onChange={(e)=>setPaymentMethod(e.target.value)}
                            className="payment_radio_button" />

                    <label for="paypal1" className="payment_label">PAYPAL</label><br />
                </p>
                <br />
                        
                        {/* See here https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_type_radio */}


{/* ANOTHER PAYMENT METHOD */}
{/*                  
                <input type="radio" 
                       id="stripe1" 
                       name="paymentmeth" 
                       value="Stripe" 
                       onChange={(e)=>setPaymentMethod(e.target.value)}
                       /> 

                    <label for="stripe1">STRIPE</label>*/}
                

                <button className="create_acc" onClick={submit_form} >Continue</button> 

                
                {/* </form> */}
            </div>

        </div>
    )
}

export default Payment
