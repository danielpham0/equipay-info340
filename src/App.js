// import React, { useState } from 'react';
import RolePage from './Roles';
import CompanyPage from './companies';
import ChartPage from './chart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom'
import GOOGLE_EMPLOYEES from './google.csv'
// most likely need to change this since react doesn't read csv the same as json

function App(props) {
  const employees = GOOGLE_EMPLOYEES;

  return (
    <div className="App">
      <header>
        <h1><Link to='/landing'>EquiPay</Link></h1>
        <div class="creators">
          <p>Daniel Pham, Shane Fretwel, Ryan Carroll</p>
        </div>
      </header>
      <main>
        <Nav />
        <div>
          <Switch>
            <Route path='/landing'> </Route>
            <Route exact path='/'> <CompanyPage /></Route>
            <Route path='/roles/:company'> <RolePage /> </Route>
            <Route path='/chart/:company/:role'> <ChartPage /> </Route>
            <Route path='/form'> </Route>
            <Route path='/'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </div>
      </main>
      <footer class="footer">
        <p>Daniel Pham, Shane Fretwell, Ryan Carroll</p>
        <p>INFO 340 Front End Development</p>
        <p><a href="mailto:ischool@uw.edu">ischool@uw.edu</a></p>
      </footer>
    </div>
  );
}

function Nav(){
  // Most likely will have to take in props from url to display the nav properly
  return(<div>
    <nav>
      <ul>
        <li><NavLink exact to="/" activeClassName="active"> Companies </NavLink></li>
        <li> {'>'} </li>
        <li><NavLink exact to="/roles/:company" activeClassName="active"> Google </NavLink></li>
      </ul>
    </nav>
  </div>);
}

export function CompanyHeader(props) {
  return (
    <div className="company_header">
      <span className={ (props.company).toLowerCase() + "_logo" } aria-hidden="true"></span> <h2> { props.company } - Roles </h2>
    </div>
  );
}

export default App;
