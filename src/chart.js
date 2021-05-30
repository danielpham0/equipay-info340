import React from 'react';
import {useParams, useLocation} from 'react-router-dom';
import Plot from 'react-plotly.js';
import lodash from 'lodash';
import queryString from 'query-string';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {CompanyHeader, Nav} from './App';

function ChartPage(props) {
  const urlParams = useParams();
  // capitalizing first letter of each using method here:
  // https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
  let role = urlParams.role.replace(/_/g, ' ');
  role = role.split(' ').map((str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  })).join(' ');
  let company = urlParams.company;
  let navLinks = [{Companies: "/"},
    {[company.charAt(0).toUpperCase() + company.slice(1)]: "/roles/" + company},
    {[role]: "/chart/" + company + "/" + urlParams.role}];
  return (
    <div>
      <Nav links={navLinks} />
      <h2 className="pt-4 px-4">Compare against the baseline</h2>
      <CompanyHeader company={urlParams.company} description={role} />
      <Container fluid>
        <Row>
          <Col lg={3}>
            <ChartForm data={props.data} />
          </Col>
          <Col lg={9}>
            <Chart data={props.data} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function Chart(props) {
  const {search} = useLocation();
  let filters = queryString.parse(search);

  for (let filterKey of Object.keys(filters)) {
    // If the data does not contain a demographic category matching the filter, ignore it.
    // This can only happen if the user is modifying the url in order to change the chart
    if (!props.data[0][filterKey]) {
      delete filters[filterKey];
    }
  }

  let filtered = lodash.filter(props.data, filters);
  let filteredSalaries = lodash.map(filtered, 'Base Salary');

  let baseline = lodash.map(props.data, 'Base Salary');
  let max = Math.max(baseline);

  let datasets = [
    {
      x: baseline,
      type: 'histogram',
      histnorm: 'probability',
      xbins: {end: max, size: 10000, start: 0}
    }
  ];
  datasets[1] = Object.assign({}, datasets[0]);
  datasets[1].x = filteredSalaries;

  const [width, setWidth] = React.useState(
    window.innerWidth * (window.innerWidth < 992 ? 0.9 : 0.675)
  );

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth * (window.innerWidth < 992 ? 0.9 : 0.675));
    });
  });

  let layout = {
    title: 'A Fancy Plot',
    width: width
  }
  console.log(filters);

  return (
    <Plot
      data={datasets}
      layout={layout}
    />
  );
}

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
    console.log("filters", filters);
    console.log("path + searches", pathname + '?' + queryString.stringify(filters));
    window.history.pushState({}, null, pathname + '?' + queryString.stringify(filters));
    window.history.go(0);
  }

  return (
    <Form onSubmit={changeChart}>
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

export default ChartPage;