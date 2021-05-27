import React from 'react';
import Plot from 'react-plotly.js';
import lodash from 'lodash';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {CompanyHeader} from './App';
import {FormGroup} from 'react-bootstrap';

function ChartPage(props) {
  return (
    <div>
      <h2 className="pt-4 px-4">Compare against the baseline</h2>
      <CompanyHeader company='Google' />
      <Container fluid>
        <Row>
          <Col lg={3}>
            <ChartForm data={props.data}/>
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
  const filters = {
    'Ethnicity': 'Black',
    'Gender': 'Transgender Female',
    // 'Sexual Orientation': 'Heterosexual'
  }
  let filtered = lodash.filter(props.data, filters);
  let filteredSalaries = lodash.map(
    filtered,
    'Base Salary'
  );

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

  return (
    <Plot
      data={datasets}
      layout={layout}
    />
  );
}

function ChartForm(props) {
  let options = {};
  for (let label of ['Ethnicity', 'Gender', 'Sexual Orientation']) {
    options[label] = lodash.uniq(lodash.map(props.data, (d) => d[label]));
    options[label] = lodash.sortBy(options[label]);
    options[label] = lodash.map(options[label], (d) => <option key={d}>{d}</option>);
  }

  return (
    <Form>
      <FormSelections options={options} label="Gender" />
      <FormSelections options={options} label="Ethnicity" />
      <FormSelections options={options} label="Sexual Orientation" />
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