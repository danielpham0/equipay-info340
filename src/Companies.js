import React from 'react';
import { Link } from 'react-router-dom';
import amazon_logo from "./imgs/amazon_logo.png";
import google_logo from "./imgs/google_logo.png";
import microsoft_logo from "./imgs/microsoft_logo.png";
import {Nav, FormButton} from './App';


let logos = {
    Google: google_logo,
    Amazon: amazon_logo,
    Microsoft: microsoft_logo
  };

function CompanyCard(props){
    let url = '/roles/';
    let logo = logos;
    let company = props.company;
    return (
        <div>
        {/*{companies.map((company) => */}
        <div className="c_card">
            <Link to={url + company.toLowerCase()}> 
                <h3><span className="logo" style={{backgroundImage: `url(${logo[company]})`}} aria-hidden="true"></span>{company}</h3>
                <div className="c_content">
                <p>Check out salaries at {company}</p>
                </div>
            </Link>
            </div>
        {/* )} */}
        </div>
    )
    
}



function CompaniesPage(props){
    
    return (
        <div>
            <Nav links={[{'About Equipay': '/Landing'}]}/>
            <div className="card_frame">
                <CompanyCard company="Google" />
                <CompanyCard company="Amazon" />
                <CompanyCard company="Microsoft" />
                {/* <CompanyCard company={Object.keys(logos)} /> */}
            </div>
            <FormButton /> 
        </div>
    )
}

export default CompaniesPage;
