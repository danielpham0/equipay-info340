import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import GOOGLE_EMPLOYEES from './google.json';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

  // Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBA3obX6MO80iU5yb-rfdciv_ZOnijxyaU",
  authDomain: "equipay-bd74d.firebaseapp.com",
  projectId: "equipay-bd74d",
  storageBucket: "equipay-bd74d.appspot.com",
  messagingSenderId: "248808692178",
  appId: "1:248808692178:web:88f3b6158c449fa9d9d00b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <App data={GOOGLE_EMPLOYEES}/>
  </BrowserRouter>,
  document.getElementById('root')
);

