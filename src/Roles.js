import React from 'react';

function RolePage(props){
    return(
    <div>
        <div className="company_header">
            <span className="google_logo" aria-hidden="true"></span> <h2> Google - Roles </h2>
        </div>
        <p className="section_desc"> Select a role to learn about its salary data! </p>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label id="average-button" className="btn btn-secondary active">
                <input type="radio" name="average" id="averageInput" autocomplete="off" /> Average Salary 
            </label>
            <label id="range-button" className="btn btn-secondary">
                <input type="radio" name="range" id="rangeInput" autocomplete="off" /> Salary Range
            </label>
        </div>
        <div class="role_frame">
            
        </div>
        <div class="userDataDiv">
          <button class="userDataBtn"><a className="userDataLink" href="form.html">Self Report Data</a></button>
        </div>
    </div>)
}

export default RolePage;