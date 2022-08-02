import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router';
import { useSelector,useDispatch } from 'react-redux'
import { listProductDetails } from './Reducers/actions/productActions';

import { useHistory } from "react-router-dom";

const ProductDetails= ()=> {
    let history = useHistory();


    const {id}=useParams()
    // {console.log("MATCH- ",id);}


    const [qty, setqty] = useState(1)

    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch,id])

    const productDetails= useSelector(state => state.productDetails)
    const {loading,product,error}=productDetails
    // console.log("Product details wala prods",product);

    const addToBasket =()=>
    {
        history.push(`/checkout/${id}?qty=${qty}`)
    }

    return (
        <div>
            <h2>Yp {id}</h2>
            <div className="product">
            
                    <div className="product_info">
                        <p>{product.name}</p>

                        <p className="product_price">
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

                        {/* <div className="product_rating">
                            {Array(product.Avgrating)
                            .fill()
                            .map((_,i) =>
                            (
                                <p>⭐</p> 
                            ))}
                        </div> */}

                    </div>    
                
                <img className="product_img" src={product.image} /> 
                {product.countInStock>0?<button onClick={addToBasket}>Add to Basket</button>:<h2>Out of Stock</h2>}
                <br />Quantity<input onChange={(e)=>setqty(e.target.value)}/> 
                <h2>{qty}</h2>  
                
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
//     // console.log("Product wala prods",products);
//     return (
//         <div>
//             <h2></h2>
//         </div>
//     )
// }

// export default ProductDetails
