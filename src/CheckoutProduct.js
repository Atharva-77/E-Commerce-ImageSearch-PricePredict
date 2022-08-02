import { Link } from 'react-router-dom';
import React from 'react'
import './CheckoutProduct.css'

import { useDispatch,useSelector } from 'react-redux';

import { cartListDetails,removeCartAction } from './Reducers/actions/cartActions';



function CheckoutProduct({id,title,price,rating,image,qty,countInStock}) {
    const dispatch=useDispatch()

    const removeFromCart=(id)=>
    {
        dispatch(removeCartAction(id))
    }

    return (
        <div className="checkout_product">
          <img className="checkout_product_img" src={image} /> 

            <div className="checkout_product_info"> 
                <Link to={`/product/${id}`}>
                    <p className="checkout_product_title">{title}</p>
                </Link>
                <p className="checkout_product_price">
                    <small>₹ </small>
                     <strong>{price}</strong>
                 </p>
                 
                <div className="checkout_product_rating">
                   {Array((rating))
                   .fill()
                   .map((_,i) =>
                   (
                    <p>⭐</p> 
                   ))}
                    
                </div>

                <br />
                Quantity <label value={qty}
                                    onChange={(e)=>dispatch(cartListDetails(id,Number(e.target.value)))}/> 


                        <select>
                            {
                            [...Array(countInStock).keys()].map((x) =>(
                                        <option key={x+1} value={x+1}>{x+1}</option>
                            ) )
                            }
                        </select>
                        <br/>
                        <br/>
                <button onClick={()=> removeFromCart(id)}>Remove from Basket</button>
                
                {/* Quantity<input value={qty}
                                    onChange={(e)=>dispatch(cartListDetails(id,Number(e.target.value)))}/> 
                        
                         Stock avaliable:-
                            {
                                [...Array(countInStock).keys()].map((x) =>(
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                ) )
                            }
                <button onClick={()=> removeFromCart(id)}>Remove to Basket</button> */}

            </div>    
             
            {/* https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_ST400_.jpg */}
            {/* https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg */}
        </div>
    
    )
}

export default CheckoutProduct
