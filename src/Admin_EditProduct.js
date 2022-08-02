import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import {  useHistory } from 'react-router'; 

import './Admin_EditProduct.css' ;

function Admin_EditProduct() {
    let history = useHistory()
    const {id}=useParams()

    const [Name, setName] = useState('')
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');

    const [description, setDescription] = useState('');
    // const [img, setImg] = useState('');
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [message, setMessage] = useState(false)

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
                    axios.get(`http://localhost:4000/products/admin/products/${id}`,config)
                    .then(res=>
                        {
                            console.log("RES.DATA ",res.data);
                            setName(res.data.name)
                            setCategory(res.data.category)
                            setBrand(res.data.brand)

                            setDescription(res.data.description)
                            setPrice(res.data.price)
                            setCountInStock(res.data.countInStock)
                            // console.log(email);
                        })
            
        }

    }, [history,userInfo,id])


    const onName=(e)=> 
    { 
        setName(e.target.value)
    }
    const onCategory=(e)=> 
    { 
        setCategory(e.target.value)
    }
    const onBrand=(e)=> 
    { 
        setBrand(e.target.value)
    }

    const onDescription=(e)=> 
    { 
        setDescription(e.target.value)
    }
    const onPrice=(e)=> 
    { 
        setPrice(e.target.value)
    }
    const onCountInStock=(e)=> 
    { 
        setCountInStock(e.target.value)
    }
    
    


    const submit_form=()=>
    {
        console.log("SNAME",Name);
               const ProductData={
                   "name":Name, //Lhs as mentioned in postman api tezting or in routes-->exercise_route.js . Name as mentioned as in router.post function
                   "category":category,
                    "brand":brand,
                    "description":description,
                    "price":price,
                    "countInStock":countInStock
                    
                }

                const config={
                    headers:{
                        'Content-Type':"application/json",
                        Authorization:`Bearer ${userInfo.token}`
                    }
                }

            axios.put(`http://localhost:4000/products/admin/products/edit/${id}`,ProductData,config)
             .then(res => console.log("UPDTED PROD ADMIN",res.data))


             setMessage(true)
    }

   
    return (
        <div className="register">
            <Link to="/">
                <img className="logo" src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>

            </Link>

            <div className="registration_details">
                {/* <form> */}
                <h1 className="heading">Product-admin</h1>
                
                {/* {error}
                {loading && <h2>Loading</h2>} */}

                <h2>Your Name</h2>
                <input value={Name} onChange={onName} placeholder="Enter Full Name"/>
                {console.log("NAME IS",Name)}
                <h2>Category</h2>
                <input value={category} onChange={onCategory} placeholder="Enter Category"/>
                
                <h2>Brand</h2>
                <input value={brand} onChange={onBrand} placeholder="Enter Brand"/>

                <h2>Description</h2>
                <input value={description} onChange={onDescription} placeholder="Enter Description"/>
                
                <h2>Price</h2>
                <input value={price} onChange={onPrice} placeholder="Enter Price"/>

                <h2>CountInStock</h2>
                <input value={countInStock} onChange={onCountInStock} placeholder="Enter CountInStock"/>
                

                <button className="create_acc" onClick={submit_form} >Update</button>
                {message && <h2>Product Updated</h2>} 
                {message && <div><button onClick={()=>{history.push(`/admin/product`)}}> See Product</button></div>}
                {/* </form> */}
            </div>

         

        </div>
    )
}

export default Admin_EditProduct
