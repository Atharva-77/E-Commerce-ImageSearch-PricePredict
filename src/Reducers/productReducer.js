import {PRODUCT_LIST_REQUEST,
        PRODUCT_LIST_SUCCESS,
        PRODUCT_LIST_FAILURE,
        
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAILURE,

        SELLER_PRODUCT_LIST_REQUEST,
        SELLER_PRODUCT_LIST_SUCCESS,
        SELLER_PRODUCT_LIST_FAILURE, 
    
        IMG_PRODUCT_DETAILS_REQUEST,
        IMG_PRODUCT_DETAILS_SUCCESS,
        IMG_PRODUCT_DETAILS_FAILURE,
    
        FEATURE_DATA_REQUEST,
        FEATURE_DATA_SUCCESS,
        FEATURE_DATA_FAILURE} from './constants/productConstants' 

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




//FeatureData
const initialFeatureState=
{
    loadingF: true,
    feature:[],
    errorF:''
}

export const featureReducer = ( state=initialFeatureState, action)=>
{
    switch(action.type){
        case FEATURE_DATA_REQUEST: return {
            ...state,
            loadingF:true
        }

        case FEATURE_DATA_SUCCESS: return {
            ...state,
            loadingF: false,
            feature: action.payload
        }

        case FEATURE_DATA_FAILURE: return {
            ...state,
            loading: false,
            errorF: action.payload
        }

        default:
            return state
    }
}










//SELLER PRODUCT
const initialSellerState=
{
    loading: true,
    Sellerproducts:[],
    error:''
}

export const SellerproductListReducer = ( state=initialSellerState, action)=>
{
    switch(action.type){
        case SELLER_PRODUCT_LIST_REQUEST: return {
            ...state,
            loading:true
        }

        case SELLER_PRODUCT_LIST_SUCCESS: return {
            ...state,
            loading: false,
            Sellerproducts: action.payload
        }

        case SELLER_PRODUCT_LIST_FAILURE: return {
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




//Img Product Reducer
const initialImageProd=
{
    loading: true,
    Imgproducts:[],
    error:''
}

export const ImageproductReducer = ( state=initialImageProd, action)=>
{
    switch(action.type){
        case  IMG_PRODUCT_DETAILS_REQUEST: return {
            ...state,
            loading:true
        }

        case IMG_PRODUCT_DETAILS_SUCCESS: return {
            ...state,
            loading: false,
            Imgproducts: action.payload
        }

        case  IMG_PRODUCT_DETAILS_FAILURE: return {
            ...state,
            loading: false,
            error: action.payload
        }

        default:
            return state
    }
}