import { 
    GET_ALL_VENDOR_BUSINESS_SUCCESS, VENDOR_BUSINESS_ADD_SUCCESS,
    SHOW_VENDOR_BUSINESS_LOADER, REMOVE_VENDOR_BUSINESS_LOADER,
    VENDOR_BUSINESS_TO_EDIT, VENDOR_BUSINESS_EDIT_SUCCESS, GET_FINISHING_VENDOR_BUSINESS
} from 'actions/types';

const INITIAL_STATE = {
    vendorBusinessList: [],
    vendorBusinessList_finishing: [],
    vendorBusiness: {
        id: '',
        title: '',
        name: '',
        desc: '',
        stockQnt: 0,
        purchasePrice: 0,
        purchaseUnit: 1,
        wholePrice: 0,
        wholeUnit: 1,
        retailPrice: 0,
        retailUnit: 1
    },
    show_vendor_business_loader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_VENDOR_BUSINESS_SUCCESS:
            return { ...state, vendorBusinessList: action.payload, show_vendor_business_loader: false };

        case SHOW_VENDOR_BUSINESS_LOADER:
            return { ...state, show_vendor_business_loader: true };
    
        case REMOVE_VENDOR_BUSINESS_LOADER:
            return { ...state, show_vendor_business_loader: false };

        case VENDOR_BUSINESS_ADD_SUCCESS:
            return { ...state, show_vendor_business_loader: false };

        case VENDOR_BUSINESS_TO_EDIT:
            return { ...state, vendorBusiness: action.payload };

        case VENDOR_BUSINESS_EDIT_SUCCESS:
            return { ...state, show_vendor_business_loader: false };

        case GET_FINISHING_VENDOR_BUSINESS:
            return { ...state, show_vendor_business_loader: false, vendorBusinessList_finishing: action.payload };

        default:
            return state;
    }
};

