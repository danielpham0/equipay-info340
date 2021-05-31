import React from 'react';
import {useLocation} from 'react-router-dom';
import lodash from 'lodash';
import queryString from 'query-string';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ChartForm(props) {
  /* Expected format for options object
  options = {
    'Ethnicity': [array of <option>'s],
    'Gender': [array of <option>'s],
    'Sexual Orientation': [array of <option>'s]
  }
   */

  let options = {};
  for (let label of ['Ethnicity', 'Gender', 'Sexual Orientation']) {
    options[label] = lodash.uniq(lodash.map(props.data, (d) => d[label]));
    options[label] = lodash.sortBy(options[label]);
    options[label] = lodash.map(options[label], (d) => <option key={d}>{d}</option>);
  }

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
    window.history.pushState({}, null, pathname + '?' + queryString.stringify(filters));
    props.setUpdate(true);
  }

  return (
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
  );
}

function FormSelections(props) {
  let label = props.label;
  React.useEffect(() => {
    let search = queryString.parse(window.location.search);
    console.log('search', search);
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