
import React,{useEffect} from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
// import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { useHistory } from 'react-router'; 
import { useParams } from 'react-router';

import { useDispatch,useSelector } from 'react-redux';

import { cartListDetails } from './Reducers/actions/cartActions';

import { Link } from 'react-router-dom';


function Checkout({match,location}) {
    // const [{basket},dispatch]=useStateValue();
    let summ=0;
    let total_item=0;

    let history = useHistory()
    const {id}=useParams()
    // {console.log("CART MATCH- ",id);}
    
    const url=window.location.href
    // {console.log("QTY,",url.split("/"));}

    const url_or_empty=url.split("/")
    // const len_url_or_empty= url_or_empty.length
    // {console.log("Url or checkout",len_url_or_empty);}
    // {console.log("4/5:-",typeof(url_or_empty[4])=='undefined');}
    
    const url_qty=typeof(url_or_empty[4])=='undefined'? 0:(url ? Number( url.split("?")[1].split("=")[1]) : 1)
    {console.log("URL QTY",url_qty);}

    // {console.log("QTY,",url);}

    const dispatch=useDispatch()
    const cartList = useSelector(state => state.cartList)
    const {basketItems}=cartList

    console.log("BASKET IS",basketItems);

    useEffect(() => {
        if(id)
        {
            dispatch(cartListDetails(id,url_qty))
        }
        
    }, [dispatch,id,url_qty]);


    return (
        <div className="checkout">
            <div  className="checkout__left">
              <div>
                 <h2 className="shopping_title">Your Shopping Basket</h2> 
                 <h2>Shopping Cart</h2>
                 {basketItems.length===0?
                   <div>
                     <h2>Your cart is empty</h2>
                     <Link to="/">Go back</Link>
                   </div>
                     :
                  <div>
                      {basketItems.map((item) => (
                        //   <Link to={``}></Link>
                        <div>
                       <CheckoutProduct 
                           id={item.idname}
                           title={item.name}
                           price={item.price}
                           rating={item.avgrating}
                           imageURL={item.imageURL}
                           imageFile={item.imageFile}
                           qty={item.qty}
                           countInStock={item.countInStock}
                        />
                        
                         {console.log("Upar",summ+=item.price*item.qty,total_item+=item.qty) }
                         {/* {console.log("Upar",summ+=item.price*item.qty) } */}

                         </div>
                      ))}
                  </div>

                 }
                
                </div>

            </div>

                {console.log("SUmm= ",summ,total_item)}
                {console.log("Baket qty= ",basketItems.length)}
            <div className="subtotalcompo">
                 <Subtotal totalItems={total_item} price={summ}/> 
            </div>

           
        </div>
    )
}

export default Checkout












// ---------------------------------------------
// import React from 'react'
// import './Checkout.css'
// import Subtotal from './Subtotal'
// import {useStateValue} from './StateProvider';
// import CheckoutProduct from './CheckoutProduct';


// function Checkout() {
//     const [{basket},dispatch]=useStateValue();

//     return (
//         <div className="checkout">
//             <div  >
//                 <h2 >Your Shopping Basket</h2> 
//             {/* </div> */}

//             <div>
//             {basket.map(item => (
//                 <CheckoutProduct 
//                 title={item.title}
//                 price={item.price}
//                 rating={item.rating}
//                 image={item.image}
//                 />
//                 // <CheckoutProduct 
//                 //     title="The Lean Startup"
//                 //     price={20.00}
//                 //     rating={3}
//                 //     image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"/>
                   
//                 //     <CheckoutProduct 
//                 //     title="Mixer | Vidiem MG 541 A VSTAR Evo Plus 750 Watts Mixer Grinder"
//                 //     price={20.00}
//                 //     rating={3}
//                 //     image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"/>

//              ))} 

//              </div>
//              </div>

//             <div className="subtotalcompo">
//                  <Subtotal/> 
//             </div>

           
//         </div>
//     )
// }

// export default Checkout

// -----------------------------

