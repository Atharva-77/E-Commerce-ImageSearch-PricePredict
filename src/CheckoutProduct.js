import React from 'react'
import './CheckoutProduct.css'

function CheckoutProduct({title,price,rating,image}) {
    return (
        <div className="checkout_product">
            <div className="checkout_product_info"> 

                <p>{title}</p>

                <p className="checkout_product_price">
                    <small>$</small>
                     <strong>{price}</strong>
                 </p>
                <div className="checkout_product_rating">
                   {/* WHat is this below? */}
                   {Array(rating)
                   .fill()
                   .map((_,i) =>
                   (
                    <p>⭐</p> 
                   ))}
                    
                </div>
            </div>    
             
            <img className="checkout_product_img" src={image} /> 
            {/* https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_ST400_.jpg */}
            {/* https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg */}
            <button>Remove to Basket</button>
        </div>
    
    )
}

export default CheckoutProduct
