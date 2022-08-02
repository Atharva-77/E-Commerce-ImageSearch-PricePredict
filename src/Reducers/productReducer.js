import {PRODUCT_LIST_REQUEST,
        PRODUCT_LIST_SUCCESS,
        PRODUCT_LIST_FAILURE,
        
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAILURE, } from './constants/productConstants' 

const initialState=
{
    loading: true,
    products:[],
    error:''
}

export const productListReducer = ( state=initialState, action)=>
{
    switch(action.type){
        case PRODUCT_LIST_REQUEST: return {
            ...state,
            loading:true
        }

        case PRODUCT_LIST_SUCCESS: return {
            ...state,
            loading: false,
            products: action.payload
        }

        case PRODUCT_LIST_FAILURE: return {
            ...state,
            loading: false,
            error: action.payload
        }

        default:
            return state
    }
}

//Product Details Reducer

const initialStateDetails=
{
    loading: true,
    product:{reviews:[]},
    error:''
}

export const productDetailsReducer = ( state=initialStateDetails, action)=>
{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST: return {
            ...state,
            loading:true
        }

        case PRODUCT_DETAILS_SUCCESS: return {
            ...state,
            loading: false,
            product: action.payload
        }

        case PRODUCT_DETAILS_FAILURE: return {
            ...state,
            loading: false,
            error: action.payload
        }

        default:
            return state
    }
}

// export default productListReducer

