import {PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILURE,
    
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,

    SELLER_PRODUCT_LIST_REQUEST,
    SELLER_PRODUCT_LIST_SUCCESS,
    SELLER_PRODUCT_LIST_FAILURE, } from '../constants/productConstants' 

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