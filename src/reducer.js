// export const initialState={
//     basket:[], //initially basket iss empty

// };

// //Selector...used in production env
// export const getBasketTotal=(basket) =>
//     basket?.reduce((amount,item) => item.price+ amount, 0); //initialised to zero
//     //? mark , incase of error, no error is shown
//     //See use , working of reduce function



// //reducer continuously listens
// const reducer = (state,action) => {
//     console.log(action)
//     switch (action.type) {
//         case "ADD_TO_BASKET":
//             return {
//                 ...state, //original state is returned
//                 basket:[...state.basket,action.item],
//                 //current basket, new item to be added 
//             };
        
//             default:
//                 return state;
//     }
// };

// export default reducer;