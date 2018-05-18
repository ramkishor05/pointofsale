import { 
    GET_ALL_MOBILE_MONEYS_SUCCESS, GET_ALL_MOBILE_MONEYS_FAIL, 
    ADD_MOBILE_MONEY_FAIL, ADD_MOBILE_MONEY_SUCCESS, 
    SHOW_ADD_MOBILE_MONEY_MODAL, SHOW_EDIT_MOBILE_MONEY_MODAL, SHOW_DELETE_MOBILE_MONEY_MODAL,
    TRANSACTION_TO_EDIT,
} from './types';

import MobileMoney from '../services/MobileMoney';

export const getAllMobileMoneys = () => async dispatch => {
    try {
        let mobile_moneys = await MobileMoney.getAll();

        if (mobile_moneys) {
            dispatch({ type: GET_ALL_MOBILE_MONEYS_SUCCESS, payload: mobile_moneys });
            console.log('this is the array of mobile moneys ', mobile_moneys);
        }
    } catch (error) {
        dispatch({ type: GET_ALL_MOBILE_MONEYS_FAIL, payload: error });
        console.log(error);
    }
};

export const showAddMobileMoneyModal = value => {
    return {
        type: SHOW_ADD_MOBILE_MONEY_MODAL,
        payload: value,
    };
};

export const showEditMobileMoneyModal = value => {
    return {
        type: SHOW_EDIT_MOBILE_MONEY_MODAL,
        payload: value,
    };
};

export const showDeleteMobileMoneyModal = value => {
    return {
        type: SHOW_DELETE_MOBILE_MONEY_MODAL,
        payload: value,
    };
};

export const addMobileMoney = (data, refresh, clear) => async dispatch => {
    console.log('we in')
    try {
        let mobile_money = await MobileMoney.add(data);

        if (mobile_money) {
            dispatch({ type: ADD_MOBILE_MONEY_SUCCESS });
            console.log('mobile money added successfully', mobile_money);
        } else {
            console.log('hit it well');
        }

        if (refresh) {
            refresh();
        }

        if (clear) {
            clear();
        }
    } catch (error) {
        dispatch({ type: ADD_MOBILE_MONEY_FAIL });
        console.log(error);
    }
};

export const renderToEdit = item => {
    return {
        type: TRANSACTION_TO_EDIT,
        payload: item,
    };
};





