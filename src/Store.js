import {createStore, applyMiddleware, combineReducers} from "redux"
import thunk from 'redux-thunk'
import {productListReducer,SellerproductListReducer, productDetailsReducer,ImageproductReducer} from './Reducers/productReducer'
import {composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from "./Reducers/cartReducer";
import { userLoginReducer,userRegisterReducer, userProfileDetailsReducer,adminUserListReducer } from "./Reducers/userReducer";
import { orderListReducer,getorderListReducer,orderPayReducer, getAdminorderListReducer,getSellerOrderListReducer } from "./Reducers/orderReducer";


// const initialState={}


const reducer=combineReducers({
    productList: productListReducer, 
    // featureR:featureReducer,
    SellerproductList:SellerproductListReducer,
    productDetails: productDetailsReducer,
    Imageproduct:ImageproductReducer,

    cartList: cartReducer,


    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userProfileDetails:userProfileDetailsReducer,
    adminUserList:adminUserListReducer,
    
    orderList:orderListReducer,
    getorderList:getorderListReducer,
    orderPay:orderPayReducer,
    getAdminorderList:getAdminorderListReducer,
    getSellerOrderList:getSellerOrderListReducer,
    // getAdminorderList:getAdminorderListReducer,
    
})


// const cartItemStorage= localStorage.getItem('cartItemsss') ? JSON.parse(localStorage.getItem('cartItemsss')): []
    
// const cartItemStorage=[]
// console.log("STORECartItem",cartItemStorage);

    // const initialState=
    // {
    //     cartList: {cartItemsss:cartItemStorage}
    // }
// const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(thunk)))

const store=createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store;