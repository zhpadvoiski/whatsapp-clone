//User not logIn
export const initialState = {
    user: null,
};

export const actionTypes = {
    SET_USER : "SET_USER",
};

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                /* Keep everything what was there, but add user */
                ...state,
                user: action.user,
            };

        default:
            /* return and don't do anything */
            return state;
    }
};

export default reducer;