import {USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_REGISTER_RESET,

    USER_DETAILS_REQUEST,//PROFILE
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,
    USER_DETAILS_RESET,

    USER_LOGOUT,

    ADMIN_USER_LIST_REQUEST,
    ADMIN_USER_LIST_SUCCESS,
    ADMIN_USER_LIST_FAILURE} from './constants/userConstants' 

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
        loading: false,
        userInfo:[],
        error:''
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
    case USER_REGISTER_RESET: return {
        loading: false,
        userInfoR:[],
        errorR:''
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
    case USER_DETAILS_RESET: return {
        loading: false,
        user:[],
        error:''
        // ...state,

    }

    default:
        return state
}
}


const initialAdminUserListState=
{
    loading: false,
    users:[],
    error:''
}


//ADMIN USERS
export const adminUserListReducer = ( state=initialAdminUserListState, action)=>
{
switch(action.type){
    case ADMIN_USER_LIST_REQUEST: return {
        // ...state,
        loading:true
    }

    case ADMIN_USER_LIST_SUCCESS: return {
        // ...state,
        loading: false,
        users: action.payload
    }

    case ADMIN_USER_LIST_FAILURE: return {
        // ...state,
        loading: false,
        error: action.payload
    }

    

    default:
        return state
}
}
