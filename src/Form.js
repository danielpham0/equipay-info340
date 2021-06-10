import {React} from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import firebase from 'firebase/app';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FORM from './form-options.json';
import {Row} from 'react-bootstrap';

// Java script page that develops the html for the form page
// This page also adds interactivity as the user has to input different
// data into the form. The form uses firebase to track what data is being
// entered into the form. This data is then reflected in our graphs

// One concern we have is people inputing data that is false because its hard
// to confirm they actually work at a certain company

function FormPage(props) {

  function onSubmit(event) {
    event.preventDefault();

    let form = getForm();
    let entry = {...form};
    delete entry.Company

    entry["Base Salary"] = parseInt(entry["Base Salary"]);
    for (let company in props.data)
        firebase.database().ref('companies').child(company).child(props.user.uid).remove();
    const ref = firebase.database().ref('companies').child(form.Company.toLowerCase());
    ref.child(props.user.uid).set(entry);
    setForm(FORM.DEFAULT);

    // TODO: change?
    window.alert("Your submission has been successful!");
  }

  let selectionsArray = Object.keys(FORM.OPTIONS).map(
    label => <FormSelections
      className={"col-12"}
      key={label}
      label={label}
    />
  );
  let salaryInput = (
    <div className="col-12 form-group" key="Base Salary">
      <label htmlFor="Base Salary">Salary</label>
      <input type="number" id="Base Salary" className="form-control" required></input>
      <div className="invalid-feedback">Please provide a Salary</div>
    </div>
  );
  // Put the salary input below the role selection
  selectionsArray.splice(2, 0, salaryInput);
  if (!props.user){
    return <Redirect to="/login/form" />
  }
  return (
    <div>
      <nav><ul><li><NavLink to="/"> Home </NavLink></li></ul></nav>
      <Form id="input-form" className="p-3" onSubmit={onSubmit} >
        <h2>Input Your Own Data Below!</h2>
        <Row>{selectionsArray}</Row>
        <Button variant="primary" type="submit">
          Submit!
        </Button>
      </Form>
    </div>
  )
}

/**
```
props = {
  className: // the classes to be applied to this component
  label: // the label of this form group, which also corresponds to the properties of FORM.OPTIONS
}
```
 */
function FormSelections(props) {
  let label = props.label;
  let options = FORM.OPTIONS[label].map(
    opt => {
      return (
        <option key={opt.label} value={opt.value}>
          {opt.label}
        </option>
      );
    }
  );
  return (
    <Form.Group controlId={label} className={props.className}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as='select' required>
        {options}
      </Form.Control>
      {/* TODO: is there a react-bootstrap component for invalid feedback? */}
      <div className="invalid-feedback">{"Please provide a " + label}</div>
    </Form.Group>
  );
}

function getForm() {
  let form = {};
  let inputs = document.querySelectorAll("#input-form select");
  for (let input of inputs) {
    form[input.id] = input.value;
  }
  form["Base Salary"] = document.getElementById("Base Salary").value;
  return form;
}

function setForm(form) {
  let groupLabels = Object.keys(form);
  for (let label of groupLabels) {
    document.getElementById(label).value = form[label];
  }
}

export default FormPage;
