import {
    CART_ADD_BASKET, 
    CART_REMOVE_BASKET, 
    CART_SAVE_SHIPPING_ADDRESS ,
    CART_PAYMENT_METHOD} from '../constants/cartConstants'
import axios from 'axios'

// const addTocart = () =>
// {
//     return {
//         type: CART_ADD_BASKET
//     }
// }
                                            // with getState u cn access any
export const cartListDetails = (id,qty) => async(dispatch,getState)=> {

    const {data}= await axios.get(`http://localhost:4000/products/${id}`)
console.log("CARTACtions.js",{data});
// console.log("CARTACtions.js id:- ",data._id);
    dispatch({
        type: CART_ADD_BASKET,
        payload:{
            idname:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            avgrating: data.Avgrating,
            user:data.user,
            qty


        }
    })

    localStorage.setItem('cartItemsss',JSON.stringify(getState().cartList.cartItemsss))
    // console.log("CART ACTIONS",(localStorage.getItem('cartItemr',JSON.stringify(getState().cartList.cartItemr))));
}

export const removeCartAction =(id) => async(dispatch) =>{

    dispatch({
        type:CART_REMOVE_BASKET,
        payload:{
            idname:id
        }
    })

}



export const saveShippingAddressAction =(data) => async(dispatch) =>{

    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })

}


export const paymentMethodAction =(data) => async(dispatch) =>{

    dispatch({
        type:CART_PAYMENT_METHOD,
        payload:data
    })

}