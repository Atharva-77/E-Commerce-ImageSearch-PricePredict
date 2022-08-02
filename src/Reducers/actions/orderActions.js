import {

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILURE,
    
    GET_ORDER_LIST_REQUEST,
    GET_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_FAILURE,
    
    } from '../constants/orderConstants' 


import axios from 'axios';

const orderListDetailsRequest = () =>
{
    return {
        type:ORDER_LIST_REQUEST
    }
}

const orderListDetailsSuccess = data =>
{
    return{
      type:ORDER_LIST_SUCCESS, 
      payload: data
    }
}

const orderListDetailsFailure = error =>
{
    return{
       type:ORDER_LIST_FAILURE,
       payload: error
    }
}

export const orderListAction_details =(order)=> async(dispatch,getState)=> {

try 
{
    dispatch(orderListDetailsRequest())

    const {userLogin:{userInfo}} = getState()
   
    //Q.use??
    const config={
        headers:{
            'Content-Type':"application/json",
            Authorization:`Bearer ${userInfo.token}`
        }
    }
    // console.log("Order After config");
    //Q.WHy not direct profile in place of id?
    // console.log("waiting for data");

    const {data}= await axios.post(`http://localhost:4000/order/add/`,order,config)

    // console.log("order After data",data);

    dispatch(orderListDetailsSuccess(data))
    // console.log("order success");
   

} catch (error) {
    console.log("User orderListDetails actions");
    dispatch(orderListDetailsFailure(error))
    
}
}





// get order details

const getorderListDetailsRequest = () =>
{
    return {
        type:GET_ORDER_LIST_REQUEST
    }
}

const getorderListDetailsSuccess = data =>
{
    return{
      type:GET_ORDER_LIST_SUCCESS, 
      payload: data
    }
}

const getorderListDetailsFailure = error =>
{
    return{
       type:GET_ORDER_LIST_FAILURE,
       payload: error
    }
}

export const getorderListAction_details =(id)=> async(dispatch,getState)=> {

    try 
    {
        dispatch(getorderListDetailsRequest())
    
        const {userLogin:{userInfo}} = getState()
       
        //Q.use??
        const config={
            headers:{
                // 'Content-Type':"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        // console.log("Order After config");
        //Q.WHy not direct profile in place of id?
        // console.log("waiting for data");
    
        const {data}= await axios.get(`http://localhost:4000/order/${id}`,config)
    
        // console.log("order After data",data);
    
        dispatch(getorderListDetailsSuccess(data))
        // console.log("order success");
       
    
    } catch (error) {
        console.log("User GetorderListDetails actions");
        dispatch(getorderListDetailsFailure(error))
        
    }
    }

