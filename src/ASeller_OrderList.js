import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';

import {listProduct} from './Reducers/actions/productActions'

import {  useHistory } from 'react-router'; 
import { adminUserAction } from './Reducers/actions/userActions';

import {getSellerOrderListAction_details}  from './Reducers/actions/orderActions'


import './ASeller_OrderList.css' ;

function ASeller_OrderList() {
    let history = useHistory()
    let count =1;
   
    const [reload, setreload] = useState(0)
    const dispatch = useDispatch()
    
   
    // const userLogin = useSelector(state => state.userLogin)
    // const {userInfo} =userLogin

    // if((typeof(users)=='undefined') )
    // console.log("If Users:-",0,users);
    // else
    // console.log("User len:-",Object.keys(users).length,users);

    useEffect(() => {
        // if(userInfo.isAdmin)

        dispatch(getSellerOrderListAction_details())
    }, [dispatch,reload])

    const getSellerOrderList = useSelector(state => state.getSellerOrderList)
    const {loading:loadingOrder, SellergetOrderItems,error:errorOrder} = getSellerOrderList 


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin

    const prodDetail=(id)=>
    {
        console.log("prod DETAILS")
        history.push(`/placeorder/${id}`)
    }

    

    
        return (
            <div className="login">
                {/* {console.log();} */}
                 {loadingOrder==true || ((typeof(SellergetOrderItems.Allorders)=='undefined') || Object.keys(SellergetOrderItems.Allorders).length==0)?
                    <div>
                       <h2>Loading</h2>
                   </div>
                   :
                    <div>
                       <h2>ORDER LIST</h2>
                       {console.log("ADMIN ORDER LIST",SellergetOrderItems.Allorders)}
                       
                             <div>
                                <table>


                                        <tr>
                                            <th>Sr.No.</th>
                                            <th>ORDER ID</th>

                                            <th>USER ID</th>
                                            {/* <th>USER NAME</th> */}

                                          
                                            <th>PRICE</th>
                                            <th>PAID</th>  
                                            <th>DELIVERED</th>    
                                             <th>DETAILS</th>
                                        </tr>
                                        {/* {console.log("ALLUSERS",users.Allusers)} */}

                                        {SellergetOrderItems.Allorders.map((item) => (

                    
                                                <tr key={item._id}>
                                                   {/* {console.log("SELLER ORDER LIST",item)} */}
                                                    <td>{count}</td>
                                                    <td>{item.pid}</td>

                                                    <td>{item.sellerId}</td>
                                                    {/* <td>{item.user.Name}</td> */}
                                                    <td>{item.price}</td>
                                                    {/* <td>{item.orderId.isPaid}</td> */}

                                                    <td>{item.orderId.isPaid?<h3>✔️</h3>:<h3>❌</h3>}</td>
                                                    <td>{item.orderId.isDelivered?<h3>✔️</h3>:<h3>❌</h3>}</td>
                                                    
                                                    <td>
                                                        <button onClick={()=>prodDetail(item.orderId._id)}>Details</button>

                                                    </td>

                                                    {console.log("count val",count+=1)}
                                                </tr>
                                                
                                        ))}

                                </table>

                            </div> 

                        
                    </div>
                } 
    
            </div>
        )

   
    
}

export default ASeller_OrderList
