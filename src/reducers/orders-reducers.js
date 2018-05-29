import {
    LOAD_ORDERS_PROGRESS,
    LOAD_ORDERS_SUCCESS,
    LOAD_ORDERS_ERROR,
    GET_ORDER_DATA,
    MODIFY_EDIT_FORM_FIELD
} from '../actions/orders-actions';

let initial = {
    loading: true,
    orders: [],
    selectedOrder: {} //for edit form
};

export default function ordersReducer(state=initial, action){
    switch(action.type){
        case LOAD_ORDERS_PROGRESS:
            return{
                ...state,
                loading:action.loading
            };
            break;
        case LOAD_ORDERS_SUCCESS:
            return {
                ...state,
                loading:action.loading,
                orders:action.orders
            };
            break;
        case LOAD_ORDERS_ERROR:
            return {
                ...state,
                loading: false
            }
            break;
        case GET_ORDER_DATA:
            return {
                ...state,
                selectedOrder: action.selectedOrder,
                loading: false
            }
            break;
        case MODIFY_EDIT_FORM_FIELD:
            return {
                ...state,
                selectedOrder: action.selectedOrder
            }
            break;
        default:
            return{
                ...state                
            }
            break;
    }
}