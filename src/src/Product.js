import React from 'react'
import './Product.css'


function Product({title,price,rating,image}) {
    return (
        <div className="product">
            <div className="product_info"> 

                <p>{title}</p>

                <p className="product_price">
                    <small>$</small>
                     <strong>{price}</strong>
                 </p>
                <div className="product_rating">
                   {/* WHat is this below? */}
                   {Array(rating)
                   .fill()
                   .map((_,i) =>
                   (
                    <p>⭐</p> 
                   ))}
                    
                </div>
            </div>    
             
            <img className="product_img" src={image} /> 
            {/* https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_ST400_.jpg */}
            {/* https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg */}
            <button>Add to Basket</button>
        </div>
    )
}

export default Product
