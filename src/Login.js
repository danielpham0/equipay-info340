/*
 * This module handles the login features of the app, including authentication and signout.
 */
import firebase from 'firebase';
// import 'firebase.auth';// from '@react-firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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
  signInSuccessUrl: '/companies',
  // callbacks: {
  //   // Avoid redirects after sign-in
  //   signInSuccessWithAuthResult: () => false
  // }
};

function LoginPage() {
  return (
    <>
      <h1>Sign Up</h1>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    </>
  )
}

export default LoginPage;
