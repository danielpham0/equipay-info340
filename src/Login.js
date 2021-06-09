/*
 * This module handles the login features of the app, including authentication and signout.
 */
import firebase from 'firebase';
// import 'firebase.auth';// from '@react-firebase/auth';
import {useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


const uiConfig = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // requireDisplayName: true
    }
  ],
  credentialHelper: 'none',
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  callbacks: {
    // Avoid redirects after sign-in
    signInSuccessWithAuthResult: () => false
  }
};

function LoginPage(props) {
  const urlParams = useParams();
  let history = useHistory();
  useEffect(() =>{
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser) {
        props.setUser(firebaseUser);
        history.push('/' + urlParams.success);
      } else {
        props.setUser(null);
      }
    })
  })

  const navHist = useHistory();

  const goBack = () =>  {
    navHist.goBack();
  };

  return (
    <>
      <nav>
        <ul>
          <li><Link onClick={goBack}> Back </Link></li>
        </ul>
      </nav>
      <Container>
        <h1>Sign Up</h1>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Container>
    </>
  )
}

export default LoginPage;
