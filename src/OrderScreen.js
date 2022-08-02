import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router';
import {PayPalButton} from 'react-paypal-button-v2'
import { useDispatch,useSelector } from 'react-redux';
import CheckoutProduct from './CheckoutProduct';

import {  useHistory } from 'react-router'; 
import { getorderListAction_details,payorderAction_details} from './Reducers/actions/orderActions';
 
import './OrderScreen.css' ;

function OrderScreen() {

    const {id}=useParams()
    // console.log("ORDER Id-",id);
    const [sdkReady, setSdkReady] = useState(false)
    let history = useHistory()

    const dispatch = useDispatch()

    const getorderList = useSelector(state => state.getorderList)
    const {getOrderItems,loading,error}=getorderList

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay,success:successPay}=orderPay
    //renaming as one loading already there frm getorderList


    
  

    useEffect(() => {
        console.log("O.S",getOrderItems);

         const paypalScript=async()=>
        {
          const {data:clientId}= await axios.get('http://localhost:4000/config/paypal')
          console.log("1.CLIENT ID",clientId);

          const script= document.createElement("script")
          script.type='text/javascript'
          script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`

          script.async=true

          script.onload=()=> //it means script has been loaded  
          {
            setSdkReady(true)
          }

          document.body.appendChild(script)
          console.log("WINDOW PP",window.paypal);

        }

        //Q.disatch up or down?

        paypalScript()
        dispatch(getorderListAction_details(id))

        // if(successPay || Object.keys(getorderList.getOrderItems).length==0)
            //  dispatch(getorderListAction_details(id))
        
        // else if(!getorderList.getOrderItems.isPaid)  
          //  paypalScript()
        
   
        // dispatch(getorderListAction_details(id))
    }, [dispatch,id,successPay])
    
    const successHandler =(paymentResult)=>
    {
      console.log("PAYMENT RESULT",paymentResult);
      dispatch(payorderAction_details(id,paymentResult))
    }



    // console.log("O.S2",getOrderItems,loading);
    // const submit_form=()=>
    // {
        
      // const paypalScript2=async()=>
      // {
      //   const {data:clientId}= await axios.get('http://localhost:4000/config/paypal')
      //   // const {data}= await axios.get('http://localhost:4000/config/paypal')
        
      //   const script= document.createElement("script")
      //   script.type='text/javascript'
      //   script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`

      //   script.async=true

      //   script.onload=()=> //it means script has been loaded  
      //   {
      //     setSdkReady(true)
      //   }

      //   document.body.appendChild(script)

      //   console.log("CLIENT ID",clientId);
      //   // console.log("CLIENT DI2",data);
      // }

      // paypalScript2()
 
       
        
    // }
    // dispatch(getorderListAction_details(id))
    return (
        <div className="register">
            <Link to="/">
                <img className="logo" src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>

            </Link>

            <div className="registration_detail">
                {/* <form> */}
                <h1 className="heading">Order screen</h1>
                {/* {console.log("LOAD",loading)}
                {console.log("GETORDERLIST ",typeof(getorderList.getOrderItems),Object.keys(getorderList.getOrderItems).length,(getorderList.getOrderItems))} */}
                {/* {loading==true?<div><h2>Loading</h2></div>:<div>Not loading</div>} */}
               
                {loading==true && Object.keys(getorderList.getOrderItems).length==0?
                <div>
                    <h2>Loading</h2>
                </div>
                :
                <div>

                    <h2>ORDER NUMBER {getorderList.getOrderItems._id}</h2>
                     {getorderList.getOrderItems.shippingAddress.address},
                    
                    <strong>Name</strong> {getorderList.getOrderItems.user.Name} <br />
                    <strong>Email</strong>
                    {/* <a href={`mailto:${getorderList.getOrderItems.user.email}`}> */}
                        {' '}{getorderList.getOrderItems.user.email}
                    {/* </a> */}<br /><br />

                     <h2>Shipping address</h2>
                     {getorderList.getOrderItems.shippingAddress.address},
                     {getorderList.getOrderItems.shippingAddress.city} {' '},
                     {getorderList.getOrderItems.shippingAddress.postalCode},{' '} 
                     {getorderList.getOrderItems.shippingAddress.country} 
                 <br/>
                     {getorderList.getOrderItems.isDelivered ?<strong>Delivered on {getorderList.getOrderItems.deliveredAt}</strong>:
                    <div> Not Deivered</div>}
                 <br/>

                
                 
                 <h2>Payment Method</h2>
                  Method:-{getorderList.getOrderItems.paymentMethod} 
                 <br/>

                 {getorderList.getOrderItems.isPaid ?<strong>Paid on {getorderList.getOrderItems.paidAt}</strong>:
                    <div> Not paid</div>}
                 <br/><br/>  


                 <h2>Order Items</h2>
                 {getorderList.getOrderItems.orderItems.length===0?

                   <div>
                     <h2>Your order cart is empty</h2>
                     <Link to="/">Go back</Link>
                   </div>
                     :
                  <div>
                      {getorderList.getOrderItems.orderItems.map((item) => (
                        <div>
                          <img src={item.image} className="placeOrder_img_class"/>  
                          <Link to={`/product/${item.idname}`}>
                              {item.name}
                          </Link>  
                            {' '}
                          {item.qty} x {item.price} = ₹ {item.qty * item.price}

                        

                        </div>
                       ))}
                  </div>
                 } 
                
                
                  <h2>Order Summary</h2>
                  Item Cost :- ₹ {getorderList.getOrderItems.totalPrice-getorderList.getOrderItems.shippingPrice-getorderList.getOrderItems.taxPrice}<br/>
                  Shipping :- ₹ {getorderList.getOrderItems.shippingPrice}<br/>
                  Tax :- ₹ {getorderList.getOrderItems.taxPrice}<br/>
                  Total Cost:- ₹ {getorderList.getOrderItems.totalPrice}<br/><br/>

                  {/* {!getorderList.getOrderItems.isPaid && 
                      <div>
                            {loadingPay && <h2>LoadingPay</h2>}
                            {!sdkReady ?
                                        (<h2>Loading  Sdk </h2>):
                                        (<PayPalButton amount={getorderList.getOrderItems.totalPrice} onSuccess={successHandler} currency="INR"/>)
                            }
                       </div>
                  } */}

<PayPalButton amount={getorderList.getOrderItems.totalPrice} onSuccess={successHandler} />
                    Not loading 
                </div>}



               {/* { {loading} && <h2>Loading</h2>}? <h2>Loading</h2> : <h2>Loading</h2>} */}
                {/* {error} */}
                {/* {loading ===true : <div><h2>Loading</h2></div>
                    ?
                    <div>
                        <h2>NO</h2>
                    </div>
                } */}

                  {/* <h2>Shipping address</h2>
                     {getorderList.getOrderItems.shippingAddress.address},
                     {getorderList.getOrderItems.shippingAddress.city} {' '},
                     {getorderList.getOrderItems.shippingAddress.postalCode},{' '} 
                     {getorderList.getOrderItems.shippingAddress.country} 
                 <br/><br/>
                
                 <h2>Payment Method</h2>
                  Method:-{getorderList.getOrderItems.paymentMethod} }
                 <br/><br/>  

                 <h2>Order Items</h2>
                 {getorderList.getOrderItems.orderItems.length===0?

                   <div>
                     <h2>Your order cart is empty</h2>
                     <Link to="/">Go back</Link>
                   </div>
                     :
                  <div>
                      {getorderList.getOrderItems.orderItems.map((item) => (
                        <div>
                          <img src={item.image} className="placeOrder_img_class"/>  
                          <Link to={`/product/${item.idname}`}>
                              {item.name}
                          </Link>  
                            {' '}
                          {item.qty} x {item.price} = ₹ {item.qty * item.price}

                       

                        </div>
                       ))}
                  </div>
                 } 
                
                
                  <h2>Order Summary</h2>
                  Item Cost :- ₹ {getorderList.getOrderItems.totalPrice-getorderList.getOrderItems.shippingPrice-getorderList.getOrderItems.taxPrice}<br/>
                  Shipping :- ₹ {getorderList.getOrderItems.shippingPrice}<br/>
                  Tax :- ₹ {getorderList.getOrderItems.taxPrice}<br/>
                  Total Cost:- ₹ {getorderList.getOrderItems.totalPrice}<br/><br/>  */}


               

                {/* <button className="create_acc" onClick={submit_form} >Order</button> */}
               
                {/* </form> */}
            </div>

        </div>
    )
}

export default OrderScreen
