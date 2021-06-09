import {React} from 'react';
import {Nav, FormButton} from './App';
import { Redirect} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function ProfilePage(props) {
  if (!props.user){
    return <Redirect to="/login/profile" />
  }
  let userInfo = {};
  console.log(userInfo);
  let userCompany = '';
  for (let company in props.data){
    if(props.data[company][props.user.uid]) {
      userCompany = company;
      userInfo = props.data[company][props.user.uid];
    }
  }
  let content = (<div>
    <h3> Submit your first entry: </h3>
    <FormButton />
  </div>);
  if (Object.keys(userInfo).length !== 0) {
    content = (<div>
        <h3> Current Information: </h3>
        <p> Company -  {userCompany}</p>
        <p> Job Title -  {userInfo['Job Title']}</p>
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