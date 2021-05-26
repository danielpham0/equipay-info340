import React from 'react';

function CompaniesPage(props){
    return (
        <div>
            <div className="card_frame">
            <div className="c_card">
            <a href="roles.html">
                <h3><span className="google_logo" aria-hidden="true"></span> Google</h3>
                <div className="c_content">
                <p>Check out salaries at Google</p>
                </div>
            </a>
            </div>
            <div className="c_card">
            <h3><span className="amazon_logo" aria-hidden="true"></span> Amazon</h3>
            <div className="c_content">
                <p>Check out salaries at Amazon</p>
            </div>
            </div>
            <div className="c_card">
            <h3><span className="microsoft_logo" aria-hidden="true"></span> Microsoft</h3>
            <div className="c_content">
                <p>Check out salaries at Microsoft</p>
            </div>
            </div>
        </div>
    
        <div className="userDataDiv">
            <button className="userDataBtn"><a className="userDataLink" href="form.html">Self Report Data</a></button>
        </div>
      </div>
    )
}

export default CompaniesPage;