import React from 'react'
import { Link } from 'react-router-dom';
import './Product.css'
// import {useStateValue} from './StateProvider';

function Product({id,title,price,rating,image}) {
    // console.log("Product compo",id,title,price,rating,image);
    // const [{basket},dispatch]= useStateValue();
    // console.log("The basket has --->", basket)

    // const addToBasket=() => {
    //     //dispatch item into data layer
    //     dispatch({
    //         type: "ADD_TO_BASKET",
    //         item: {
    //             title: title,
    //             image: image,
    //             price: price,
    //             rating: rating,
    //         },
    //     });
    // };
    
    
    
    return (
        <div className="product"> 
            
            <div className="product_info">

            <Link to={`/product/${id}`} style={{ textDecoration: 'none' ,color:'#374151',textAlign:'center'}}>
                <p>{title}</p>
        
                {/* <div className="product_rating">
                   {Array(rating)
                   .fill()
                   .map((_,i) =>
                   (
                    <p>:star:</p> 
                   ))}
                    
                </div> */}
            </Link>
            </div>    
            <img className="product_img" src={image} />
            <p className="product_price" style = {{textAlign:'center'}}>
                <p>:star::star::star::star:</p>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            {/* https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_ST400_.jpg */}
            {/* https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg */}
            
            <button style={{width:200, borderRadius:5, height:23}}>Add to Basket</button>

        </div>
    )
}

export default Product