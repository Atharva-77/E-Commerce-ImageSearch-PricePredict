import {    ORDER_LIST_REQUEST,
            ORDER_LIST_SUCCESS,
            ORDER_LIST_FAILURE,

            GET_ORDER_LIST_REQUEST,
            GET_ORDER_LIST_SUCCESS,
            GET_ORDER_LIST_FAILURE,
            
        
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

