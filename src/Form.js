import {React, useState} from 'react';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase/app';

const companyOptions = [
    {label: "Google", value: "google"},
    {label: "Amazon", value: "amazon"},
    {label: "Microsoft", value: "microsoft"},
    {label: "Netflix", value: "netflix"}
]
const ethnicityOptions = [
    {label: "Not Listed", value: "N/A"},
    {label: "American Indian", value: "American Indian"},
    {label: "Asian", value: "Asian"},
    {label: "Black", value: "Black"},
    {label: "Hispanic", value: "Hispanic"},
    {label: "Pacific Islander", value: "Pacific Islander"},
    {label: "White", value: "White"}
]
const genderOptions = [
    {label: "Not Listed", value: "N/A"},
    {label: "Female", value: "Female"},
    {label: "Gender Fluid", value: "Gender Fluid"},
    {label: "Male", value: "Male"},
    {label: "Transgender Male", value: "Transgender Male"},
    {label: "Transgender Female", value: "Transgender Female"},
    {label: "Non-binary", value: "Non-Binary"}
]
const orientationOptions = [
    {label: "Not Listed", value: "N/A"},
    {label: "Asexual", value: "Asexual"},
    {label: "Bisexual", value: "Bisexual"},
    {label: "Heterosexual", value: "Heterosexual"},
    {label: "Homosexual", value: "Homosexual"},
    {label: "Pansexual", value: "Pansexual"},
    {label: "Queer", value: "Queer"},
    {label: "Fluid", value: "Fluid"}
]

function FormPage(props){
    const [form, setForm] = useState({"Company": "google", "Job Title": "",
        "Base Salary": "", "Ethnicity": "n/a", "Gender": "n/a", 
        "Sexual Orientation": "n/a"});
    function onButtonClickHandler(event){
        event.preventDefault();
        const ref = firebase.database().ref('companies').child(form.Company);
        let entry = {...form};
        delete entry.Company
        entry["Base Salary"] = parseInt(entry["Base Salary"]);
        ref.push(entry);
        console.log(entry);
        window.alert("Your submission has been successful!");
    }
    const handleChange = (event) => {
        const value = event.target.value;
        setForm({...form,
                [event.target.name]: value
            })
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
                    <form id="signUpForm" className="form">
                    <div className="form-group row">
                        <label htmlFor="companyInput" className="col-lg-1">Company</label>
                        <div className="col-lg-11">
                        <select id="companyInput" name="Company" value={form["Company"]} onChange={handleChange} className="form-control" required>
                        {companyOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <div className="invalid-feedback">Please provide a company name</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="roleInput" className="col-lg-1">Role</label>
                        <div className="col-lg-11">
                        <input type="text" id="roleInput" name="Job Title" value={form["Job Title"]} onChange={handleChange} className="form-control" required />
                        <div className="invalid-feedback">Please provide a role</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="salaryInput" className="col-lg-1">Salary</label>
                        <div className="col-lg-11">
                        <input type="number" id="salaryInput" name="Base Salary" value={form["Base Salary"]} onChange={handleChange} className="form-control" required />
                        <div className="invalid-feedback">Please provide a salary</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="genderInput" className="col-lg-1">Gender</label>
                        <div className="col-lg-11">
                        <select id="genderInput" name="Gender" value={form["Gender"]} onChange={handleChange} className="form-control" required>
                            {genderOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="ethnicityInput" className="col-lg-1">Ethnicity</label>
                        <div className="col-lg-11">
                        <select id="ethnicityInput" name="Ethnicity" value={form["Ethnicity"]} onChange={handleChange} className="form-control" required>
                        {ethnicityOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="orientationInput" className="col-lg-1">Sexual Orientation</label>
                        <div className="col-lg-11">
                        <select id="orientationInput" name="Sexual Orientation" value={form["Sexual Orientation"]} onChange={handleChange} className="form-control" required>
                        {orientationOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="dateInput" className="col-lg-1">Date</label>
                        <div className="col-lg-11">
                        <input type="date" id="dateInput" className="form-control" required></input>
                        <div className="invalid-feedback">Please provide a date</div>
                        </div>
                    </div>
                    <button onClick={onButtonClickHandler} type="submit" id="btnSubmit" className="btn btn-primary">Submit!</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default FormPage;
