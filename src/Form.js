import React from 'react';
import { NavLink } from 'react-router-dom';

function FormPage(props){
    function onButtonClickHandler(){
        window.alert("Your submission has been successful!")
    }
    return (
        <div>
            <main>
                <nav>
                    <ul>
                    <li><NavLink to="/"> Home </NavLink></li>
                    </ul>
                </nav>
                <div className="container">
                    <p className="signUpForm">Input Your Own Data Below!</p>
                    <p className="alert alert-success d-none">You're in!</p>

                    <form id="signUpForm" className="form" novalidate>
                    <div className="form-group row">
                        <label for="companyInput" className="col-lg-1">Company</label>
                        <div className="col-lg-11">
                        <input type="text" id="companyInput" className="form-control" required></input>
                        <div className="invalid-feedback">Please provide a company name</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="roleInput" className="col-lg-1">Role</label>
                        <div className="col-lg-11">
                        <input type="text" id="roleInput" className="form-control" required></input>
                        <div className="invalid-feedback">Please provide a role</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="salaryInput" className="col-lg-1">Salary</label>
                        <div className="col-lg-11">
                        <input type="number" id="salaryInput" className="form-control" required></input>
                        <div className="invalid-feedback">Please provide a salary</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="genderInput" className="col-lg-1">Gender</label>
                        <div className="col-lg-11">
                        <select id="genderInput" name="gender" className="form-control" required>
                            <option value="n/a" selected>N/A</option>
                            <option value="female">Female</option>
                            <option value="gender fluid">Gender Fluid</option>
                            <option value="male">Male</option>
                            <option value="transgender male">Transgender Male</option>
                            <option value="transgender female">Transgender Female</option>
                            <option value="non-binary">Non-binary</option>
                        </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="ethnicityInput" className="col-lg-1">Ethnicity</label>
                        <div className="col-lg-11">
                        <select id="ethnicityInput" name="ethnicity" className="form-control" required>
                        <option value="n/a" selected>N/A</option>
                        <option value="american indian">American Indian</option>
                        <option value="asian">Asian</option>
                        <option value="black">Black</option>
                        <option value="hispanic">Hispanic</option>
                        <option value="pacific islander">Pacific Islander</option>
                        <option value="white">White</option>
                        </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="orientationInput" className="col-lg-1">Sexual Orientation</label>
                        <div className="col-lg-11">
                        <select id="orientationInput" name="sexual orientation" className="form-control" required>
                            <option value="n/a" selected>N/A</option>
                            <option value="asexual">Asexual</option>
                            <option value="bisexual">Bisexual</option>
                            <option value="heterosexual">Heterosexual</option>
                            <option value="homosexual">Homosexual</option>
                            <option value="pansexual">Pansexual</option>
                            <option value="queer">Queer</option>
                            <option value="fluid">Fluid</option>
                        </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="dateInput" className="col-lg-1">Date</label>
                        <div className="col-lg-11">
                        <input type="date" id="dateInput" className="form-control" required></input>
                        <div className="invalid-feedback">Please provide a date</div>
                        </div>
                    </div>
                    <button onSubmit={onButtonClickHandler} type="submit" id="btnSubmit" className="btn btn-primary">Submit!</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default FormPage;
