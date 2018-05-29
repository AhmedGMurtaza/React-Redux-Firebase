import React, { Component } from 'react';
import fire from '../../fire';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ordersActions from '../../actions/orders-actions';

class EditOrder extends Component {

    constructor() {
        super();
        this.update = this.update.bind(this);
        this.modifyValue = this.modifyValue.bind(this);
    }

    componentDidMount() {
        this.props.getOrderData(this.props.match.params.order_id);
    }

    modifyValue(){
        this.props.modifyEditFormField({
            customer_id: this.customer_id.value,
            order_date: this.order_date.value,
            delivery_date: this.delivery_date.value,
            total: this.total.value,
            details: this.details.value,
            order_status: this.order_status.value
        })
    }

    update() {
        const query = this.props.match.params.order_id;
        const db = fire.database().ref().child(`orders/${query}`);
        db.set({
            customer_id: this.customer_id.value,
            order_date: this.order_date.value,
            delivery_date: this.delivery_date.value,
            total: this.total.value,
            details: this.details.value,
            order_status: this.order_status.value
        });
    }

    render() {
        const statusTypes = ['inprocess', 'dispatched','delivered','cancelled','returned'];
        let { loading, selectedOrder } = this.props;
        console.log(selectedOrder);
    
        if(loading){
            return (<p>loading..</p>);
        }
        else{
            return (
                <div>
                    <h2>Edit Order</h2>
                    <form className="form">
                        <label>
                            Order Id
                            <input
                                type="text"
                                disabled
                                value={selectedOrder.order_id}
                                ref={(input) => this.order_id = input}
                            />
                        </label>
                        <label>
                            Customer ID / Name
                            <input
                                onChange={this.modifyValue}
                                type="text"
                                value={selectedOrder.customer_id}
                                ref={(input) => this.customer_id = input}
                            />
                        </label>
                        <label>
                            Order Date
                            <input
                                onChange={this.modifyValue}
                                type="date"
                                value={selectedOrder.order_date}
                                ref={(input) => this.order_date = input}
                            />
                        </label>
                        <label>
                            Delivery Date
                            <input
                                onChange={this.modifyValue}
                                type="date"
                                value={selectedOrder.delivery_date}
                                ref={(input) => this.delivery_date = input}
                            />
                        </label>
                        <label>
                            Order Status
                            <select
                                name=""
                                onChange={this.modifyValue}
                                ref={(input) => this.order_status = input}>
                                {
                                    statusTypes.map((status, index) => {
                                        return (
                                            <option key="index" value={status} selected={(status === selectedOrder.order_status) ? "selected" : ""}>{status}</option>
                                        );
                                    })
                                }
                            </select>
                        </label>
                        <label>
                            Total Amount
                            <input
                                onChange={this.modifyValue}
                                type="text"
                                value={selectedOrder.total}
                                ref={(input) => this.total = input}
                            />
                        </label>
                        <label>
                            Details
                            <textarea
                                onChange={this.modifyValue}
                                ref={(input) => this.details = input}
                            >
                            {selectedOrder.details}                            
                            </textarea>
                        </label>
                        <button type="submit" onClick={this.update} className="button-primary button button-md">Submit</button>
                    </form>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    let { loading, selectedOrder, value } = state.ordersReducer;
    return{
        loading,
        selectedOrder
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getOrderData: ordersActions.getOrderData,
        modifyEditFormField: ordersActions.modifyEditFormField
        
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EditOrder);