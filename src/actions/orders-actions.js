import fire from "../fire";

export const LOAD_ORDERS_PROGRESS = 'LOAD_ORDERS_PROGRESS';
export const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS';
export const LOAD_ORDERS_ERROR = 'LOAD_ORDERS_ERROR';
export const GET_ORDER_DATA = 'GET_ORDER_DATA';
export const MODIFY_EDIT_FORM_FIELD = 'MODIFY_EDIT_FORM_FIELD';

export function loadOrders() {
    return (dispatch) => {
        dispatch({ type: LOAD_ORDERS_PROGRESS, loading: true });

        const db = fire.database().ref().child('orders');
        db.on('value', (snapshot) => {
            let items = snapshot.val();
            let tempState = [];
            let keys = [];
            
            for(var item in items){
                let temp = items[item];
                tempState.push({
                    order_key:item,
                    order_id: temp.order_id,
                    customer_id: temp.customer_id,
                    order_date: temp.order_date,
                    delivery_date: temp.delivery_date,
                    total: temp.total,
                    details: temp.details,
                    order_status: temp.order_status
                });
            }

            if (tempState.length > 0) {
                dispatch({
                    type: LOAD_ORDERS_SUCCESS,
                    loading: false,
                    orders: tempState
                });
            }
            else {
                dispatch({ type: LOAD_ORDERS_ERROR, loading: false });
            }
        });
    }
}

export function getOrderData(orderId){
    console.log('search');
    return (dispatch) => {
        dispatch({ type: LOAD_ORDERS_PROGRESS, loading: true });

        const db = fire.database().ref().child(`orders/${orderId}`);
        db.on('value', (snapshot) => {
            let orderData = snapshot.val();
            let selectedOrder = {};
            if(orderData !== null){
                selectedOrder = {
                    ...orderData,
                    order_key: orderId
                };
                dispatch({
                    type: GET_ORDER_DATA,
                    loading: false,
                    selectedOrder
                });
            }
            else{
                dispatch({ type: LOAD_ORDERS_ERROR, loading: false });
            }
        });
    }
}

export function modifyEditFormField(selectedOrder){
    return{
        type: MODIFY_EDIT_FORM_FIELD,
        selectedOrder
    }
}