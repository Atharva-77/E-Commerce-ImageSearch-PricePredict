import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';

import {listProduct} from './Reducers/actions/productActions'

import {  useHistory } from 'react-router'; 
import { adminUserAction } from './Reducers/actions/userActions';

import {getAdminorderListAction_details}  from './Reducers/actions/orderActions'


import './Admin_Order_List.css' ;

function Admin_Order_List() {
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

        dispatch(getAdminorderListAction_details())
    }, [dispatch,reload])

    const getAdminorderList = useSelector(state => state.getAdminorderList)
    const {loading:loadingOrder, AdmingetOrderItems,error:errorOrder} = getAdminorderList 


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
                 {loadingOrder==true || ((typeof(AdmingetOrderItems.Allorders)=='undefined') || Object.keys(AdmingetOrderItems.Allorders).length==0)?
                    <div>
                       <h2>Loading</h2>
                   </div>
                   :
                    <div>
                       <h2>ORDER LIST</h2>
                       {console.log("ADMIN ORDER LIST",AdmingetOrderItems.Allorders)}
                       
                             <div>
                                <table>


                                        <tr>
                                            <th>Sr.No.</th>
                                            <th>ORDER ID</th>

                                            <th>USER ID</th>
                                            <th>USER NAME</th>

                                          
                                            <th>TOTAL</th>
                                            <th>PAID</th>   
                                             <th>D</th>
                                        </tr>
                                        {/* {console.log("ALLUSERS",users.Allusers)} */}

                                        {AdmingetOrderItems.Allorders.map((item) => (
                    
                    
                                                <tr key={item._id}>

                                                    <td>{count}</td>
                                                    <td>{item._id}</td>

                                                    <td>{item.user._id}</td>
                                                    <td>{item.user.Name}</td>
                                                    <td>{item.totalPrice}</td>
                                                  
                                                    <td>{item.isPaid?<h3>✔️</h3>:<h3>❌</h3>}</td>
                                                    <td>{item.isDelivered?<h3>✔️</h3>:<h3>❌</h3>}</td>
                                                    
                                                    <td>
                                                        <button onClick={()=>prodDetail(item._id)}>Details</button>

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

export default Admin_Order_List
