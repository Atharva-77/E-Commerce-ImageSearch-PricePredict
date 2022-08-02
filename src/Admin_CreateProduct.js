import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';

import {  useHistory } from 'react-router'; 
import { userAction_details, userRegisterAction_details } from './Reducers/actions/userActions';

import './Admin_CreateProduct.css' ;
// import { set } from 'mongoose';

function Admin_CreateProduct() {
    let history = useHistory()

    const [Name, setName] = useState('')
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');

    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [message, setMessage] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin

    
    useEffect(() => {
        //when getting request, userinfo becomes true as  userLoginRequest is called.
        //length==0 becomes when 1st time login pg is visited
        //invalid details is received when details don't match
        //if user is logged in  direct to home page
        if(!( !(typeof(userInfo)=='undefined') && userInfo.length!=0 && userInfo!=='Invalid details'))
        {
            history.push(`/login_brad`)
        }
    }, [history,userInfo])

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
    const onImage=(e)=> 
    { 
        setImage(e.target.value)
    }






    const uploadFileHandler=async(e)=>
    {
        const file=e.target.files[0]//1st file only uploaded,,ability to upload multiple files
        console.log("FILE IS ADMIN Create",file.type);

        const formData = new FormData()
         
        formData.append('image', file)
        
        console.log("FILE IS ADMIN Create",formData,formData.append('image', file));
         axios.post("https://httpbin.org/anything",formData)
        //  axios.post("https://localhost:4000//uploadImg",formData)
         .then(res=>console.log(res.data)).catch(err=>console.log(err))

         try {
            const config = {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
      
            const { data } = await axios.post('http://localhost:4000/uploadImg', formData,config)
            console.log("DATA IS ADMIN Create",data);
            setImage(data)
            // setUploading(false)
          } 
          catch (error) {
            console.error(error)
            // setUploading(false)
          }
    }
    
    
    
    const submit_form=()=>
    {
    
        const ProductData={
            "name":Name, //Lhs as mentioned in postman api tezting or in routes-->exercise_route.js . Name as mentioned as in router.post function
            "category":category,
             "brand":brand,
             "description":description,
             "price":price,
             "countInStock":countInStock,
             "image":image,
             
         }

         const config={
             headers:{
                 'Content-Type':"application/json",
                 Authorization:`Bearer ${userInfo.token}`
             }
         }

        axios.post(`http://localhost:4000/products/admin/products/add`,ProductData,config)
        .then(res => console.log("UPDTED PROD ADMIN",res.data))

        console.log("PROD IN SUBMIT",ProductData);

        // history.push(`/admin/product`)
        setMessage(true)


         
        
    }

    return (
        <div className="register">
            <Link to="/">
                <img className="logo" src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>

            </Link>

            <div className="registration_details">
                {/* <form action="#"> */}
                <h1 className="heading">CreateProduct-admin</h1>
                
                {/* {error}*/ }
                

                <h2>Your Name</h2>
                <input value={Name} onChange={onName} placeholder="Enter Full Name"/>

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
                
                <h2>Image</h2>
                <input value={image} onChange={onImage} placeholder="Enter Image URL"/>
                <h4>OR</h4>
                <strong>Upload image</strong><input type="file" id="myFile" name={image} onChange={uploadFileHandler}/> 
                 {/* <input type="submit" /> */}

                <button className="create_acc" onClick={submit_form} >Create Product</button>
                {message && <h2>Product created</h2>} 
                {message && <div><button onClick={()=>{history.push(`/admin/product`)}}> See Product</button></div>}
                
                {/* </form> */}
            </div>

         

        </div>
    )
}

export default Admin_CreateProduct
