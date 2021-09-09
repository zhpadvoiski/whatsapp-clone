import React, {createContext,useContext,useReducer} from 'react';

export const StateContext = createContext();
//create container where data lives
export const StateProvider = ({ reducer, initialState, children}) => (
    //allowed us set the data layer
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children} {/* App child */}
    </StateContext.Provider>
);

//allowed us pull information from the data layer
//Check Login.js
export const useStateValue = () => useContext(StateContext);