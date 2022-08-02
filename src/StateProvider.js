// import React, { createContext,useContext,useReducer} from 'react';

// //Prepares dataLayer
// export const StateContext= createContext();

// //Wraps our app & provide Data Layer
// export const StateProvider= ({reducer, initialState, children})=> (
//     <StateContext.Provider value={useReducer(reducer,initialState)}>
//         {children}
//     </StateContext.Provider>
// )

// //Pull information from data Layer
// export const useStateValue = () => useContext(StateContext)
