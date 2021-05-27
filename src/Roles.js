import React from 'react';
import {CompanyHeader} from './App';
import * as d3 from 'd3';
import {Link} from 'react-router-dom';
import all_roles_card from "./imgs/all_roles_card.jpeg";
import software_dev_card from "./imgs/software_dev_card.jpg";
import ux_designer_card from "./imgs/ux_designer_card.jpg";
import proj_manager_card from "./imgs/proj_manager_card.jpg";

{/* example for what it needs to look like */}
{/* <div className=""role_card" style={{backgroundImage: `url(${all_roles_card})`}}}> </div> */}

function RolePage(props){
    let roleList = [{'title': 'All Roles', description: {'Range':'100k-120k'}},
      {'title': 'Software Dev', description: {'Range':'100k-120k'}},
      {'title': 'UX Designer', description: {'Range':'100k-120k'}},
      {'title': 'All Roles', description: {'Range':'100k-120k'}},
      {'title': 'Software Dev', description: {'Range':'100k-120k'}},
      {'title': 'UX Designer', description: {'Range':'100k-120k'}}];

    return(
    <div>
        <CompanyHeader company='Google' />
        <p className="section_desc"> Select a role to learn about its salary data! </p>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label id="average-button" className="btn btn-secondary active">
                <input type="radio" name="average" id="averageInput" autoComplete="off" /> Average Salary
            </label>
            <label id="range-button" className="btn btn-secondary">
                <input type="radio" name="range" id="rangeInput" autoComplete="off" /> Salary Range
            </label>
        </div>
        <RoleList roles={roleList}/>
        <div className="userDataDiv">
          <button className="userDataBtn"><a className="userDataLink" href="form.html">Self Report Data</a></button>
        </div>
    </div>)
}

function RoleCard(props) {
    let keys = Object.keys(props.valueObj);
    let url = '/chart/:company/' + props.title.replace(/\s/g, '_');
    return(<div className='role_card'>
        <Link to={url}>
        <h3>
            {props.title}
        </h3>
        <div className='card_content'>
            <div>{keys[0]}</div>
            <p>{props.valueObj[keys[0]]}</p>
        </div>
        </Link>
    </div>)
}

function RoleList(props){
  let list = props.roles || [];
  let roleCards = list.map((role) => {
    return <RoleCard title={role.title} valueObj={role.description} />;
  })
  return(<div className="role_frame">
    {roleCards}
  </div>);
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

export default RolePage;