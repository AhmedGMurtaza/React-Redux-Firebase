import { 
    LOAD_CUSTOMERS_PROGRESS, 
    LOAD_CUSTOMERS_SUCCESS,
    MODIFY_EDIT_FORM_FIELD,
    GET_CUSTOMER_DATA,
    LOAD_CUSTOMERS_ERROR } from '../actions/customers-actions';

const initial = {
    loading:true,
    customers: [],
    selectedCustomer: {} //for edit form
}

export default function customersReducer(state=initial,action){
    switch(action.type){
        case LOAD_CUSTOMERS_SUCCESS:
            return{
                ...state,
                loading:action.loading,
                customers:action.customers
            };
        case 
            LOAD_CUSTOMERS_PROGRESS,
            LOAD_CUSTOMERS_ERROR:
            return {
                ...state,
                loading: action.loading
            };
        case GET_CUSTOMER_DATA:
            return {
                ...state,
                selectedCustomer: action.selectedCustomer,
                loading: false
            }
            break;
        case MODIFY_EDIT_FORM_FIELD:
            return {
                ...state,
                selectedCustomer: action.selectedCustomer
            }
            break;
       default:
        return{
            ...state
        }
    }
}