import React from 'react';
import { Link } from 'react-router-dom';
import amazon_logo from "./imgs/amazon_logo.png";
import google_logo from "./imgs/google_logo.png";
import microsoft_logo from "./imgs/microsoft_logo.png";
import {Nav, FormButton} from './App';

function CompaniesPage(props){
    return (
        <div>
            <Nav links={[{'About Equipay': '/Landing'}]}/>
            <div className="card_frame">
            <div className="c_card">
            <Link to="/roles/google">
                <h3><span className="logo" style={{backgroundImage: `url(${google_logo})`}} aria-hidden="true"></span> Google</h3>
                <div className="c_content">
                <p>Check out salaries at Google</p>
                </div>
            </Link>
            </div>
            <div className="c_card">
            <Link to="/roles/amazon">
                <h3><span className="logo" style={{backgroundImage: `url(${amazon_logo})`}} aria-hidden="true"></span> Amazon</h3>
                <div className="c_content">
                    <p>Check out salaries at Amazon</p>
                </div>
            </Link>
            </div>
            <div className="c_card">
            <Link to="/roles/microsoft">
                <h3><span className="logo" style={{backgroundImage: `url(${microsoft_logo})`}} aria-hidden="true"></span> Microsoft</h3>
                <div className="c_content">
                    <p>Check out salaries at Microsoft</p>
                </div>
            </Link>
            </div>
        </div>
        <FormButton />
      </div>
    )
}

export default CompaniesPage;