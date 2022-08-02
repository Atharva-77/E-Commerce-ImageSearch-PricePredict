import {
  CART_ADD_BASKET, 
  CART_REMOVE_BASKET, 
  CART_SAVE_SHIPPING_ADDRESS ,
  CART_PAYMENT_METHOD} from './constants/cartConstants'

const initialStateCart=
{
    loading: true,
    basketItems:[],
    shippingAddr:{},
    paymentMethod:'',
    error:''
}

export const cartReducer = ( state=initialStateCart ,action) =>
{
    switch(action.type){
        case CART_ADD_BASKET: {
            
        //     const newitem= action.payload
        //     console.log("BASKET ITEMS ",(state.basketItems.length));
           
        //    let existItem=null
        //     // if(state.basketItems==="undefined")
        //         // console.log("Udefined basket");
        //     // else    
        //          existItem=state.basketItems.find((x) => x.idname === newitem.idname)
        //         //  const existItem = state.basketItems.find((x) => x.id === item.id)

        //     if(existItem)
        //     {
        //         return({
        //             ...state,
        //             basketItems:[...state.basketItems]
        //         })
        //     }
        //     else
        //     {
        //         return({
        //             ...state,
        //             basketItems:[...state.basketItems,newitem]
        //         })
        //     }


            // -------------------------NEW CODE----------------------------

      const item = action.payload
      const existItem = (state.basketItems.find((x) => x.idname === item.idname))

        console.log("cart Reduce",typeof(state.basketItems.find((x) => x.idname === item.idname))==='undefined')

        console.log("New ITEM ",item.idname);

      if (existItem) {
        {console.log("EXISTITEM")}
        return {
          ...state,
          basketItems: state.basketItems.map((x) =>  x.idname === existItem.idname ? item : x)
           //?Put item that also matches :Put all items that dont match
          //CAN USE Down approach also
        }
      } else {
        {console.log("NOT EXISTITEM");}
        return {
          ...state,
          basketItems: [...state.basketItems, item],
          
        }
      }
    }

     case CART_REMOVE_BASKET: {

      const item = action.payload

       return {
         ...state,
         basketItems: state.basketItems.filter(x=> x.idname !==item.idname )
       }
     }


     case CART_SAVE_SHIPPING_ADDRESS: {

        return {
         ...state,
         shippingAddr: action.payload
       }
     }

     case CART_PAYMENT_METHOD: {

      return {
       ...state,
       paymentMethod: action.payload
     }
   }



    //--------------------------------2.New code-----LocalStorage--------------------
    // const item = action.payload

    
    //   if(typeof(state.basketItems)==='undefined')
    //   {
    //     {console.log("1st IF");}
    //     return {
    //       ...state,
    //       basketItems: [item],
    //   }
    // }
    // else
    // {

    //     const existItem = (typeof(state.basketItems.find((x) => x.idname === item.idname))!=='undefined')
    //     console.log("CART Reduce",(state.basketItems.find((x) => x.idname === item.idname)))
    //     console.log("New ITEM ",item);

    //   if (existItem) 
    //   {
    //     {console.log("EXISTITEM")}
    //     return {
    //       ...state,
    //       basketItems: state.basketItems.map((x) =>  x.idname === existItem.idname ? item : x)
          
    //     }
    //   } 

    //   else 
    //   {
    //     {console.log("NOT EXISTITEM");}
    //     return {
    //       ...state,
    //       basketItems: [...state.basketItems, item],
          
    //     }
    //   }
    // }
    // }// ADD TO BASKET
       
    
        default:
            return state


 }
}