import React,{ Component } from 'react';
import fire from '../../fire';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as customersActions from '../../actions/customers-actions';

class NewCustomer extends Component{

    constructor(){
        super();
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {
        this.props.loadCustomers();
    }

    submit(){
        const db = fire.database().ref().child('customers');
        let customer_id = this.customer_id.value,
            customer_name = this.customer_name.value,
            phone = this.phone.value,
            email = this.email.value,
            address = this.address.value,
            city = this.city.value,
            reference = this.reference.value,
            fb_profile = this.fb_profile.value;

        db.push({
            customer_id,
            customer_name,
            phone,
            email,
            address,
            city,
            fb_profile,
            reference
        });
    }

    render(){
        const { customers, loading } = this.props;
        if (loading) {
            return (<p>Loading form..</p>);
        }
        else {
            const newCustomerId = `CST${100 + customers.length + 1}`;
            return (
                <div>
                    <h2>Add New Customer</h2>
                    <form className="form">
                        <label>
                            customer id
                            <input type="text" disabled value={newCustomerId} ref={input => this.customer_id = input} />
                        </label>
                        <label>
                            Full Name
                            <input type="text" ref={input => this.customer_name = input} />
                        </label>
                        <label>
                            Phone
                            <input type="phone" ref={input => this.phone = input} />
                        </label>
                        <label>
                            Email
                            <input type="email" ref={input => this.email = input} />
                        </label>
                        <label>
                            Address
                            <input type="text" ref={input => this.address = input} />
                        </label>
                        <label>
                            City
                            <input type="text" ref={input => this.city = input} />
                        </label>
                        <label>
                            Facebook Profile Link
                            <input type="url" ref={input => this.fb_profile = input} />
                        </label>
                        <label>
                            Reference
                            <input type="text" ref={input => this.reference = input} />
                        </label>
                        <button type="submit" className="button button-md button-primary" onClick={this.submit}>Submit</button>
                    </form>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    let { loading, customers } = state.customersReducer;
    return {
        loading,
        customers
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadCustomers: customersActions.loadCustomers
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCustomer);
