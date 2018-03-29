import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    user: null,
    email: '',
    password: '',
    isLoggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };

        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };

        case LOGIN_SUCCESS:
            return { ...state, isLoggedIn: true, user: action.payload };

        case LOGIN_FAIL:
            return { ...state, isLoggedIn: false, user: null };

        case LOGOUT_SUCCESS:
            return { ...state, isLoggedIn: false, user: null };

        default:
            return state;
    }
};
