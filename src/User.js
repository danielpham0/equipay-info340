import {React} from 'react';
import {Nav} from './App';
import { useHistory } from 'react-router-dom';

function UserPage(props) {
  let history = useHistory();
  if (!props.user){
    history.push('/login/user');
  }
  return (
    <div>
      <Nav links={[{'Home': '/'}]}/>
      <p> Hello {props.user ? props.user.displayName : '!'} </p>
    </div>
  );
}

export default UserPage;