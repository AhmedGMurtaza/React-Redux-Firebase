import React,{ Component } from 'react';
import fire from '../../fire';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ordersActions from '../../actions/orders-actions';

class NewOrder extends Component{

    constructor(){
        super();
        this.submit = this.submit.bind(this);
    }
    componentDidMount(){
        this.props.loadOrders();
    }

    submit(){
        const db = fire.database().ref().child('orders');
        db.push({
            order_id: this.order_id.value,
            customer_id: this.customer_id.value,
            order_date: this.order_date.value,
            delivery_date: this.delivery_date.value,
            total: this.total.value,
            details: this.order_details.value,
            order_status: this.order_status.value
        });
    }

    render(){
        const { orders, loading } = this.props;
        const statusTypes = ['inprocess', 'dispatched', 'delivered', 'cancelled', 'returned'];
        if(loading){
            return (<p>Loading form..</p>);
        }
        else{
            const newOrderId = `ORD${100 + orders.length + 1}`;
            return (
                <div>
                    <h2>New Order</h2>
                    <form className="form">
                        <label>
                            Order Id
                            <input
                                type="text"
                                disabled
                                value={newOrderId}
                                ref={(input)=>this.order_id=input}
                            />
                        </label>
                        <label>
                            Customer ID / Name
                            <input
                                type="text"
                                ref={(input) => this.customer_id = input}
                            />
                        </label>
                        <label>
                            Order Date
                            <input
                                type="date"
                                ref={(input) => this.order_date = input}
                            />
                        </label>
                        <label>
                            Delivery Date
                            <input
                                type="date"
                                ref={(input) => this.delivery_date = input}
                            />
                        </label>
                        <label>
                            Order Status
                            <select
                                name=""
                                ref={(input) => this.order_status = input}>
                                {
                                    statusTypes.map((status, index) => {
                                        return (
                                            <option key={index} value={status} >{status}</option>
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
                                ref={(input) => this.total = input}
                            />
                        </label>
                        <label>
                            Details
                            <textarea
                                onChange={this.modifyValue}
                                ref={(input) => this.order_details = input}
                            >
                            </textarea>
                        </label>
                        <button onClick={this.submit} className="button-primary button button-md">Submit</button>
                    </form>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    let { loading, orders } = state.ordersReducer;
    return {
        loading,
        orders
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadOrders: ordersActions.loadOrders
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
