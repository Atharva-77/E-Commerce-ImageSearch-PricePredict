import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';

import {  useHistory } from 'react-router'; 
import { adminUserAction } from './Reducers/actions/userActions';


import './Admin_UserList.css' ;

function Admin_UserList() {
    let history = useHistory()
    let count =1;
   
    const [reload, setreload] = useState(0)
    const dispatch = useDispatch()
    
    const adminUserList = useSelector(state => state.adminUserList)
    const {loading,users,error} =adminUserList

    if((typeof(users)=='undefined') )
    console.log("If Users:-",0,users);
    else
    console.log("User len:-",Object.keys(users).length,users);

    useEffect(() => {

       dispatch(adminUserAction())
    }, [dispatch,reload])



    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin

    const deleteUser=(id)=>
    {
        console.log("(admin) id ",id);
        if(window.confirm("Are you sure?"))
        {
            const config={
                headers:{
                    // 'Content-Type':"application/json",
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            
            axios.delete(`http://localhost:4000/login_brad/deleteUser/${id}`,config)
             .then(res => 
                {
                    console.log("(adminUserList) deleted",res.data)
                    setreload(!reload)
                })
        }
       
            // .catch(err=>res.status(200).json("Error is "+err))
    }

    const editUser=(id)=>
    {
        console.log("edit",id);
        history.push(`/admin/profile/${id}`)
    }
    

    
        return (
            <div className="login">
                {/* {console.log();} */}
                 {loading==true || ((typeof(users)=='undefined') || Object.keys(users).length==0)?
                    <div>
                       <h2>Loading</h2>
                   </div>
                   :
                    <div>
                       <h2>USER LIST</h2>
                       {console.log("USER LIST",users)}
                       
                             <div>
                                <table>


                                        <tr>
                                            <th>Sr.No.</th>
                                            <th>ID</th>
                                            <th>NAME</th>
                                            <th>EMAIL</th>
                                            <th>ADMIN</th>
                                            <th>SELLER</th>
                                            <th>Edit user</th>
                                            <th>Delete user</th>
                                        </tr>
                                        {/* {console.log("ALLUSERS",users.Allusers)} */}

                                        {users.Allusers.map((item) => (
                    
                    
                                                <tr key={item._id}>
                                                    <td>{count}</td>
                                                    <td>{item._id}</td>
                                                
                                                    <td>{item.Name}</td>
                                                
                                                    <td>{item.email}</td>
                                                
                                                    <td>{item.isAdmin?<h3>✔️</h3>:<h3>❌</h3>}</td>
                                                    <td>{item.isSeller?<h3>✔️</h3>:<h3>❌</h3>}</td>


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
                            </div> 

                        
                    </div>
                } 
    
            </div>
        )

   
    
}

export default Admin_UserList
