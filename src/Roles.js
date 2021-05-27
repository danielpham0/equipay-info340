import {React, useState} from 'react';
import {Link} from 'react-router-dom';
import all_roles_card from "./imgs/all_roles_card.jpeg";
import software_dev_card from "./imgs/software_dev_card.jpg";
import ux_designer_card from "./imgs/ux_designer_card.jpg";
import proj_manager_card from "./imgs/proj_manager_card.jpg";
import google_logo from "./imgs/google_logo.png";
import lodash from 'lodash';

let cardBackgrounds = {all_roles: all_roles_card, 
  software_development: software_dev_card, 
  ux_designer: ux_designer_card, 
  proj_manager_card: proj_manager_card};

function RolePage(props){
    return(
    <div>
        <div className="company_header">
          <span className="logo" style={{backgroundImage: `url(${google_logo})`}} aria-hidden="true"></span> <h2> Google - Roles </h2>
        </div>
        <p className="section_desc"> Select a role to learn about its salary data! </p>
        <RoleFrame data={props.data}/>
        <div className="userDataDiv">
          <button className="userDataBtn"><a className="userDataLink" href="form.html">Self Report Data</a></button>
        </div>
    </div>)
}

function RoleCard(props) {
  let keys = Object.keys(props.valueObj);
  let titleString = props.title.replace(/\s/g, '_').toLowerCase();
  let url = '/chart/:company/' + titleString;
  let background = cardBackgrounds[titleString] || cardBackgrounds['all_roles'];
  return(<div className='role_card'>
      <Link to={url}>
      <h3>
        {props.title}
      </h3>
      <div className='card_content' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.65)), url(${background})`}}>
        <div>{keys[0]}</div>
          <p>{props.valueObj[keys[0]]}</p>
      </div>
      </Link>
  </div>)
}

function RoleList(props){
  // Used method of finding distinct values from array of json files from here:
  // https://codeburst.io/javascript-array-distinct-5edc93501dc4
  let roleNames = ['ALL ROLES', ...new Set(props.data.map(x => x['Job Title']))] || [];
  let roleCards = lodash.map(roleNames, function(role){
    let salaryData = role === 'ALL ROLES' ? props.data.map(
      data => data['Base Salary']) : lodash.filter(
        props.data, {'Job Title': role}).map(
          data => data['Base Salary']);
    let valueObj = retrieveSalaryValue(salaryData, props.type);
    return <RoleCard key={role} title={role} valueObj={valueObj}/>
  });
  return(<div className="role_frame">
    {roleCards}
  </div>);
}

function RoleFrame(props) {
  const [option, setOption] = useState('Average Salary');
  const handleClick = (event) => {
    setOption(option === 'Average Salary' ? 'Range' : 'Average Salary');
  }
  if(option === 'Range'){
    return(<div>
    <div className="btn-group btn-group-toggle" data-toggle="buttons">
    <button id="average-button" className="btn btn-secondary" onClick={handleClick}> Average Salary </button>
    <button id="range-button" className="btn btn-secondary active" onClick={handleClick}> Salary Range </button>
    </div>
    <RoleList data={props.data} type='Range'/>
  </div>);
  }else {
    return(<div>
    <div className="btn-group btn-group-toggle" data-toggle="buttons">
    <button id="average-button" className="btn btn-secondary active" onClick={handleClick}> Average Salary </button>
    <button id="range-button" className="btn btn-secondary" onClick={handleClick}> Salary Range </button>
    </div>
    <RoleList data={props.data} type='Average Salary'/>
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
    let val = '$' + Math.round((salaryData.reduce((a,b) => a + b, 0) / salaryData.length)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'k'; 
    valueObj = {'Average Salary': val};
  }
  return valueObj;
}

export default RolePage;