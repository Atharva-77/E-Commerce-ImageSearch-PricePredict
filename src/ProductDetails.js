import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router';
import { useSelector,useDispatch } from 'react-redux'
import { listProductDetails } from './Reducers/actions/productActions';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './ProductDetails.css'
import { Link } from 'react-router-dom';

// import { Link } from '@material-ui/core';

const ProductDetails= ()=> {
    let history = useHistory();


    const {id}=useParams()
    // {console.log("MATCH- ",id);}


    const [qty, setqty] = useState(1)
    const [userRating, setuserRating] = useState(0)
    const [userComment, setuserComment] = useState('')
    const [reload, setreload] = useState(0)
    const [AlreadyReview, setAlreadyReview] = useState(false)

    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch,id,reload])

    const productDetails= useSelector(state => state.productDetails)
    const {loading,product,error}=productDetails

    const userLogin=useSelector(state => state.userLogin)
    const {userInfo}=userLogin

    // console.log("ProductDetails details wala prods",product);

    const addToBasket =()=>
    {
        history.push(`/checkout/${id}?qty=${qty}`)
    }

    const submit_form=()=>
    {
    
        const ReviewData={
            "rating":userRating, //Lhs as mentioned in postman api tezting or in routes-->exercise_route.js . Name as mentioned as in router.post function
            "comment":userComment,
         }

         const config={
             headers:{
                 'Content-Type':"application/json",
                 Authorization:`Bearer ${userInfo.token}`
              }
           }

        axios.post(`http://localhost:4000/products/review/${id}`,ReviewData,config)
        .then(res => 
            {
                console.log("(PRODUCTDETAILS):-",res.data,reload)
                setreload(!reload)
                console.log("RELOAD",reload);
                if(res.data==="Already reviewed product")
                {
                   setAlreadyReview(true);
                }
                setuserRating('')
                setuserComment('')
            })

           
        
    }

    return (
        <div classname="product_details_body">
            <div className="product_details">
                    <div className="product_details_info">
                        {/* <!-- <img class="product_img" src={product.image} /> --> */}
                        {(typeof(product.imageURL)!='undefined') && product.imageURL.length>7 ?
                            //  <h2>KYUJI</h2>
                            <img className="product_details_img" src={product.imageURL} />
                              :
                            //   <h2>YOJI</h2>
                              (typeof(product.imageURL)!='undefined') ?
                                <img className="product_details_img" src={`${"data:image/png;base64," +new Buffer.from(product.imageFile.data.data).toString("base64")}`} />
                                :
                                null
                        }

                        <p class="product_details_name">{product.name}</p>
                        
                        <p class="product_details_price_text">M.R.P.: </p>
                        <p class="product_details_price">₹ {product.price}
                        {product.countInStock>0?<button class="product_details_buy_button" onClick={addToBasket}>Add to Basket</button>:<h2>Out of Stock</h2>}
                        </p>

                        {/* <br />
                        Quantity<input onChange={(e)=>setqty(e.target.value)}/> 
                        <h2>{qty}</h2> */}

                        {product.countInStock>0?  
                            <>
                                Quantity 
                                <select onChange={(e)=>setqty(e.target.value)}>
                                    {
                                    [...Array(product.countInStock).keys()].map((x) =>(
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                    ) )
                                    }
                                </select>
                            </>
                            :
                            null
                        }
                        <br/>
                        <br/>

                        {/* <!-- <p class="product_desc">{product.description}</p><br /> --> */}
                        <p class="product_details_desc">
                            {product.description}
                        </p>

                        

                        {/* <div className="productDetails_rating">
                            {Array(product.Avgrating)
                            .fill()
                            .map((_,i) =>
                            (
                                <p>⭐</p> 
                            ))}
                        </div> */}

                    </div>  
                
                <p class="clearer"></p>
                
            </div>

            <div className="product_details_rating">
                <p>Number of reviews: {product.noOfReview}</p>
                <br />
                {/* <strong> Product Rating:- </ strong>{product.Avgrating} <br /> 
                <strong>Total User Reviewed The Product:- </strong>{product.reviews.length} */}
                {product.reviews.length==0?<h2>No Reviews<br/><br /></h2>:
                    <>
                        <h2>Reviews:</h2><br />
                        {product.reviews.map((i)=>
                            <>
                                <p><strong>Name: </strong>{' '}{i.name}</p>
                                <p><strong>Posted At: </strong>{' '}{i.createdAt.substring(0,10)}</p>
                                <p><strong>Rating: </strong>{' '}{i.IndividualRating}</p>
                                <p><strong>Comment: </strong>{' '}{i.comment}</p>
                                <br />
                            </>
                        )}

                    </>
                }
                <>
                    
                    {userInfo.length!=0?
                        <>
                            {AlreadyReview?
                                <h4>You Have Already Reviewed Product</h4>
                                :
                                <>
                                    <h2>Write A Review: <br /></h2>
                                    Rating: <br /> 
                                    <select value={userRating} onChange={(e)=>setuserRating(e.target.value)}>
                                        <option value="1">1-Very Bad</option>
                                        <option value="2">2-Bad</option>
                                        <option value="3">3-Okay</option>
                                        <option value="4">4-Good</option>
                                        <option value="5">5-Excellent</option>
                                    </select>
                                    <br/><br/>


                                    {/* <input style = {{width:20,height:20,borderRadius:5,textAlign:'center'}} value={userRating} /> <br /><br /> */}
                                    Comment: <br /><textarea style = {{width:400,height:100,borderRadius:5}} value={userComment} onChange={(e)=>setuserComment(e.target.value)}/> <br />
                                    <button class="product_details_review_submit" onClick={submit_form} >Submit Review</button>
                                </>
                                
                            }

                        </>
                        :
                        <>
                        {/* <a href="/login_brad" target="_blank" class="product_details_login_review">Please Login to write Review</a> */}
                        <Link class="product_details_login_review" to="/login_brad" >
                            <div>Please Login to write Review</div>
                        </Link>
                        </>

                    }
                </>
            </div>
           
        </div>
    )
}

export default ProductDetails















// import React from 'react'
// // import { useSelector,useDispatch } from 'react-redux'


// function ProductDetails({match}) {
//     {console.log("MATCH- ",match);}
//     // const productList = useSelector(state => state.productList)

//     // const {loading,products,error}=productList
//     // console.log("ProductDetails wala prods",products);
//     return (
//         <div>
//             <h2></h2>
//         </div>
//     )
// }

// export default ProductDetails
