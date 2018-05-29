import fire from "../fire";

export const LOAD_CUSTOMERS_PROGRESS = 'LOAD_CUSTOMERS_PROGRESS';
export const LOAD_CUSTOMERS_SUCCESS = 'LOAD_CUSTOMERS_SUCCESS';
export const LOAD_CUSTOMERS_ERROR = 'LOAD_CUSTOMERS_ERROR';
export const GET_CUSTOMER_DATA = 'GET_CUSTOMER_DATA';
export const MODIFY_EDIT_FORM_FIELD = 'MODIFY_EDIT_FORM_FIELD';

export function loadCustomers() {
    console.log("action ");
    return (dispatch)=>{
        dispatch({type:LOAD_CUSTOMERS_PROGRESS,loading:true});
        
        const db = fire.database().ref().child('customers');
        db.on('value', (snapshot) => {
            let items = snapshot.val();
            let tempState = [];
            for (let item in items) {
                let temp = items[item];
                tempState.push({
                    customer_key:item,
                    customer_id: temp.customer_id,
                    customer_name: temp.customer_name,
                    phone: temp.phone,
                    address: temp.address,
                    email: temp.email,
                    city: temp.city,
                    total_orders: temp.total_orders
                })
            }
            if (tempState.length > 0) {
                dispatch({ 
                    type: LOAD_CUSTOMERS_SUCCESS, 
                    loading: false,
                    customers:tempState
                });
            }
            else{
                dispatch({ type: LOAD_CUSTOMERS_ERROR, loading: false });
            }
        });
    }
}

export function getCustomerData(customerId) {
    return (dispatch) => {
        dispatch({ type: LOAD_CUSTOMERS_PROGRESS, loading: true });

        const db = fire.database().ref().child(`customers/${customerId}`);
        db.on('value', (snapshot) => {
            let customerData = snapshot.val();
            let selectedCustomer = {};
            if (customerData !== null) {
                selectedCustomer = {
                    ...customerData,
                    customer_key: customerId
                };
                dispatch({
                    type: GET_CUSTOMER_DATA,
                    loading: false,
                    selectedCustomer
                });
            }
            else {
                dispatch({ type: LOAD_CUSTOMERS_ERROR, loading: false });
            }
        });
    }
}

export function modifyEditFormField(selectedCustomer) {
    return {
        type: MODIFY_EDIT_FORM_FIELD,
        selectedCustomer
    }
}