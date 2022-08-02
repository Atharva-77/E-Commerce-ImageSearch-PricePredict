import {    ORDER_LIST_REQUEST,
            ORDER_LIST_SUCCESS,
            ORDER_LIST_FAILURE,

            GET_ORDER_LIST_REQUEST,
            GET_ORDER_LIST_SUCCESS,
            GET_ORDER_LIST_FAILURE,

            ORDER_PAY_REQUEST,
            ORDER_PAY_SUCCESS,
            ORDER_PAY_FAILURE,
            ORDER_PAY_RESET,

            ADMIN_ORDER_LIST_REQUEST,
            ADMIN_ORDER_LIST_SUCCESS,
            ADMIN_ORDER_LIST_FAILURE,

            SELLER_ORDER_LIST_REQUEST,
            SELLER_ORDER_LIST_SUCCESS,
            SELLER_ORDER_LIST_FAILURE,
            ORDER_LIST_RESET,
            
        
        } from './constants/orderConstants' 

const initialState=
{
    loading: true,
    order:[],
    success:false,
    error:''
}

export const orderListReducer = ( state=initialState, action)=>
{
switch(action.type){
    case ORDER_LIST_REQUEST: return {
        // ...state,
        loading:true
    }

    case ORDER_LIST_SUCCESS: return {
        // ...state,
        loading: false,
        success:true,
        order: action.payload
    }

    case ORDER_LIST_FAILURE: return {
        // ...state,
        loading: false,
        error: action.payload
    }
    case ORDER_LIST_RESET: return {
        loading: false,
        order:[],
        success:false,
        error:''
        // ...state,

    }

    default:
        return state
}
}


//GET ORDER LIST
const initialGetState=
{
    loading: true,
    getOrderItems:[],
    // shippingAddress:{},
    error:''
}


export const getorderListReducer = ( state=initialGetState, action)=>
{
switch(action.type){
    case GET_ORDER_LIST_REQUEST: return {
        ...state,  //Q.can u comment this and see
        loading:true
    }

    case GET_ORDER_LIST_SUCCESS: return {
        // ...state,
        loading: false,
        getOrderItems: action.payload
    }

    case GET_ORDER_LIST_FAILURE: return {
        // ...state,
        loading: false,
        error: action.payload
    }

    default:
        return state
}
}










//ADMIN GET ORDER LIST
const initialAdminGetState=
{
    loading: true,
    AdmingetOrderItems:[],
    // shippingAddress:{},
    error:''
}


export const getAdminorderListReducer = ( state=initialAdminGetState, action)=>
{
switch(action.type){
    case ADMIN_ORDER_LIST_REQUEST: return {
        ...state,  //Q.can u comment this and see
        loading:true
    }

    case ADMIN_ORDER_LIST_SUCCESS: return {
        ...state,
        loading: false,
        AdmingetOrderItems: action.payload
    }

    case ADMIN_ORDER_LIST_FAILURE: return {
        ...state,
        loading: false,
        error: action.payload
    }

    default:
        return state
}
}








//SELLER GET ORDER LIST
const initialSellerGetState=
{
    loading: true,
    SellergetOrderItems:[],
    // shippingAddress:{},
    error:''
}


export const getSellerOrderListReducer = ( state=initialSellerGetState, action)=>
{
switch(action.type){
    case SELLER_ORDER_LIST_REQUEST: return {
        ...state,  //Q.can u comment this and see
        loading:true
    }

    case SELLER_ORDER_LIST_SUCCESS: return {
        ...state,
        loading: false,
        SellergetOrderItems: action.payload
    }

    case SELLER_ORDER_LIST_FAILURE: return {
        ...state,
        loading: false,
        error: action.payload
    }

    default:
        return state
}
}



















//PAY REDUCER
const initialPayState=
{
    loading: true,
    success:false,
    error:''
}


export const orderPayReducer = ( state=initialPayState, action)=>
{
switch(action.type){
    case ORDER_PAY_REQUEST: return {
        // ...state,  //Q.can u comment this and see
        loading:true
    }

    case ORDER_PAY_SUCCESS: return {
        // ...state,
        loading: false,
        success: true
    }

    case ORDER_PAY_FAILURE: return {
        // ...state,
        loading: false,
        error: action.payload
    }
    //Empty
    case ORDER_PAY_RESET: return {

    }

    default:
        return state
}
}