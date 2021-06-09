/*
 * This module handles the application's profile page and access to a user's information in the database
 */
import {React} from 'react';
import {Nav, FormButton} from './App';
import { Redirect} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

/**
```
props = {
  user // The current firebase user that is logged in
  data // The data of all companies, loaded when site is loaded.
}
```
 */
function ProfilePage(props) {
  // if they aren't logged in direct them to the login page
  if (!props.user){
    return <Redirect to="/login/profile" />
  }
  let userInfo = {};
  console.log(userInfo);
  let userCompany = '';
  // Looks for user's information in the database
  for (let company in props.data){
    if(props.data[company][props.user.uid]) {
      userCompany = company;
      userInfo = props.data[company][props.user.uid];
    }
  }
  // displays form button if no previous entries have been made by the individual
  let content = (<div>
    <h3> Submit your first entry: </h3>
    <FormButton />
  </div>);
  let role = userInfo['Job Title'].split(' ').map((str => {
    return str.charAt(0) + str.slice(1).toLowerCase();
  })).join(' ');
  // displays user's information
  if (Object.keys(userInfo).length !== 0) {
    content = (<div>
        <h3> Current Information: </h3>
        <p> Company -  {userCompany.charAt(0).toUpperCase() + userCompany.slice(1)}</p>
        <p> Job Title -  {role}</p>
        <p> Salary -  {userInfo['Base Salary']}</p>
        <p> Ethnicity -  {userInfo['Ethnicity']}</p>
        <p> Gender -  {userInfo['Gender']}</p>
        <p> Sexual Orientation -  {userInfo['Sexual Orientation']}</p>
      </div>);
  }
  return (
    <div>
      <Nav links={[{'Home': '/'}]}/>
      <Container>
        <h2> Hello {props.user.displayName}! </h2>
        {content}
      </Container>
    </div>
  );
}

export default ProfilePage;