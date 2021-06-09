/*
 * This module handles the form of the chart page that changes the chart based on user input.
 */

import React from 'react';
import {useLocation} from 'react-router-dom';
import lodash from 'lodash';
import queryString from 'query-string';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
```
props = {
  data: // data for the current company
  setUpdate: // function to set the chartNeedsUpdate state variable of the to 'true'; this causes the chart to update with the current (changed) filters
  className: // classes to apply to this component
}
```
 */
function ChartForm(props) {
  /* End format for options object
  options = {
    'Ethnicity': [array of <option>'s],
    'Gender': [array of <option>'s],
    'Sexual Orientation': [array of <option>'s]
  }
   */

  // Get the unique values of 'Ethnicity', 'Gender', and 'Sexual Orientation' within the data and turn them into <option>'s for use in the form.
  let options = {};
  for (let label of ['Ethnicity', 'Gender', 'Sexual Orientation']) {
    options[label] = lodash.uniq(lodash.map(props.data, (d) => d[label]));
    options[label] = lodash.sortBy(options[label]);
    options[label] = lodash.map(options[label], (d) => <option key={d}>{d}</option>);
  }

  // Gets the current URL without the search parameters
  const {pathname} = useLocation();
  const changeChart = (event) => {
    event.preventDefault();
    let selects = document.querySelectorAll('select');
    let filters = {};
    for (let select of selects) {
      if (select.value !== 'All') {
        filters[select.id] = select.value;
      }
    }
    // Change the current URL without redirecting or reloading. We use the URL to input filters for the chart to improve shareability of the information. This way, the user needs only share the URL to have the same chart show to their friends and coworkers.
    window.history.pushState({}, null, pathname + '?' + queryString.stringify(filters));
    // The chart needs to change to reflect changed filters
    props.setUpdate(true);
  }

  return (
    <Form
      onSubmit={changeChart}
      className={props.className}
    >
      <ChartFormSelections options={options} label="Gender" />
      <ChartFormSelections options={options} label="Ethnicity" />
      <ChartFormSelections options={options} label="Sexual Orientation" />
      <Button variant="primary" type="submit">
        Change Chart
      </Button>
    </Form>
  );
}

/**
```
props = {
  options: // an array of <option>'s this component will contain
  label: // the label of this form group, which also corresponds to the search parameters in the URL
}
```
 */
function ChartFormSelections(props) {
  let label = props.label;
  React.useEffect(() => {
    // After form selection component is generated, set its displayed value to the current search value
    let search = queryString.parse(window.location.search);
    document.getElementById(label).value = search[label] || 'All';
  });
  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as='select'>
        <option>All</option>
        {props.options[label]}
      </Form.Control>
    </Form.Group>
  );
}

export default ChartForm;