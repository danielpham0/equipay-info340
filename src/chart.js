import React from 'react';
import {CompanyHeader} from './App';

function ChartPage() {
  return (
    <div>
      <h2 className="pt-4 px-4">Compare against the baseline</h2>
      <CompanyHeader company='Google' />
      <div className='container py-3'>
        <div class="col-12 col-lg-3">
          <ChartForm />
        </div>
        <div class="col-12 col-lg-9">
          <Chart />
        </div>
      </div>
    </div >
  );
}

function Chart() {
  return (
    <div id="chart" class="mx-auto"></div>
  );
}

function ChartForm() {
  return (
    <form id="chartForm" class="form">
      <div class="form-group row">
        <label for="genderInput" class="col-lg-1">Gender</label>
        <div class="col-lg-11">
          <select id="genderInput" name="gender" class="form-control" required>
            <option value="All">All</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="ethnicityInput" class="col-lg-1">Ethnicity</label>
        <div class="col-lg-11">
          <select id="ethnicityInput" name="ethnicity" class="form-control" required>
            <option value="All">All</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="orientationInput" class="col-lg-1">Sexual Orientation</label>
        <div class="col-lg-11">
          <select id="orientationInput" name="sexual orientation" class="form-control" required>
            <option value="All">All</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col col-lg-11 d-flex flex-column">
          <button id="change-chart" type="submit" class="btn btn-primary d-block my-3">Change Chart</button>
          <p id="chart-result" class="alert d-none"></p>
        </div>
      </div>
    </form>
  );
}

export default ChartPage;