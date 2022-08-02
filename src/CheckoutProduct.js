import { Link } from 'react-router-dom';
import React,{useState} from 'react'
import './CheckoutProduct.css'

import { useDispatch,useSelector } from 'react-redux';

import { cartListDetails,removeCartAction } from './Reducers/actions/cartActions';



function CheckoutProduct({id,title,price,rating,imageURL,imageFile,qty,countInStock}) {
    const dispatch=useDispatch()
    console.log("CKOUT",qty);
    const [qty1, setqty1] = useState(qty)
    console.log("QTY1,QTY",qty1,qty);
    let i=qty;

    let rate;
    rate=Math.round(rating)
    
    const removeFromCart=(id)=>
    {
        dispatch(removeCartAction(id))
    }

    const changeQty=(e)=>
    {
        setqty1(e.target.value);
        dispatch(cartListDetails(id,Number(e.target.value)))
    }

    console.log("IMG URL",imageURL)
    console.log("IMG FILE",imageFile)
    return (
        <div className="checkout_product">
            
             {(typeof(imageURL)!='undefined') && imageURL.length>7 ?
                            //  <h2>KYUJI</h2>
                            <img className="checkout_product_img" src={imageURL} />
                              :
                            //   <h2>YOJI</h2>
                              (typeof(imageURL)!='undefined') ?
                                <img className="checkout_product_img" src={`${"data:image/png;base64," +new Buffer.from(imageFile.data.data).toString("base64")}`} />
                                :        
                                null
            }

          {/* <img className="checkout_product_img" src={imageURL} />  */}

            <div className="checkout_product_info"> 
                <Link to={`/product/${id}`}>
                    <p className="checkout_product_title">{title}</p>
                </Link>
                <p className="checkout_product_price">
                    <small>₹ </small>
                     <strong>{price}</strong>
                 </p>
                 
                <div className="checkout_product_rating">
                   {Array((rate))
                   .fill()
                   .map((_,i) =>
                   (
                    <p>⭐</p> 
                   ))}
                    
                </div>

                <br />
                Quantity 
                {/* <label value={qty} onChange={(e)=>dispatch(cartListDetails(id,Number(e.target.value)))}/>  */}


                        <select value={qty1} onChange={(e)=>changeQty(e)}>
                            {
                            [...Array(countInStock).keys()].map((x) =>(
                                <>
                                <option key={x+1} value={x+1}>{x+1}</option>
                                        {/* {i==0?
                                        
                                            console.log("1st man"):
                                            console.log("2st man")
                                        }
                                        {i==1} */}
                                </>
                                        
                                        // <option key={x+1} value={x+1}>{x+1}</option>
                            ) )
                            }
                        </select>
                       
                        {/* <select>
                             {countInStock.map((option) => (
                            <option value={option.value}>{option.label}</option>
                             ))}
                        </select> */}
                         
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
