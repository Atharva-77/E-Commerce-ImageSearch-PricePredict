import {USER_LOGIN_REQUEST,
        USER_LOGIN_SUCCESS,
        USER_LOGIN_FAILURE,
        USER_LOGOUT,

        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAILURE,

        USER_DETAILS_REQUEST,
        USER_DETAILS_SUCCESS,
        USER_DETAILS_FAILURE,
        
        } from '../constants/userConstants' 


import axios from 'axios';

//LOGIN
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

    const userLogout = () =>
    {
        return {
            type:USER_LOGOUT
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







//Logout

export const logout_action=()=>async(dispatch)=> 
{
    dispatch(userLogout())
}





//Register
const userRegisterRequest = () =>
    {
        return {
            type:USER_REGISTER_REQUEST
        }
    }
    
    const userRegisterSuccess = data =>
    {
        return{
          type:USER_REGISTER_SUCCESS, 
          payload: data
        }
    }
    
    const userRegisterFailure = error =>
    {
        return{
           type:USER_REGISTER_FAILURE,
           payload: error
        }
    }

export const userRegisterAction_details =(name,email,password)=> async(dispatch)=> {

    try 
    {
        dispatch(userRegisterRequest())

        const config={
            headers:{
                'Content-Type':"application/json"
            }
        }
        console.log("After config");
        const {data}= await axios.post('http://localhost:4000/register_brad/add',{name,email,password},config)
        console.log("After data");
        dispatch(userRegisterSuccess(data))
        dispatch(userLoginSuccess(data))
        // localStorage.setItem('cartItemsss',JSON.stringify(getState().cartList.cartItemsss))

    } catch (error) {
        console.log("User Register actions");
        dispatch(userRegisterFailure(error))
        
    }
}





//UserProfileDetails
const userProfileDetailsRequest = () =>
    {
        return {
            type:USER_DETAILS_REQUEST
        }
    }
    
    const userProfileDetailsSuccess = data =>
    {
        return{
          type:USER_DETAILS_SUCCESS, 
          payload: data
        }
    }
    
    const userProfileDetailsFailure = error =>
    {
        return{
           type:USER_DETAILS_FAILURE,
           payload: error
        }
    }

export const userProfileAction_details =(id)=> async(dispatch,getState)=> {

    try 
    {
        dispatch(userProfileDetailsRequest())

        const {userLogin:{userInfo}} = getState()
       
        //Q.use??
        const config={
            headers:{
                'Content-Type':"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        console.log("Profile After config");
        //Q.WHy not direct profile in place of id?
        const {data}= await axios.get(`http://localhost:4000/login_brad/${id}`,config)
        console.log("Profile After data",data);
        dispatch(userProfileDetailsSuccess(data))
       

    } catch (error) {
        console.log("User UserProfileDetails actions");
        dispatch(userProfileDetailsFailure(error))
        
    }
}

