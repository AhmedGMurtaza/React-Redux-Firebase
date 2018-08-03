import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../styles/App.css';

import Nav from './Nav';
import Customers from './customers/Customers';
import NewCustomer from './customers/NewCustomer';
import Orders from './orders/Orders';
import NewOrder from './orders/NewOrder';
import EditOrder from './orders/EditOrder';
import EditCustomer from './customers/EditCustomer';
import Expenses from './expenses/Expenses';
import EditExpenses from './expenses/EditExpenses';

const App = () => {
  const links = ['Expenses','Customers','Orders'];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">ERP</h1>
      </header>
    
      <BrowserRouter>
        <div>
          <Nav links={links} />  
          <Route exact path="/expenses" component={Expenses} />
          <Route exact path="/customers" component={Customers} />
          <Route path="/new_customer" component={NewCustomer} />
          <Route exact path="/orders" component={Orders} />
          <Route path="/new_order" component={NewOrder} />
          <Route path="/orders/:order_id/edit" component={EditOrder} />
          <Route path="/customers/:customer_id/edit" component={EditCustomer} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;



///<Route path={`${match.url}/:topicId`} component={Topic} />
 /// <Route exact path={match.url} render={() => (
    ///<h3>Please select a topic.</h3>
  ///)} />

  
//const Topic = ({ match }) => (
  //<div>
    //<h3>{match.params.topicId}</h3>
  //</div>
