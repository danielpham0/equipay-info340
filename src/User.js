import React from 'react';
import {useParams} from 'react-router-dom';
import {Nav} from './App';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

function UserPage(props) {
    const [user, setUser] = useState(undefined);
    let content = null;
    if(!user){

    }
    return (
      <div>
        <Nav links={[{'Home': '/'}]}/>
        <p> Hello! </p>
      </div>
    );
  }
  
  export default UserPage;