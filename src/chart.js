import React from 'react';
import Plot from 'react-plotly.js';
import lodash from 'lodash';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {CompanyHeader} from './App';

function ChartPage(props) {
  return (
    <div>
      <h2 className="pt-4 px-4">Compare against the baseline</h2>
      <CompanyHeader company='Google' />
      <Container fluid>
        <Row>
          <Col lg={3}>
            <ChartForm />
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
  console.log('filtered', filtered);
  console.log('filtered 0 1', filtered[0], filtered[1]);
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

  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth * (window.innerWidth < 992 ? 0.9 : 0.7));
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

function ChartForm() {
  return (
    <form id="chartForm" className="form">
      <div className="form-group row">
        <label htmlFor="genderInput" className="col-lg-1">Gender</label>
        <div className="col-lg-11">
          <select id="genderInput" name="gender" className="form-control" required>
            <option value="All">All</option>
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label htmlor="ethnicityInput" className="col-lg-1">Ethnicity</label>
        <div className="col-lg-11">
          <select id="ethnicityInput" name="ethnicity" className="form-control" required>
            <option value="All">All</option>
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="orientationInput" className="col-lg-1">Sexual Orientation</label>
        <div className="col-lg-11">
          <select id="orientationInput" name="sexual orientation" className="form-control" required>
            <option value="All">All</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-11 d-flex flex-column">
          <button id="change-chart" type="submit" className="btn btn-primary d-block my-3">Change Chart</button>
          <p id="chart-result" className="alert d-none"></p>
        </div>
      </div>
    </form>
  );
}

export default ChartPage;