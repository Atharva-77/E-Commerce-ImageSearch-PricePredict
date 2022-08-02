import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router';
import { useSelector,useDispatch } from 'react-redux'
import { listProductDetails } from './Reducers/actions/productActions';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './ProductDetails.css'
import { Link } from '@material-ui/core';

const ProductDetails= ()=> {
    let history = useHistory();


    const {id}=useParams()
    // {console.log("MATCH- ",id);}


    const [qty, setqty] = useState(1)
    const [userRating, setuserRating] = useState(1)
    const [userComment, setuserComment] = useState('')
    const [reload, setreload] = useState(0)

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
            "rating":userLogin, //Lhs as mentioned in postman api tezting or in routes-->exercise_route.js . Name as mentioned as in router.post function
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
                console.log("(PRODUCTDetails) deleted",res.data,reload)
                setreload(!reload)
                console.log("RELOAD",reload);
            })

        // console.log("PROD IN SUBMIT",ProductData);

        // history.push(`/admin/product`)
        // setMessage(true)


         
        
    }

    return (
        <div>
            <h2>Yp {id}</h2>
            <div className="productDetails">
            
                    <div className="productDetails_info">
                        <p>{product.name}</p>

                        <p className="productDetails_price">
                            <small>$</small>
                            <strong>{product.price}</strong>
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
                
                <img className="productDetails_img" src={product.image} /> 
                {product.countInStock>0?<button onClick={addToBasket}>Add to Basket</button>:<h2>Out of Stock</h2>}
                <br />
                Quantity<input onChange={(e)=>setqty(e.target.value)}/> 
                <h2>{qty}</h2>  
                

                {/* <div>
                    {product.reviews.length==0?<h2>NO REVIEWS</h2>:
                    <>
                        {product.reviews.map((i)=>
                            <>
                                <p>{i.name}</p>
                                <p>{i.IndividualRating}</p>
                                <p>{i.createdAt}</p>
                                <p>{i.comment}</p>
                            
                            </>
                        )}

                    </>}
                </div> */}
            </div>

                <div className="reviewClass">
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
                            <h2>WRITE A REVIEW</h2>
                                Rating<input onChange={(e)=>setuserRating(e.target.value)}/> <br /><br />
                                Comment<input onChange={(e)=>setuserComment(e.target.value)}/> <br />
                                <button className="create_acc" onClick={submit_form} >Submit Review</button>

                            </>
                        :
                             <h2>Please <Link to={`/login_brad`}>Login</Link> to write Review</h2>
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
