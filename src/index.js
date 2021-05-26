import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import GOOGLE_EMPLOYEES from './google.csv';

ReactDOM.render(
  <BrowserRouter>
    <App data={GOOGLE_EMPLOYEES}/>
  </BrowserRouter>,
  document.getElementById('root')
);

