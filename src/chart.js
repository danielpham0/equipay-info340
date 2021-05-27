import React from 'react';
import Plot from 'react-plotly.js';
import lodash from 'lodash';

import {CompanyHeader} from './App';

function ChartPage(props) {
  return (
    <div>
      <h2 className="pt-4 px-4">Compare against the baseline</h2>
      <CompanyHeader company='Google' />
      <div className='container py-3'>
        <div className="col-12 col-lg-3">
          <ChartForm />
        </div>
        <div className="col-12 col-lg-9">
          <Chart data={props.data} />
        </div>
      </div>
    </div >
  );
}

function Chart(props) {

  // let temp = lodash.filter(props.data, filters);

  // let y = [];
  // for (let i = 0; i < 500; i++) {
  //   y[i] = Math.random();
  // }

  let baseline = lodash.map(props.data, 'Base Salary');
  let max = Math.max(baseline);

  let data = [
    {
      x: baseline,
      type: 'histogram',
      histnorm: 'probability',
      xbins: {end: max, size: 10000, start: 0}
    }
  ];
  console.log(data.y);
  return (
    <Plot
      data={data}
      layout={{width: window.innerWidth / 2, height: window.innerWidth / 2.5, title: 'A Fancy Plot'}}
    />
  );
  // return <div></div>;
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