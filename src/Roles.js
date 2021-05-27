import React from 'react';
import {CompanyHeader} from './App';
import * as d3 from 'd3';
import {Link} from 'react-router-dom';
import all_roles_card from "./imgs/all_roles_card.jpeg";
import software_dev_card from "./imgs/software_dev_card.jpg";
import ux_designer_card from "./imgs/ux_designer_card.jpg";
import proj_manager_card from "./imgs/proj_manager_card.jpg";
import google_logo from "./imgs/google_logo.png";

{/* example for what it needs to look like */}
{/* <div className=""role_card" style={{backgroundImage: `url(${all_roles_card})`}}}> </div> */}
let cardBackgrounds = {all_roles: all_roles_card, 
  software_development: software_dev_card, 
  ux_designer: ux_designer_card, 
  proj_manager_card: proj_manager_card};
let roleList = [{'title': 'All Roles', description: {'Range':'100k-120k'}}, 
  {'title': 'Software Development', description: {'Range':'100k-120k'}}, 
  {'title': 'UX Designer', description: {'Range':'100k-120k'}}];

function RolePage(props){
    //d3.csv(props.data, function(data) { console.log(data); });

    return(
    <div>
        <div className="company_header">
          <span className="logo" style={{backgroundImage: `url(${google_logo})`}} aria-hidden="true"></span> <h2> Google - Roles </h2>
        </div>
        <p className="section_desc"> Select a role to learn about its salary data! </p>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label id="average-button" className="btn btn-secondary active">
                <input type="radio" name="average" id="averageInput" autoComplete="off" /> Average Salary 
            </label>
            <label id="range-button" className="btn btn-secondary">
                <input type="radio" name="range" id="rangeInput" autoComplete="off" /> Salary Range
            </label>
        </div>
        <RoleList data={props.data} type='Range' roles={roleList}/>
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
  let list = props.roles || [];
  let roleCards = list.map((role) => {
    return <RoleCard title={role.title} key={role.title} valueObj={role.description} />;
  })
  return(<div className="role_frame">
    {roleCards}
  </div>);

  // let data = d3.csv(props.data, (row) => {
  //   return {
  //     jobTitle: row['Job Title'],
  //     baseSalary: parseInt(row['Base Salary'])
  //   };
  // });
  // let cards = data.then(data =>{
  //   let roleList = unique(getCol(data, 'jobTitle'));
  //   let roleCards = roleList.map((role) => {
  //     return <RoleCard key={role} title={role} valueObj={retrieveSalaryValue(data, role, props.type)} />
  //   });
  //   return(<div className="role_frame">
  //     {roleCards}
  //   </div>);
  // });
  // return cards;
}

/**
 * Takes in a data table and filters, returning the data table filtered down to rows that satisfy the filters.
 * @param {Array} data of Objects representing a data table
 * @param {Object} filters of filter name-value pairs, where the names are columns in `data` and the values are values in the corresponding columns of `data`
 */
function filterData(data, filters) {
    // TODO: modify to allow for All selection
    let filterFunction = (row) => {
      let matching = true;
      for (let col in filters) {
        if (row[col] !== filters[col]) {
          matching = false;
        }
      }
      return matching;
    }
    return data.filter(filterFunction);
  }

/**
 * Returns an array of values in a given column of the given data table. If a row does not have a property with the name `col`, then an error is thrown.
 * @param {Array} table table of data.
 * @param {String} col name of column to be returned.
 * @returns {Array} of values in column col.
 */
function getCol(table, col) {
    let out = [];
    for (let row of table) {
      if (row[col]) {
        out.push(row[col]);
      } else {
        throw new ReferenceError("Property " + col + " not found in row " + row);
      }
    }
    return out;
  }

/**
 * Returns an array constructed from only the unique values of the input array
 * @param {Array} array of values
 * @returns {Array} of unique values
 */
function unique(array) {
    // Adapted from https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/
    return array.filter((value, index, self) => self.indexOf(value) === index);
  }

/**
 * Returns a value object reflecting salary which is based on a title and the type of value we're looking for
 * @param {Array} data of Objects representing a data table
 * @param {String} title job position title.
 * @param {String} type the type of value user wants displayed for role - either a range or an average salary.
 * @returns {Object} of value pair indicating what the string is reflecting and what the value for salary is.
 */
function retrieveSalaryValue(data, title, type) {
  let filtered = [];
  if(title === 'ALL ROLES') {
    filtered = getCol(data, 'baseSalary');
  } else{
    filtered = getCol(filterData(data, {jobTitle: title}), 'baseSalary');
  }
  filtered = Object.values(filtered);
  let valueObj = {};
  // used Math functions for finding min, average and max https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
  // used regex for replacing commas https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  if(type === 'Range'){
    let val = '$' + Math.min(...filtered).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'k - $' + Math.max(...filtered).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'k'; 
    valueObj = {'Range': val};
  } else if(type === 'Average Salary'){
    let val = '$' + Math.round((filtered.reduce((a,b) => a + b, 0) / filtered.length)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'k'; 
    valueObj = {'Average Salary': val};
  }
  return valueObj;
}
export default RolePage;