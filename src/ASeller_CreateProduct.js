import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';

import {  useHistory } from 'react-router'; 
import { userAction_details, userRegisterAction_details } from './Reducers/actions/userActions';

import './ASeller_CreateProduct.css' ;
// import { set } from 'mongoose';

function ASeller_CreateProduct() {
    let history = useHistory()
    var fileTypes = [".jpg", ".png", ".jpeg"];

    const [Name, setName] = useState('')
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');

    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [Predictedprice, setPredictedPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [Originalprice, setOriginalPrice] = useState();
    const [countInStock, setCountInStock] = useState(0);
    const [message, setMessage] = useState(false)


    const [file, setfile] = useState('')
    const [id_Img, setid_Img] = useState(0)
    const [Imgpath, setImgpath] = useState('')
    const [features, setfeatures] = useState('')

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


    useEffect(() => {
       
        if(id_Img!=0)
        {       
            console.log("value_id_img_inside",id_Img);
                const Data = new FormData()
                Data.append('id_Img', id_Img)
                Data.append('file',file)

      
            //  axios.post("https://httpbin.org/anything",Data)
            axios.post("http://localhost:4000/uploadImg/add",Data)
             .then(
                    res=>
                    {
                        console.log("dATA IS",res.data)
                        setImgpath(res.data)
                        console.log(3);
                    }
                 )
            
       
        }
        
    }, [id_Img])


    useEffect(() => {
       
        console.log("YO IMGpath, IDimG",Imgpath,id_Img)
        if(Imgpath!="" && id_Img!=NaN)
        {
              
            const ImageSearchData={
                "prod_id":id_Img,
                "img_path":Imgpath
            }

            console.log("check_Image_Seacrh_Data:",ImageSearchData)
            
            axios.post("http://localhost:7080/extract_features",ImageSearchData)
            .then(
                    res=>
                    {
                        console.log("Image_Data1",res.data.image_feature)
                        setfeatures(res.data.image_feature)
                        console.log(4);
                    }
                )
            //  .catch(err=>console.log(err))
            
            // console.log("MESSAGE2")
            // setMessage(true)
        }
    }, [Imgpath])


    useEffect(() => {
       
        // console.log("YO IMGpath, IDimG",Imgpath,id_Img)
        if(Imgpath!="" && id_Img!=NaN)
        {
              
            const ImageFeatureData={
                "product_id":id_Img,
                "image_feature":features
            }

            console.log("check_Image_Seacrh_Data.:",ImageFeatureData)
            
            axios.post("http://localhost:4000/imgFeature/add",ImageFeatureData)
            .then(
                    res=>
                    {
                        console.log("F data",res.data)
                        console.log(5);
                    }
                )
            //  .catch(err=>console.log(err))
            
            console.log("MESSAGE3")
            setMessage(true)
        }
    }, [features])


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

    const onOriginalPrice=(e)=> 
    { 
        setOriginalPrice(e.target.value)
    }

    const onCountInStock=(e)=> 
    { 
        setCountInStock(e.target.value)
    }
    const onImageURL=(e)=> 
    { 
        setImageURL(e.target.value)
    }






    const uploadFileHandler=async(e)=>
    { 
               const file=e.target.files[0]
               setfile(file)
               console.log(file);
       
    }
    
    
    
    const price_predict=()=>
    {

            console.log('Price predict');
            console.log("DOM",document.getElementById('brand').value);
            console.log("DOM",document.getElementById('condition').value,Originalprice);
            console.log("Category value",document.getElementById('category').value)

            const predictPrice={
                "product_brand":document.getElementById('brand').value,
                "product_condition":document.getElementById('condition').value,
                "product_cost":Originalprice
            }

            console.log("PP",predictPrice);

            const config={
                headers:{
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                    

                }
            }



            axios.post(`http://localhost:8000/predict_api`,predictPrice,config)
            .then(res => 
                {
                    setPredictedPrice(res.data);
                    console.log("Aseller O/P",res.data)
                    console.log(1);
                }).catch(err=>console.log("Aseller O/P",err))
        

    }


    
    const submit_form=(e)=>
    {
        e.preventDefault();
        const ProductData={
            "name":Name, //Lhs as mentioned in postman api tezting or in routes-->exercise_route.js . Name as mentioned as in router.post function
            "category":category,
             "brand":brand,
             "description":description,
             "price":price,
             "countInStock":countInStock,
             "imageURL":imageURL,
             
         }

         const config={
             headers:{
                 'Content-Type':"application/json",
                 Authorization:`Bearer ${userInfo.token}`
             }
         }

        axios.post(`http://localhost:4000/products/seller/products/add`,ProductData,config)
        .then(res => 
            {
                console.log("UPDaTED PROD SELLER",typeof(res.data._id))
                setid_Img(res.data._id)
                console.log(2);
            })

        console.log("PROD IN SUBMIT",ProductData);
            


        console.log("value_id_img",id_Img);


        
    }

    return (
        <div className="register">
            <Link to="/">
                <img className="logo" src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>

            </Link>

            <div className="registration_details">
                {/* <form action="#"> */}
                <h1 className="heading">CreateProduct-Seller</h1>
                
                {/* {error}*/ }
                

                <h2>Product Name</h2>
                <input value={Name} onChange={onName} placeholder="If user searches, it searches by this field"/>

                <h2>Category</h2>
                {/* <input value={category} onChange={onCategory} placeholder="Enter Category"/> */}
                <select className="category" name="product_category" id="category" >
                        <option value="1">Phone</option>
                        <option value="2">Others</option>
                                    
                </select>
                
                {document.getElementById('category')==null?console.log("Null") :
                <>
                   { document.getElementById('category').value==1?
                    
                    <><h2>Brand</h2>
                            <select className="brand" name="product_brand" id="brand">
                                <option value="1">Nokia</option>
                                <option value="2">lenovo</option>
                                <option value="3">SAMSUNG</option>
                                <option value="4">InFocus</option>
                               <option value="5">ViVO</option>
                                <option value="6">OPPO</option>
                                <option value="7">LG</option>
                                <option value="8">YU</option>
                                <option value="9">Panasonic</option>
                                <option value="10">Apple</option>
                                <option value="11">Redmi</option>
                                <option value="12">Moto</option>
                                <option value="13">Realme</option>
                                <option value="14">Honor</option>
                                <option value="15">Blackberry</option>
                                <option value="16">Sony</option>
                                <option value="17">One Plus</option>
                                <option value="18">Google</option>
                                <option value="19">Mi</option>
                                <option value="20">Micromax</option>
                                <option value="21">Huawei</option>
                                <option value="22">HTC</option>
                                            
                            </select>
                            </>
                   :
                    <>
                        <h2>Brand</h2>
                            <select className="brand" name="product_brand" id="brand">
                                <option value="1">yo</option>
                                <option value="2">rr</option>
                                        
                            </select>
                    </>
                 }
                </>
               }

                {/* <h2>Brand</h2>
                    <select className="brand" name="product_brand" id="brand">
                        <option value="1">Nokia</option>
                        <option value="2">lenovo</option>
                        <option value="3">SAMSUNG</option>
                        <option value="4">InFocus</option>
                        <option value="5">ViVO</option>
                        <option value="6">OPPO</option>
                        <option value="7">LG</option>
                        <option value="8">YU</option>
                        <option value="9">Panasonic</option>
                        <option value="10">Apple</option>
                        <option value="11">Redmi</option>
                        <option value="12">Moto</option>
                        <option value="13">Realme</option>
                        <option value="14">Honor</option>
                        <option value="15">Blackberry</option>
                        <option value="16">Sony</option>
                        <option value="17">One Plus</option>
                        <option value="18">Google</option>
                        <option value="19">Mi</option>
                        <option value="20">Micromax</option>
                        <option value="21">Huawei</option>
                        <option value="22">HTC</option>
                                    
                    </select> */}





                <input value={brand} onChange={onBrand} placeholder="Enter Brand"/>

                <h2>Description</h2>
                <input value={description} onChange={onDescription} placeholder="Enter Description"/>
                
                <h2>Original Price</h2>
                <input value={Originalprice} onChange={onOriginalPrice} placeholder="Enter Original Price for price prediction"/>
                
                
                <h2>Condition</h2>
                {/* <input value={Originalprice} onChange={onOriginalPrice} placeholder="Enter Original Price for price prediction"/> */}
                    <select className="condition" name="product_condition" id="condition">
                            <option value="1">1- Like New</option>
                            <option value="2">2- Superb</option>
                            <option value="3">3- Good</option>
                            <option value="4">4- Okay</option>
                    </select>

                <button className="create_acc" onClick={price_predict} >Predict Price</button>
                
                {Predictedprice!=0?<p>Predicted price is:-{Predictedprice}</p>:null}

                <h2>Your Price</h2>
                <input value={price} onChange={onPrice} placeholder="Enter Price"/>

                <h2>CountInStock</h2>
                <input value={countInStock} onChange={onCountInStock} placeholder="Enter CountInStock"/>
                
                <h2>Image URL</h2>
                <input value={imageURL} onChange={onImageURL} placeholder="Enter Image URL"/>
                <h4>OR</h4>
                
                <strong>Upload image</strong>
                <input type="file" id="file" accept={fileTypes} onChange={uploadFileHandler}/>
                {/* <input type="file" id="myFile" name={image} onChange={uploadFileHandler}/>  */}
                 {/* <input type="submit" /> */}

                <button className="create_acc" onClick={(e)=>{submit_form(e)}} >Create Product</button>
                {message && <h2>Product created</h2>} 
                {message && <div><button onClick={()=>{history.push(`/seller/product`)}}> See Product</button></div>}
                
                {/* </form> */}
            </div>

         

        </div>
    )
}

export default ASeller_CreateProduct
