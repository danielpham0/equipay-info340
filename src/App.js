import RolePage from './Roles';
import CompaniesPage from './Companies';
import LandingPage from './Landing';
import ChartPage from './ChartPage';
import ProfilePage from './Profile';
import FormPage from './Form';
import LoginPage from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import './App.css';
import { Route, Switch, Link, Redirect, NavLink, useHistory} from 'react-router-dom';
import amazon_logo from "./imgs/amazon_logo.png";
import google_logo from "./imgs/google_logo.png";
import microsoft_logo from "./imgs/microsoft_logo.png";
import firebase from 'firebase/app';

// List of imported logo images
let logos = {
  google: google_logo,
  amazon: amazon_logo,
  microsoft: microsoft_logo
};

function App(props) {
  // State hooks, one for displaying a loading circle and one for the app data
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(0);
  const [user, setUser] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState("");
  // loginSuccess.url is like a state variable, but it doesn't reload the app when it updates
  // let loginSuccess = {'url': ""};
  let history = useHistory();
  // Takes a snapshot of the firebase database to pass into other components as a prop
  useEffect(() => {
    // Handle loading spinner
    const ref = firebase.database().ref('companies');
    ref.on('value', (snapshot) => {
      setData(snapshot.val());
      setIsLoading(false);
      // Remove extraneous space in between the main and the head
      document.querySelector('main').classList.remove('pt-2');
    });
  }, []);

  useEffect(() => {
    // Handle onAuthStateChanged listener
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // directs users to the correct url after user has been logged in
        history.push('/' + loginSuccess);
      } else {
        setUser(null);
      }
    })
  }, [loginSuccess, history]);

  const handleSignOut = () => {
    firebase.auth().signOut();
  }
  return (
    <div className="App">
      <header>
        <div className='head'>
          <h1><Link to='/landing'>EquiPay</Link></h1>
          <div className="d-flex flex-column">
            <Link className="btn btn-primary" to={(!user) ? '/login/profile' : '/profile'}>
              {(!user) ? 'Sign In!' : user.displayName}
            </Link>
            {user && <Button onClick={handleSignOut} className='mt-1 signout' variant='secondary'> {(!user) ? ' ' : 'Sign Out'}</Button> }
          </div>
        </div>
        <div className="creators">
          <p>Created by Daniel Pham, Shane Fretwell, and Ryan Carroll</p>
        </div>
      </header>
      <main>
        <Switch>
          <Route path='/login/:success'>
            <LoginPage
              user={user}
              setUser={setUser}
              setLoginSuccess={setLoginSuccess}
            />
          </Route>
          <Route path='/landing'> <LandingPage /> </Route>
          <Route exact path='/'> <CompaniesPage /> </Route>
          {/* When isLoading show spinner instead of rendering data-reliant components */}
          <Route path='/roles/:company'>
            {isLoading ? <WrapSpinner /> : <RolePage data={data} />}
          </Route>
          <Route path='/chart/:company/:role'>
            {isLoading ? <WrapSpinner /> : <ChartPage data={data} />}
          </Route>
          <Route path='/form'> {isLoading ? <WrapSpinner /> : <FormPage data={data} user={user}/>}</Route>
          <Route path='/profile'> {isLoading ? <WrapSpinner /> : <ProfilePage data={data} user={user} />} </Route>
          <Route path='/'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </main>
      <footer className="footer">
        <p>Daniel Pham, Shane Fretwell, Ryan Carroll</p>
        <p>INFO 340 Front End Development</p>
        <p><a href="mailto:ischool@uw.edu">ischool@uw.edu</a></p>
      </footer>
    </div>
  );
}

// Utilizes a list of objects containing {link name, link} to produce nav bar in page content
export function Nav(props){
  let links = props.links.map((link, index) => {
    let linkName = Object.keys(link)[0];
    if(index !== props.links.length-1){
      return(<span key={linkName}>
        <li><NavLink exact to={link[linkName]} activeClassName="active"> {linkName} </NavLink></li>
        <li> {'>'} </li>
        </span>);
    }else{
      return(<li key={linkName}><NavLink exact to={link[linkName]} activeClassName="active"> {linkName} </NavLink></li>);
    }
  });
  return(<nav><ul>{links}</ul></nav>);
}

// Takes in company name and header description as props, producing a header with a company logo.
export function CompanyHeader(props) {
  let logo = logos[props.company];
  return (
    <div className="company_header">
      <span className="logo" style={{backgroundImage: `url(${logo})`}} aria-hidden="true"></span> <h2> {props.company.charAt(0).toUpperCase() + props.company.slice(1)} - {props.description} </h2>
    </div>
  );
}

// Component for user input form.
export function FormButton(props){
  return (<div className="userDataDiv">
    <button className="userDataBtn"><Link to="/login/form" className="userDataLink"> Self Report Data </Link></button>
  </div>);
}

function WrapSpinner() {
  useEffect(() => {document.querySelector('main').classList.add('pt-2')});
  return (
    <>
      <h3 className='text-center'>Fetching data</h3>
      <Spinner className="mx-auto d-block" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </>
  )
}

export default App;
