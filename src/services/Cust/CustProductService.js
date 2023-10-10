import { axios } from '../index';

import { PRODUCTION_BASE_URL} from '../../globals/constants'

const CUST_PRODUCT_URL=`${PRODUCTION_BASE_URL}/api/cust/product`;

const headers = {
    'Content-Type': 'application/json',
    'custAppId': 1
  };
export default {
    getAll() {
        return axios.get(CUST_PRODUCT_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    getByDate(from, to) {
        return axios.get(CUST_PRODUCT_URL+'/filter', { params: {from, to} })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    add(PRODUCT) {
        return axios.post(CUST_PRODUCT_URL, PRODUCT)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    update(id, PRODUCT) {
        return axios.put(CUST_PRODUCT_URL+`/${id}`, PRODUCT)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    delete(id) {
        return axios.delete(CUST_PRODUCT_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};