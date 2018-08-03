import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../fire';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Button } from 'reactstrap';

import CustomersList from './CustomersList';
import * as customerActions from '../../actions/customers-actions';

class Customers extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.loadCustomers();
    }

    render(props){
        const tableHeaders = ['ID', 'Name', 'Phone', 'Email', 'Address', 'City','FB', 'References','Actions'];
        const { loading, customers } = this.props;
        if(loading){
            return <h3>loading Customers...</h3>
        }
        else{
            return (
                <div className="wrapper">
                    <div style={{textAlign:'right'}}>
                        <Link to="/new_customer">Add New Customer</Link>
                    </div>
                    <CustomersList headers={tableHeaders} rows={customers} />
                </div>
            );
        }
    }
}

const mapStateToProps = state =>{
    let { loading, customers } = state.customersReducer;
    return {
        loading,
        customers
    }  
}

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
        loadCustomers:customerActions.loadCustomers
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Customers);

