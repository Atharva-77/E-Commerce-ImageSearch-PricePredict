import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';

import {SellerlistProduct} from './Reducers/actions/productActions'

import {  useHistory } from 'react-router'; 


import './ASeller_Product.css' ;

function ASeller_Product() {
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

        dispatch(SellerlistProduct())
    }, [dispatch,reload])

    const SellerproductList = useSelector(state => state.SellerproductList)
    const {loading,Sellerproducts,error} =SellerproductList


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin

    const deleteUser=(id)=>
    {
        console.log("(adminP) id ",id);
        if(window.confirm("Are you sure?"))
        {
            const config={
                headers:{
                    // 'Content-Type':"application/json",
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            
            axios.delete(`http://localhost:4000/products/seller/deleteProduct/${id}`,config)
             .then(res => 
                {
                    console.log("(adminP) deleted",res.data)
                    setreload(!reload)
                })
        }
       
    }
    const editUser=(id)=>
    {
        console.log("edit",id);
        history.push(`/seller/prod/edit/${id}`)
    }

    const createProduct=()=>
    {
        console.log("createProd adim");
        history.push(`/seller/createProduct`)
    }
    

    
        return (
            <div className="login">
                {/* {console.log();} */}
                 {loading==true || ((typeof(Sellerproducts)=='undefined') || Object.keys(Sellerproducts).length==0)?
                    <div>
                       <h2>Loading</h2>
                   </div>
                   :
                    <div>
                       <h2>SELLER PRODUCT LIST</h2>
                       {/* {console.log("USER LIST",users)} */}
                       
                             <div>
                                <table>


                                        <tr>
                                            <th>Sr.No.</th>
                                            <th>PROD ID</th>

                                            <th>NAME</th>
                                            <th>PRICE</th>
                                            <th>CATEGORY</th>

                                            <th>BRAND</th>
                                            <th>SELER ID</th>   
                                             <th>EDIT</th>
                                            <th>DELETE</th>
                                        </tr>
                                        {/* {console.log("ALLUSERS",users.Allusers)} */}

                                        {Sellerproducts.map((item) => (
                    
                    
                                                <tr key={item._id}>

                                                    <td>{count}</td>
                                                    <td>{item._id}</td>
                                                
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.category}</td>
                                                    <td>{item.brand}</td>
                                                    <td>{item.user}</td>


                                                    {/* <td>{item.isAdmin?<h3>✔️</h3>:<h3>❌</h3>}</td> */}
                                                    {/* <td>{item.isSeller?<h3>✔️</h3>:<h3>❌</h3>}</td> */}


                                                    <td>
                                                        {/* <Link to={`/login_brad/admin/profile/${item._id}`}> */}
                                                            <button onClick={()=>editUser(item._id)}>Edit</button>
                                                        {/* </Link> */}
                                                    </td>

                                                    <td>
                                                        {/* <Link to={`/edit/${item._id}`}> */}
                                                            <button onClick={()=>deleteUser(item._id)}>Delete</button>
                                                        {/* </Link> */}
                                                    </td>
                                                    {console.log("count val",count+=1)}
                                                </tr>
                                                
                                        ))}

                                </table>

                                <button onClick={()=>createProduct()}>Create Product</button>
                            </div> 

                        
                    </div>
                } 
    
            </div>
        )

   
    
}

export default ASeller_Product
