import React from 'react'
import { Link } from 'react-router-dom';
import './Product.css'
// import {useStateValue} from './StateProvider';
import { useHistory } from "react-router-dom";

function Product({id,title,price,rating,imageURL,imageFile,countInStock}) {
    // console.log("IMG.FILE",imageFile);
    // log
    // console.log("IMG.datas",id,title,price,rating,imageURL,);
    let history = useHistory();

    let rate;
    rate=Math.round(rating)

    // if((typeof(imageFile)=='undefined') )
    //  console.log("IF");
    // else
    // {
    //     console.log("ELSE IMG.FILE",imageFile.data.data);
    //     console.log("ELSE len",imageURL.length);
    // }  

    const addToBasket =()=>
    {
        history.push(`/checkout/${id}?qty=1`)
    }

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
                    <p>⭐</p> 
                   ))}
                    
                </div> */}
            </Link>
            </div>    
          { imageURL.length>7 ?<img className="product_img" src={imageURL} />
           :
           (typeof(imageFile)!='undefined') ?<img className="product_img" src={`${"data:image/png;base64," +new Buffer.from(imageFile.data.data).toString("base64")}`} />:null
          }
          
            {/* {(typeof(imageFile)!='undefined') && imageURL.length>0?<img className="product_img" src={`${"data:image/png;base64," +new Buffer.from(imageFile.data.data).toString("base64")}`} />:null} */}
          
             
           
            <p className="product_price" style = {{textAlign:'center'}}>
                {rate>0?
                        <div className="product_rating">
                        {Array(rate)
                        .fill()
                        .map((_,i) =>
                        (
                            <p>⭐</p> 
                        ))}
                            
                        </div>
                    :
                    <p className="product_notRated"><strong>UnRated</strong></p>
                    // <br />    
                }

                <small>₹ </small>
                <strong>{price}</strong>
            </p>
            {/* https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_ST400_.jpg */}
            {/* https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg */}
          
            {countInStock>0?
                <button onClick={addToBasket} style={{width:200, borderRadius:5, height:23}}>Add to Basket</button>
                :
                <p className="product_outOfStock">Out Of Stock</p>}
            
            {/* <button onClick={addToBasket} style={{width:200, borderRadius:5, height:23}}>Add to Basket</button> */}

        </div>
    )
}

export default Product