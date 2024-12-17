// authReducer.js
import { LOGOUT } from '../actions/actions';

const initialState = {
    loggedIn: false,
};

const actionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return { ...state, loggedIn: false };

        default:
            return state;
    }
};

export default actionReducer;
