import {React, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {CompanyHeader, Nav, FormButton} from './App';
import amazon_card from "./imgs/amazon_card.jpeg";
import google_card from "./imgs/google_card.jpeg";
import microsoft_card from "./imgs/microsoft_card.jpeg";
import lodash from 'lodash';

// Object of imported backgrounds for role cards, one for each company.
let cardBackgrounds = {
  google: google_card,
  amazon: amazon_card,
  microsoft: microsoft_card
};

function RolePage(props) {
  const urlParams = useParams();
  let company = urlParams.company;
  const dataArray = [];
  const navLinks = [{Companies: "/companies"}];
  if (props.data[company]) {
    navLinks.push({[company.charAt(0).toUpperCase() + company.slice(1)]: "/roles/" + company});
    // Turns list of objects into an array, allowing our data to be used more easily
    Object.keys(props.data[company]).forEach((key) => {
      dataArray.push(props.data[company][key]);
    });
  } else {
    return (
      <>
        <Nav links={navLinks} />
        <p className='text-center mt-3'>An invalid company name was provided</p>
      </>
    )
  }
  return (
    <div>
      <Nav links={navLinks} />
      <CompanyHeader company={company} description={'Roles'} />
      <p className="section_desc"> Select a role to learn about its salary data! </p>
      <RoleFrame data={dataArray} company={company} />
      <FormButton />
    </div>
  );
}

// Role card component which takes in a valueObj {type of value, value} to display role data on the card.
// Also takes in company and role title to display role card information.
function RoleCard(props) {
  let keys = Object.keys(props.valueObj);
  let titleString = props.title.replace(/\s/g, '_').toLowerCase();
  // On click, links user to the chart for that specific company and role
  let url = '/chart/' + props.company + "/" + titleString;
  let background = cardBackgrounds[props.company];
  return (<div className='role_card'>
    <Link to={url}>
      <h3 className={titleString === 'all_roles' ? 'all_roles' : ''}>
        {props.title}
      </h3>
      <div className='card_content' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.65)), url(${background})`}}>
        <div>{keys[0]}</div>
        <p>{props.valueObj[keys[0]]}</p>
      </div>
    </Link>
  </div>)
}

// List of role cards based on the number of unique roles from a company
// Takes in data prop
function RoleList(props) {
  // Used method of finding distinct values from array of json files from here:
  // https://codeburst.io/javascript-array-distinct-5edc93501dc4
  let roleNames = ['ALL ROLES', ...new Set(props.data.map(x => x['Job Title']))] || [];
  let roleCards = lodash.map(roleNames, function (role) {
    let salaryData = role === 'ALL ROLES' ? props.data.map(
      data => data['Base Salary']) : lodash.filter(
        props.data, {'Job Title': role}).map(
          data => data['Base Salary']);
    let valueObj = retrieveSalaryValue(salaryData, props.type);
    return <RoleCard key={role} title={role} valueObj={valueObj} company={props.company} />
  });
  return (<div className="role_frame">
    {roleCards}
  </div>);
}

// Renders Role List with type of information ('Range') or ('Average Salary') using a button
function RoleFrame(props) {
  const [option, setOption] = useState('Average Salary');
  // Changes option if button is pressed
  const handleClick = (event) => {
    setOption(option === 'Average Salary' ? 'Range' : 'Average Salary');
  }
  // Renders depending on selected option
  if (option === 'Range') {
    return (<div>
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <button id="average-button" className="btn btn-secondary" onClick={handleClick}> Average Salary </button>
        <button id="range-button" className="btn btn-secondary active" onClick={handleClick}> Salary Range </button>
      </div>
      <RoleList data={props.data} type='Range' company={props.company} />
    </div>);
  } else {
    return (<div>
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <button id="average-button" className="btn btn-secondary active" onClick={handleClick}> Average Salary </button>
        <button id="range-button" className="btn btn-secondary" onClick={handleClick}> Salary Range </button>
      </div>
      <RoleList data={props.data} type='Average Salary' company={props.company} />
    </div>);
  }
}

/**
 * Returns a value object reflecting salary which is based on a title and the type of value we're looking for
 * @param {Array} data of values relating to salary
 * @param {String} type the type of value user wants displayed for role - either a range or an average salary.
 * @returns {Object} of value pair indicating what the string is reflecting and what the value for salary is.
 */
function retrieveSalaryValue(salaryData, type) {
  let valueObj = {};
  if (type === 'Range') {
    let val = '$' + Math.min(...salaryData).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'k - $' + Math.max(...salaryData).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'k';
    valueObj = {'Range': val};
  } else {
    let val = '$' + Math.round((salaryData.reduce((a, b) => a + b, 0) / salaryData.length)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'k';
    valueObj = {'Average Salary': val};
  }
  return valueObj;
}

export default RolePage;