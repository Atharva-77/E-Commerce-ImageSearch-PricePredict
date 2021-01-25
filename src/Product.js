import React from 'react'
import './Product.css'
import {useStateValue} from './StateProvider';

function Product({title,price,rating,image}) {
    
    const [{basket},dispatch]= useStateValue();
    console.log("The basket has --->", basket)

    const addToBasket=() => {
        //dispatch item into data layer
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };
    
    
    
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
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
