import React from 'react';
import { NavLink } from 'react-router-dom';
import amazon_logo from "./imgs/amazon_logo.png";
import google_logo from "./imgs/google_logo.png";
import microsoft_logo from "./imgs/microsoft_logo.png";

function CompaniesPage(props){
    return (
        <div>
            <nav>
                <ul>
                <li> <NavLink to="/Landing"> About EquiPay </NavLink> </li>
                </ul>
            </nav>

            <div className="card_frame">
            <div className="c_card">
            <NavLink to="/roles/:company">
                <h3><span className="google_logo" style={{backgroundImage: `url(${google_logo})`}} aria-hidden="true"></span> Google</h3>
                <div className="c_content">
                <p>Check out salaries at Google</p>
                </div>
            </NavLink>
            </div>
            <div className="c_card">
            <NavLink to="/roles/:company">
                <h3><span className="amazon_logo" style={{backgroundImage: `url(${amazon_logo})`}} aria-hidden="true"></span> Amazon</h3>
                <div className="c_content">
                    <p>Check out salaries at Amazon</p>
                </div>
            </NavLink>
            </div>
            <div className="c_card">
            <NavLink to="/roles/:company">
                <h3><span className="microsoft_logo" style={{backgroundImage: `url(${microsoft_logo})`}} aria-hidden="true"></span> Microsoft</h3>
                <div className="c_content">
                    <p>Check out salaries at Microsoft</p>
                </div>
            </NavLink>
            </div>
        </div>
    
        <div className="userDataDiv">
            <button className="userDataBtn"><a className="userDataLink" href="form.html">Self Report Data</a></button>
        </div>
      </div>
    )
}

export default CompaniesPage;