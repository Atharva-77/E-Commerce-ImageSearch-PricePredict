import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { storage } from './firebase/index.js';

import {  useHistory } from 'react-router'; 
import { userAction_details, userRegisterAction_details } from './Reducers/actions/userActions';

import './ASeller_CreateProduct.css' ;
// import { set } from 'mongoose';

function ASeller_CreateProduct() {
    let history = useHistory()
    var fileTypes = [".jpg", ".png", ".jpeg"];

    const [Name, setName] = useState('')
    const [category, setCategory] = useState('Phone');
    const [brand, setBrand] = useState('1');

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
    const [url, setUrl] = useState('')

    
    const [createProdMessage, setcreateProdMessage] = useState(false)

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


    // useEffect(() => {
       
    //     if(id_Img!=0)
    //     {       
    //         console.log("value_id_img_inside",id_Img);
    //             const Data = new FormData()
    //             Data.append('id_Img', id_Img)
    //             Data.append('file',file)

      
    //         //  axios.post("https://httpbin.org/anything",Data)
    //         axios.post("/uploadImg/add",Data)
    //          .then(
    //                 res=>
    //                 {
    //                     console.log("dATA IS",res.data)
    //                     setImgpath(res.data)
    //                     console.log(3);
    //                 }
    //              )
            
       
    //     }
        
    // }, [id_Img])


    useEffect(() => {
       
        console.log("YO IMGpath, IDimG",Imgpath,id_Img, imageURL, url)
        if((imageURL!='' || url!='') && id_Img!=0)
        {
            let ImageSearchData;
            if(imageURL!=''){
                ImageSearchData={
                    "prod_id":id_Img,
                    "img_link":imageURL
                }
            }
            else{
                ImageSearchData={
                    "prod_id":id_Img,
                    "img_link":url
                }
            }

            

            console.log("check_Image_Seacrh_Data:",ImageSearchData)
            
            axios.post("https://e-commerce-imagesearch.vercel.app/extract_features",ImageSearchData)
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
    }, [imageURL,url,id_Img])


    useEffect(() => {
       
        // console.log("YO IMGpath, IDimG",Imgpath,id_Img)
        if((imageURL!='' || url!='') && id_Img!=NaN)
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
            setcreateProdMessage(false)
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

        var img_extension=file.type.split("/")[1]
        
        var current_date=new Date()
        let final_date = ""
        final_date = current_date.toString().substring(0,24)
        final_date = final_date.replace(":","-")
        final_date = final_date.replace(":","-")
        console.log("FIANL DATE IS",final_date,img_extension);
        var imgName=final_date+"."+img_extension

        if(imageURL=='')
        {
            const uploadTask = storage.ref(`images/${imgName}`).put(file);
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    storage
                    .ref("images")
                    .child(imgName)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                    });
                }
            )
            console.log(url)
        }
       
    }
    
    
    const price_predict=()=>
    {

            console.log('Price predict');
            // console.log("DOM",document.getElementById('brand').value);
            console.log("DOM",document.getElementById('condition').value,Originalprice);
            console.log("Category value",document.getElementById('category').value)

            const predictPrice={
                "product_brand": brand,//document.getElementById('brand').value,
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



            axios.post(`https://ecommerce-priceprediction.herokuapp.com/predict_api`,predictPrice,config)
            .then(res => 
                {
                    setPredictedPrice(res.data);
                    console.log("Aseller O/P",res.data)
                    console.log(1);
                }).catch(err=>console.log("Aseller O/P",err))
        

    }


    
    const submit_form=(e)=>
    {
        setcreateProdMessage(true)
        let ProductData={}
        e.preventDefault();

        // var img_extension=file.type.split("/")[1]
        
        // var current_date=new Date()
        // let final_date = ""
        // final_date = current_date.toString().substring(0,24)
        // final_date = final_date.replace(":","-")
        // final_date = final_date.replace(":","-")
        // console.log("FIANL DATE IS",final_date,img_extension);
        // var imgName=final_date+"."+img_extension

        // if(imageURL=='')
        // {
        //     const uploadTask = storage.ref(`images/${imgName}`).put(file);
        //     uploadTask.on(
        //         "state_changed",
        //         snapshot => {},
        //         error => {
        //             console.log(error);
        //         },
        //         () => {
        //             storage
        //             .ref("images")
        //             .child(imgName)
        //             .getDownloadURL()
        //             .then(url => {
        //                 setImageURL(url);
        //             });
        //         }
        //     )
        //     console.log(url)
        // }
        if(imageURL!=''){
            if(brand=='')
            {
                ProductData={
                    "name":Name, //Lhs as mentioned in postman api tezting or in routes-->exercise_route.js . Name as mentioned as in router.post function
                    "category":document.getElementById('category').value,
                    "brand":document.getElementById('brand').value,
                    "description":description,
                    "price":price,
                    "countInStock":countInStock,
                    "imageURL":imageURL,
                    
                }
            }
            else
            {
                ProductData={
                    "name":Name, //Lhs as mentioned in postman api tezting or in routes-->exercise_route.js . Name as mentioned as in router.post function
                    "category":category,
                    "brand":brand,
                    "description":description,
                    "price":price,
                    "countInStock":countInStock,
                    "imageURL":imageURL,
                    
                }
            }
        }
        else{
            if(brand=='')
            {
                ProductData={
                    "name":Name, //Lhs as mentioned in postman api tezting or in routes-->exercise_route.js . Name as mentioned as in router.post function
                    "category":document.getElementById('category').value,
                    "brand":document.getElementById('brand').value,
                    "description":description,
                    "price":price,
                    "countInStock":countInStock,
                    "imageURL":url,
                    
                }
            }
            else
            {
                ProductData={
                    "name":Name, //Lhs as mentioned in postman api tezting or in routes-->exercise_route.js . Name as mentioned as in router.post function
                    "category":category,
                    "brand":brand,
                    "description":description,
                    "price":price,
                    "countInStock":countInStock,
                    "imageURL":url,
                    
                }
            }
        }                                                                                                                                                                                                         
        
       

         

         console.log("PRODUCT DATA",ProductData)
         const config={
             headers:{
                 'Content-Type':"application/json",
                 Authorization:`Bearer ${userInfo.token}`
             }
         }

        axios.post(`/products/seller/products/add`,ProductData,config)
        .then(res => 
            {
                console.log("UPDaTED PROD SELLER",typeof(res.data._id))
                setid_Img(res.data._id)
                console.log("DATA FRM SELLER",res.data);
                
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
                <select className="category" name="product_category" id="category" onChange={(e)=>onCategory(e)}>
                        <option value="Phone" >Phone</option>
                        <option value="Others">Others</option>
                                    
                </select>
                
         
                    {category=="Others"?
                    
                       
                        <>
                            <h2>Brand</h2>
                              <input value={brand} onChange={onBrand} placeholder="Enter Brand"/>

                        </>
                     :
                      <>
                        <h2>Brand</h2>
                        <select className="brand" name="product_brand2" id="brand" value={brand} onChange={(e)=>onBrand(e)}>
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

                            <h2>Ram</h2>
                            <input placeholder="Enter Ram of the phone in GB"/>

                            <h2>Storage</h2>
                            <input placeholder="Enter Storage of the phone in GB"/>

                            <button className="create_acc" onClick={price_predict} >Predict Price</button>
                            <br />
                       </>
                    }
            





                {/* <input value={brand} onChange={onBrand} placeholder="Enter Brand"/> */}

{/*                
                <h2>Original Price</h2>
                <input value={Originalprice} onChange={onOriginalPrice} placeholder="Enter Original Price for price prediction"/>
                
                
                <h2>Condition</h2>
                {/* <input value={Originalprice} onChange={onOriginalPrice} placeholder="Enter Original Price for price prediction"/> */}
                    {/* <select className="condition" name="product_condition" id="condition">
                            <option value="1">1 - Like New</option>
                            <option value="2">2 - Superb</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Okay</option>
                    </select>

                <button className="create_acc" onClick={price_predict} >Predict Price</button> */} 
                
                
                {Predictedprice!=0?<p>Predicted price is:-{Predictedprice}</p>:null}
               
                <h2>Description</h2>
                <textarea value={description} onChange={onDescription} placeholder="Enter Description"/>
                <br />

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

                {/* <button className="create_acc" onClick={(e)=>{submit_form(e)}} >Create Product</button> */}
               
                {(imageURL!='' || url!='')?
                    <>
                     <button className="create_acc" onClick={(e)=>{submit_form(e)}} >Create Product</button>

                      {createProdMessage? <h2>Product Creating...</h2>
                        :
                        <>
                        {message && <h2>Product created</h2>} 
                        {message && <div><button onClick={()=>{history.push(`/seller/product`)}}> See Product</button></div>}
                        </>
                        }
                    </>
                :
                    <>Please fill the data completely.</>
                }
               
                {/* {createProdMessage? <h2>Product Creating...</h2>
                :
                <>
                   {message && <h2>Product created</h2>} 
                   {message && <div><button onClick={()=>{history.push(`/seller/product`)}}> See Product</button></div>}
                </>
                } */}

                {/* {message && <h2>Product created</h2>} 
                {message && <div><button onClick={()=>{history.push(`/seller/product`)}}> See Product</button></div>} */}
                
                {/* </form> */}
            </div>

         

        </div>
    )
}

export default ASeller_CreateProduct
