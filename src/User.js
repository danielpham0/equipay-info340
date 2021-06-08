import React from 'react';
import {useParams} from 'react-router-dom';
import {Nav} from './App';

function UserPage(props) {
    return (
      <div>
        <Nav links={[{'Home': '/'}]}/>
        <p> Hello! </p>
      </div>
    );
  }
  
  export default UserPage;