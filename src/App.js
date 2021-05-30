import RolePage from './Roles';
import CompaniesPage from './Companies';
import LandingPage from './Landing';
import ChartPage from './ChartPage';
import FormPage from './form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch, Link, Redirect, NavLink} from 'react-router-dom';
import amazon_logo from "./imgs/amazon_logo.png";
import google_logo from "./imgs/google_logo.png";
import microsoft_logo from "./imgs/microsoft_logo.png";

let logos = {
  google: google_logo,
  amazon: amazon_logo,
  microsoft: microsoft_logo
};

function App(props) {
  return (
    <div className="App">
      <header>
        <h1><Link to='/landing'>EquiPay</Link></h1>
        <div className="creators">
          <p>Daniel Pham, Shane Fretwel, Ryan Carroll</p>
        </div>
      </header>
      <main>
          <Switch>
            <Route path='/landing'> <LandingPage /> </Route>
            <Route exact path='/'> <CompaniesPage /> </Route>
            <Route path='/roles/:company'> <RolePage data={props.data}/> </Route>
            <Route path='/chart/:company/:role'> <ChartPage data={props.data} /> </Route>
            <Route path='/form'> <FormPage /> </Route>
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

export function CompanyHeader(props) {
  let logo = logos[props.company];
  return (
    <div className="company_header">
      <span className="logo" style={{backgroundImage: `url(${logo})`}} aria-hidden="true"></span> <h2> {props.company.charAt(0).toUpperCase() + props.company.slice(1)} - {props.description} </h2>
    </div>
  );
}

export default App;
