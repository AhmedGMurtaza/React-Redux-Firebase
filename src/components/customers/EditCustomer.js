import React, { Component } from 'react';
import fire from '../../fire';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as customersActions from '../../actions/customers-actions';

class EditCustomer extends Component {

    constructor() {
        super();
        this.update = this.update.bind(this);
        this.modifyValue = this.modifyValue.bind(this);
    }

    componentDidMount(){
        const customerId = this.props.match.params.customer_id;
        this.props.getCustomerData(customerId);
    }

    modifyValue() {
        console.log(this.customer_name);
        this.props.modifyEditFormField({
            customer_name: this.customer_name.value,
            phone: this.phone.value,
            email: this.email.value,
            address: this.address.value,
            city: this.city.value,
            fb_profile: this.fb_profile.value,
            reference: this.reference.value
        })
    }

    update() {
        const query = this.props.match.params.customer_id;
        const db = fire.database().ref().child(`customers/${query}`);
        // db.set({
        //     customer_name,
        //     phone,
        //     email,
        //     address,
        //     city,
        //     fb_profile,
        //     reference
        // })

    }

    render() {
        const editCustomerId = this.props.match.params.customer_id;
        const { selectedCustomer, loading } = this.props;
        if(loading){
            return <h4>Loading customer..</h4>
        }
        else{
            return (
                <form className="form">
                    <label>
                        customer id
                    <input
                            type="text"
                            disabled
                            value={selectedCustomer.customer_id}
                            ref={input => this.customer_id = input}
                        />
                    </label>
                    <label>
                        Full Name
                    <input
                            onChange={this.modifyValue}
                            value={selectedCustomer.customer_name}
                            type="text" ref={input => this.customer_name = input}
                        />
                    </label>
                    <label>
                        Phone
                    <input
                            onChange={this.modifyValue}
                            value={selectedCustomer.phone}
                            type="phone" ref={input => this.phone = input}
                        />
                    </label>
                    <label>
                        Email
                    <input
                            onChange={this.modifyValue}
                            value={selectedCustomer.email}
                            type="email" ref={input => this.email = input}
                        />
                    </label>
                    <label>
                        Address
                    <input
                            onChange={this.modifyValue}
                            value={selectedCustomer.address}
                            type="text" ref={input => this.address = input}
                        />
                    </label>
                    <label>
                        City
                    <input
                            onChange={this.modifyValue}
                            value={selectedCustomer.city}
                            type="text" ref={input => this.city = input}
                        />
                    </label>
                    <label>
                        Facebook Profile Link
                    <input
                            onChange={this.modifyValue}
                            value={selectedCustomer.fb_profile}
                            type="url" ref={input => this.fb_profile = input}
                        />
                    </label>
                    <label>
                        Reference
                    <input
                            onChange={this.modifyValue}
                            value={selectedCustomer.reference}
                            type="text" ref={input => this.reference = input}
                        />
                    </label>
                    <button
                        type="submit"
                        className="button button-md button-primary"
                        onClick={this.submit}
                    >Submit</button>
                </form>
            );
        }
    }
}

const mapStateToProps = (state) => {
    let { loading, selectedCustomer, value } = state.customersReducer;
    return {
        loading,
        selectedCustomer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCustomerData: customersActions.getCustomerData,
        modifyEditFormField: customersActions.modifyEditFormField
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);