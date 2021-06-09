import {React, useState} from 'react';
import {NavLink} from 'react-router-dom';
import firebase from 'firebase/app';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FORM from './form-options.json';

// Java script page that develops the html for the form page
// This page also add interactivity as the user has to input different
// data into the form. The form uses firebase to track what data is being
// entered into the form. This data is then reflected into our graphs

//One concern we have is people inputing data that is false because its hard
//to confirm they actually work at a certain company

function FormPage(props) {
  const [form, setForm] = useState(FORM.default);
  function onButtonClickHandler(event) {
    event.preventDefault();
    const ref = firebase.database().ref('companies');
    let entry = {...form};
    delete entry.Company
    entry["Base Salary"] = parseInt(entry["Base Salary"]);
    ref.child(form.Company.toLowerCase()).push(entry);
    setForm(FORM.default);
    console.log(entry);
    window.alert("Your submission has been successful!");
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setForm({
      ...form,
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
          <form onSubmit={onButtonClickHandler} id="signUpForm" className="form">
            <div className="form-group row">
              <label htmlFor="companyInput" className="col-lg-1">Company</label>
              <div className="col-lg-11">
                <select id="companyInput" name="Company" value={form["Company"]} onChange={handleChange}
                  className="form-control" required>
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
                <select id="roleInput" name="Job Title" value={form["Job Title"]} onChange={handleChange} className="form-control" required>
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
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
            {/* <div className="form-group row">
            <label htmlFor="dateInput" className="col-lg-1">Date</label>
            <div className="col-lg-11">
            <input type="date" id="dateInput" className="form-control" required></input>
            <div className="invalid-feedback">Please provide a date</div>
            </div>
          </div> */}
            <button type="submit" id="btnSubmit" className="btn btn-primary">Submit!</button>
          </form>
        </div>
      </main>
    </div>
  )
  return (
    <Form onSubmit={} >
      <FormSelections />
    </Form>
  )
}

/**
```
props = {
  options: // an array of <option>'s this component will contain
  label: // the label of this form group, which also corresponds to the search parameters in the URL
}
```
 */
function FormSelections(props) {
  let label = props.label;
  let options = FORM.options[label].map(
    opt => {
      <option key={opt.label} value={opt.value}>
        {opt.label}
      </option>
    }
  );
  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as='select'>
        {options}
      </Form.Control>
    </Form.Group>
  );
}

/*
  <Form
    onSubmit={changeChart}
    className={props.className}
  >
    <FormSelections options={options} label="Gender" />
    <FormSelections options={options} label="Ethnicity" />
    <FormSelections options={options} label="Sexual Orientation" />
    <Button variant="primary" type="submit">
      Change Chart
    </Button>
  </Form>
  */

export default FormPage;
