import {PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILURE,
    
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE, } from '../constants/productConstants' 

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

    
export const listProduct =()=> async(dispatch)=> {

    try 
    {
        dispatch(productListRequest())
        const {data}= await axios.get('http://localhost:4000/products')
        // console.log("Prod actions data ",data);
        dispatch(productListSuccess(data))
    } catch (error) {

        dispatch(productListFailure(error))
        
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