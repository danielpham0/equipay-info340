import {React} from 'react';
import {Nav} from './App';
import { Redirect} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function UserPage(props) {
  if (!props.user){
    return <Redirect to="/login/user" />
  }
  return (
    <div>
      <Nav links={[{'Home': '/'}]}/>
      <p> Hello {props.user ? props.user.displayName : '!'} </p>
    </div>
  );
}

export default UserPage;