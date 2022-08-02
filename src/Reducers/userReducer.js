import {USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,

    USER_LOGOUT} from './constants/userConstants' 

const initialUserState=
{
    loading: false,
    userInfo:[],
    error:''
}

//LOGIN
export const userLoginReducer = ( state=initialUserState, action)=>
{
switch(action.type){
    case USER_LOGIN_REQUEST: return {
        // ...state,
        loading:true
    }

    case USER_LOGIN_SUCCESS: return {
        // ...state,
        loading: false,
        userInfo: action.payload
    }

    case USER_LOGIN_FAILURE: return {
        // ...state,
        loading: false,
        error: action.payload
    }

    case USER_LOGOUT: return {
        // ...state,

    }

    default:
        return state
}
}



const initialRegisterState=
{
    loading: false,
    userInfoR:[],
    errorR:''
}



//REGISTER  
export const userRegisterReducer = ( state=initialRegisterState, action)=>
{
switch(action.type){
    case USER_REGISTER_REQUEST: return {
        // ...state,
        loading:true
    }

    case USER_REGISTER_SUCCESS: return {
        // ...state,
        loading: false,
        userInfoR: action.payload
    }

    case USER_REGISTER_FAILURE: return {
        // ...state,
        loading: false,
        errorR: action.payload
    }

    default:
        return state
}
}


const initialProfileState=
{
    loading: false,
    user:[],
    error:''
}

//User Profile Details
export const userProfileDetailsReducer = ( state=initialProfileState, action)=>
{
switch(action.type){
    case USER_DETAILS_REQUEST: return {
        // ...state,
        loading:true
    }

    case USER_DETAILS_SUCCESS: return {
        // ...state,
        loading: false,
        user: action.payload
    }

    case USER_DETAILS_FAILURE: return {
        // ...state,
        loading: false,
        error: action.payload
    }

    default:
        return state
}
}
