
import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import {useStateValue} from './StateProvider';
import { getBasketTotal } from './reducer';

import { useHistory } from "react-router-dom";

function Subtotal({totalItems,price}) {

    // const [{basket},dispatch]= useStateValue();
    let history = useHistory();

    const checkoutHandler=()=>
    {
        history.push(`/login?redirect=shipping`)
    }

    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(value) => (
                <>
                 <p>
                     Subtotal ({totalItems}) items:-Total Cost <strong>{value}</strong>
                 </p>
                    {/* <small className="subtotal_gift">
                        <input type="checkbox" />This order contains gift
                    </small> */}
                 </>    
            )}
            decimalScale={2}
            value={price}    // {getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
            />
            <br />
            <button onClick={checkoutHandler}>Proceed to Checkout</button>
            
        </div>
    )
}

export default Subtotal
