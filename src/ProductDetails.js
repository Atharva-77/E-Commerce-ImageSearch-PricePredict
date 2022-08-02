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
        <div>
            <div className="productDetails">
                    <div className="productDetails_info">
                        {/* <!-- <img class="product_img" src={product.image} /> --> */}
                        <img class="product_details_img" src={product.image} />

                        <p class="product_details_name">{product.name}</p>
                        
                        <p class="product_details_price_text">M.R.P.: </p>
                        <p class="product_details_price">Rs. 420.69
                        {product.countInStock>0?<button class="buy_button" onClick={addToBasket}>Add to Basket</button>:<h2>Out of Stock</h2>}
                        </p>

                        {/* <!-- <p class="product_desc">{product.description}</p><br /> --> */}
                        <p class="product_details_desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                            Morbi ac risus cursus, elementum ligula ut, pulvinar justo. <br />
                            Fusce feugiat mollis tortor sed rutrum. Cras molestie ultricies nibh, ac luctus eros ullamcorper non. Nam in elit sapien. <br />
                            Fusce enim sem, egestas molestie orci nec, dapibus auctor sapien. <br />
                            Mauris id massa et leo dictum lobortis dictum id eros. Morbi vel tristique dui. <br />
                            In ac nisl felis. Cras condimentum ex vel massa sodales imperdiet. Integer felis elit, vehicula efficitur porta vel, tempor sit amet felis. <br />
                            Praesent nisl urna, consectetur vitae nibh et, vulputate rhoncus enim. <br />
                        </p>

                        <p>{product.description}</p> <br />
                        Number of reviews:-<p>{product.noOfReview}</p>
                       
                        Stock avaliable:-<p>{product.countInStock}</p>
                        {
                            [...Array(product.countInStock).keys()].map((x) =>(
                                <option key={x+1} value={x+1}>{x+1}</option>
                            ) )
                        }

                        {/* <div className="productDetails_rating">
                            {Array(product.Avgrating)
                            .fill()
                            .map((_,i) =>
                            (
                                <p>⭐</p> 
                            ))}
                        </div> */}

                    </div>
                <br />
                Quantity<input onChange={(e)=>setqty(e.target.value)}/> 
                <h2>{qty}</h2>  
                

                
            </div>

                <div className="reviewClass">
                   <strong> Product Rating:- </ strong>{product.Avgrating} <br /> 
                   <strong>Total User Reviewed The Product:- </strong>{product.reviews.length}
                    {product.reviews.length==0?<h2>NO REVIEWS</h2>:
                        <>
                            <h2>REVIEWS</h2><br />
                            {product.reviews.map((i)=>
                                <>
                                    <p><strong>Name:-</strong>{' '}{i.name}</p>
                                    <p><strong>Rating:-</strong>{' '}{i.IndividualRating}</p>
                                    <p><strong>Posted At:-</strong>{' '}{i.createdAt.substring(0,10)}</p>
                                    <p><strong>Comment:-</strong>{' '}{i.comment}</p>
                                    <br />
                                </>
                            )}

                        </>
                    }
                    <>
                        
                        {userInfo.length!=0?
                            <>
                                {AlreadyReview?
                                    <h4>You Have ALready Reviewed Product</h4>
                                    :
                                    <>
                                        <h2>WRITE A REVIEW</h2>
                                        Rating<input value={userRating} onChange={(e)=>setuserRating(e.target.value)}/> <br /><br />
                                        Comment<input value={userComment} onChange={(e)=>setuserComment(e.target.value)}/> <br />
                                        <button className="create_acc" onClick={submit_form} >Submit Review</button>
                                    </>
                                    
                                }
                           

                            </>
                         :
                            <>
                            <Link to="/login_brad">
                                <div > Please Login to write Review</div>   
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
