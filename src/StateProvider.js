import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

export const StateContext = createContext();
//create container where data lives
export const StateProvider = ({ reducer, initialState, children }) => (
  //allowed us set the data layer
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children} {/* App child */}
  </StateContext.Provider>
);

//allowed us pull information from the data layer
//Check Login.js
StateProvider.propTypes = {
  reducer: PropTypes.any,
  initialState: PropTypes.any,
  children: PropTypes.any,
};
export const useStateValue = () => useContext(StateContext);
