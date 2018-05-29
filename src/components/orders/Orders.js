import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import OrdersList from './OrdersList';
import * as ordersActions from '../../actions/orders-actions';

class Orders extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount() {
        this.props.loadOrders();
    }

    render(props){
        let orders_count = this.props.orders.length;
        const tableHeaders = ['Order Id', 'Customer', 'Order Date', 'Delivery Date', 'Total', 'Details', 'Status','Actions'];
        const { loading, orders } = this.props;
        if(loading){
            return <h3>loading Orders...</h3>
        }
        else{
            return (
                <div className="wrapper">
                    <div style={{ textAlign: 'right' }}>
                        <Link to="/new_order" className={"button button-md button-primary full-width"}>Add New Order</Link>
                    </div>
                    <OrdersList headers={tableHeaders} rows={orders} count={orders_count}/>
                </div>
            );
        }
    }
}

const mapStateToProps = state =>{
    let { loading, orders } = state.ordersReducer;
    return {
        loading,
        orders
    }  
}

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
        loadOrders: ordersActions.loadOrders
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);
