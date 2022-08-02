import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import CheckoutProduct from './CheckoutProduct';

import {  useHistory } from 'react-router'; 
import { userAction_details, userRegisterAction_details } from './Reducers/actions/userActions';

import './PlaceOrder.css' ;

function PlaceOrder() {
    let summ=0;
    let shipping_price=0;
    let tax_price=0;
    let total_price=0;

    let history = useHistory()

    const [Name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const dispatch = useDispatch()

    const cartList = useSelector(state => state.cartList)
    const {basketItems}=cartList

    const redirect=`/`
    if(!(typeof(basketItems)=='undefined') && basketItems!=='Invalid details')
    console.log("info len:-",Object.keys(basketItems).length);
    else
    console.log("info lenyo:-",basketItems);

    
    // useEffect(() => {
    //     //when getting request, userinfo becomes true as  userLoginRequest is called.
    //     //length==0 becomes when 1st time login pg is visited
    //     //invalid details is received when details don't match
    //     //if user is logged in  direct to home page
    //     if( !(typeof(basketItems)=='undefined') && basketItems.length!=0 && basketItems!=='Invalid details')
    //     {
    //         history.push(redirect)
    //     }
    // }, [history,basketItems,redirect])

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

            <div className="registration_detail">
                {/* <form> */}
                <h1 className="heading">PlaceOrder</h1>
                
                {/* {error}
                {loading && <h2>Loading</h2>} */}

                <h2>Shipping address</h2>
                    {cartList.shippingAddr.address},
                    {cartList.shippingAddr.city} {' '},
                    {cartList.shippingAddr.postalCode},{' '} 
                    {cartList.shippingAddr.country}
                <br/><br/>
                
                <h2>Payment Method</h2>
                Method:-{cartList.paymentMethod}                
                <br/><br/>  

                <h2>Order Items</h2>
                {basketItems.length===0?
                   <div>
                     <h2>Your cart is empty</h2>
                     <Link to="/">Go back</Link>
                   </div>
                     :
                  <div>
                      {basketItems.map((item) => (
                        //   <Link to={``}></Link>
                        <div>
                          <img src={item.image} className="placeOrder_img_class"/>  
                          <Link to={`/product/${item.idname}`}>
                              {item.name}
                          </Link>  
                            {' '}
                          {item.qty} x {item.price} = ₹ {item.qty * item.price}

                       {/* <CheckoutProduct 
                           id={item.idname}
                           title={item.name}
                           price={item.price}
                           rating={3} //{item.avgrating}
                           image={item.image}
                           qty={item.qty}
                           countInStock={item.countInStock}
                        /> */}
                        
                         {console.log("Sum",summ+=item.price*item.qty) }
                         {/* {console.log("Upar",summ+=item.price*item.qty) } */}

                         </div>
                      ))}
                  </div>}
                
                <br/>

                {shipping_price= summ<500 ? 500:0}
                {tax_price= summ*0.1}
                {total_price= summ+shipping_price+tax_price}

                  <h2>Order Summary</h2>
                  Item Cost :- ₹ {summ}<br/>
                  Shipping :- ₹ {shipping_price}<br/>
                  Tax :- ₹ {tax_price}<br/>
                  Total Cost:- ₹ {total_price}<br/><br/>

                <button className="create_acc" onClick={submit_form} >Place Order</button>
               
                {/* </form> */}
            </div>

        </div>
    )
}

export default PlaceOrder
