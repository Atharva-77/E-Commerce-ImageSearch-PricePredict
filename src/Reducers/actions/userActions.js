import {USER_LOGIN_REQUEST,
        USER_LOGIN_SUCCESS,
        USER_LOGIN_FAILURE,
    
        } from '../constants/userConstants' 


import axios from 'axios';

    const userLoginRequest = () =>
    {
        return {
            type:USER_LOGIN_REQUEST
        }
    }
    
    const userLoginSuccess = data =>
    {
        return{
          type:USER_LOGIN_SUCCESS, 
          payload: data
        }
    }
    
    const userLoginFailure = error =>
    {
        return{
           type:USER_LOGIN_FAILURE,
           payload: error
        }
    }

    
export const userAction_details =(email,password)=> async(dispatch)=> {

    try 
    {
        dispatch(userLoginRequest())

        const config={
            headers:{
                'Content-Type':"application/json"
            }
        }

        const {data}= await axios.post('http://localhost:4000/login_brad/add',{email,password},config)

        dispatch(userLoginSuccess(data))

        // localStorage.setItem('cartItemsss',JSON.stringify(getState().cartList.cartItemsss))

    } catch (error) {

        dispatch(userLoginFailure(error))
        
    }
}

