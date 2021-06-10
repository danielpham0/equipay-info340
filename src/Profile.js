/*
 * This module handles the application's profile page and access to a user's information in the database
 */
import {React} from 'react';
import {Nav, FormButton} from './App';
import { Redirect} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
  if (Object.keys(userInfo).length !== 0) {
    let role = userInfo['Job Title'].split(' ').map((str => {
      return str.charAt(0) + str.slice(1).toLowerCase();
    })).join(' ');
    content = (<>
      <Card className="p-3 m-3">
        <h3> Current Information: </h3>
        <Row>
          <Col><p> Company: </p></Col> <Col><p> {userCompany.charAt(0).toUpperCase() + userCompany.slice(1)}</p></Col>
        </Row>
        <Row>
          <Col><p> Job Title: </p></Col> <Col><p> {role}</p></Col>
        </Row>
        <Row>
          <Col><p> Salary: </p></Col> <Col><p> {userInfo['Base Salary']}</p></Col>
        </Row>
        <Row>
          <Col><p> Ethnicity: </p></Col> <Col><p> {userInfo['Ethnicity']}</p></Col>
        </Row>
        <Row>
          <Col><p> Gender: </p></Col> <Col><p> {userInfo['Gender']}</p></Col>
        </Row>
        <Row>
          <Col><p> Sexual Orientation: </p></Col> <Col><p> {userInfo['Sexual Orientation']}</p></Col>
        </Row>
      </Card>
      <Card className="p-3 m-3">
        <h3> Update Your Information: </h3>
        <FormButton />
      </Card>
    </>);
  }
  return (
    <div>
      <Nav links={[{'Home': '/'}]}/>
      <Container className="mt-3">
        <h2> Hello {props.user.displayName}! </h2>
        {content}
      </Container>
    </div>
  );
}

export default ProfilePage;