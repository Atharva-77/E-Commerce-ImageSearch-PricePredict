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
    FEATURE_DATA_FAILURE} from '../constants/productConstants' 

import axios from 'axios';

    const productListRequest = () =>
    {
        return {
            type: PRODUCT_LIST_REQUEST
        }
    }
    
    const productListSuccess = data =>
    {
        return{
          type: PRODUCT_LIST_SUCCESS, 
          payload: data
        }
    }
    
    const productListFailure = error =>
    {
        return{
           type: PRODUCT_LIST_FAILURE,
           payload: error
        }
    }

    
export const listProduct =(keyword='')=> async(dispatch)=> {

    try 
    {
        dispatch(productListRequest())

        const {data}= await axios.get(`http://localhost:4000/products?keyword=${keyword}`)
        // console.log("Prod actions data ",data);
        dispatch(productListSuccess(data))
    } catch (error) {

        dispatch(productListFailure(error))
        
    }
}







//FEATURE DATA
// const featureDataRequest = () =>
// {
//     return {
//         type: FEATURE_DATA_REQUEST
//     }
// }

// const featureDataSuccess = data =>
// {
//     return{
//       type: FEATURE_DATA_SUCCESS, 
//       payload: data
//     }
// }

// const featureDataFailure = error =>
// {
//     return{
//        type: FEATURE_DATA_FAILURE,
//        payload: error
//     }
// }


// export const feature_action =()=> async(dispatch)=> {

// try 
// {
//     dispatch(featureDataRequest())

//     const {data}= await axios.get("http://localhost:4000http://localhost:4000/imgFeature/")
//     dispatch(featureDataSuccess(data))
// } catch (error) {

//     dispatch(featureDataFailure(error))
    
// }
// }









//Seller product

const SellerproductListRequest = () =>
{
    return {
        type: SELLER_PRODUCT_LIST_REQUEST
    }
}

const SellerproductListSuccess = data =>
{
    return{
      type: SELLER_PRODUCT_LIST_SUCCESS, 
      payload: data
    }
}

const SellerproductListFailure = error =>
{
    return{
       type: SELLER_PRODUCT_LIST_FAILURE,
       payload: error
    }
}


export const SellerlistProduct =()=> async(dispatch,getState)=> {

try 
{
    const {userLogin:{userInfo}} = getState()
    dispatch(SellerproductListRequest())
    const config={
                headers:{
                    // 'Content-Type':"application/json",
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
    const {data}= await axios.get(`http://localhost:4000/products/seller/allproducts`,config)
    // console.log("Prod actions data ",data);
    dispatch(SellerproductListSuccess(data))
} catch (error) {

    dispatch(SellerproductListFailure(error))
    
}
}






//Product Details Actions

const productDetailsRequest = () =>
{
    return {
        type: PRODUCT_DETAILS_REQUEST
    }
}

const productDetailsSuccess = data =>
{
    return{
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    }
}

const productDetailsFailure = error =>
{
    return{
       type: PRODUCT_DETAILS_FAILURE,
       payload: error
    }
}


export const listProductDetails =(id)=> async(dispatch)=> {

    try 
    {
        dispatch(productDetailsRequest())
        const {data}= await axios.get(`http://localhost:4000/products/${id}`)
        // console.log("Prod list details actions data ",data);
        dispatch(productDetailsSuccess(data))
    } catch (error) {

        dispatch(productDetailsFailure(error))
        
    }
}










//Img Prod Search
const ImgproductDetailsRequest = () =>
{
    return {
        type: IMG_PRODUCT_DETAILS_REQUEST
    }
}

const ImgproductDetailsSuccess = data =>
{
    return{
      type: IMG_PRODUCT_DETAILS_SUCCESS,
      payload: data
    }
}

const ImgproductDetailsFailure = error =>
{
    return{
       type: IMG_PRODUCT_DETAILS_FAILURE,
       payload: error
    }
}


export const ImgProductDetails_action =(prod_ids)=> async(dispatch)=> {

    try 
    {
        dispatch(ImgproductDetailsRequest())
        // console.log("IMG PROD ",prod_ids);

        const product_ids=
        {
            "product_ids":prod_ids
        }
        // console.log("IMG PROD2 ",product_ids);

        
        const {data}= await axios.post(`/imgFeature/products`,prod_ids)
        // console.log("IMG PROD ACTION",data);
        dispatch(ImgproductDetailsSuccess(data))
    } catch (error) {

        dispatch(ImgproductDetailsFailure(error))
        
    }
}