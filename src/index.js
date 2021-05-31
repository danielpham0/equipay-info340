import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import GOOGLE_EMPLOYEES from './google.json';

// console.log(GOOGLE_EMPLOYEES[0], GOOGLE_EMPLOYEES[1], GOOGLE_EMPLOYEES[2]);
ReactDOM.render(
  <BrowserRouter>
    <App data={GOOGLE_EMPLOYEES}/>
  </BrowserRouter>,
  document.getElementById('root')
);

