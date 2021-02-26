import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct';


function Checkout() {
    const [{basket},dispatch]=useStateValue();

    return (
        <div className="checkout">
            <div className="shopping_title" >
                <h2 >Your Shopping Basket</h2> 
            {/* </div> */}

            <div>
            {basket.map(item => (
                <CheckoutProduct 
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
                />

            )
            )}

             </div></div>

            <div className="subtotalcompo">
                 <Subtotal/> 
            </div>

           
        </div>
    )
}

export default Checkout
