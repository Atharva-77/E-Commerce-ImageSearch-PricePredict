import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import {useStateValue} from './StateProvider';

function Checkout() {

    return (
        <div className="checkout">
            <div className="shopping_title" >
                <h2 >Your Shopping Basket</h2>
                
            </div>
            <div className="subtotalcompo">
                 <Subtotal/> 
            </div>
        </div>
    )
}

export default Checkout
