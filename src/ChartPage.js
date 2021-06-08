/*
 * This module handles the display of the chart and its form, encapsulating state shared between these elements.
 */
import React from 'react';
import {useParams} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {CompanyHeader, Nav, FormButton} from './App';
import Chart from './Chart';
import ChartForm from './ChartForm';

/**
```
props = {
  data: the data table of salaries and demographics
}
```
 */
function ChartPage(props) {
  // This state is used in chart form and chart
  const [chartNeedsUpdate, setUpdate] = React.useState(false);

  const urlParams = useParams();
  // capitalizing first letter of each using method here:
  // https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
  let role = urlParams.role.replace(/_/g, ' ');
  role = role.split(' ').map((str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  })).join(' ');

  let company = urlParams.company;
  let capitalizedCompany = company.charAt(0).toUpperCase() + company.slice(1);

  const dataArray = [];
  const navLinks = [{Companies: "/"}];
  if (props.data[company]) {
    navLinks.push({[capitalizedCompany]: "/roles/" + company});
    navLinks.push({[role]: "/chart/" + company + "/" + urlParams.role});
    // Get the data table for the current company
    Object.keys(props.data[company]).forEach((key) => {
      dataArray.push(props.data[company][key]);
    });
  } else {
    return (
      <>
        <Nav links={navLinks} />
        <p className='text-center mt-3'>An invalid company name was provided</p>
      </>
    )
  }

  return (
    <>
      <Nav links={navLinks} />
      <h2 className="pt-4 px-4">Compare against the baseline</h2>
      <CompanyHeader company={urlParams.company} description={role} />
      <Container id='chartContainer' fluid>
        <Row>
          <Col lg={3}>
            <ChartForm
              className='my-3 ml-lg-3'
              data={dataArray}
              setUpdate={setUpdate}
            />
          </Col>
          <Col lg={9}>
            <Chart
              className='mb-3 ml-lg-0 mt-lg-3'
              data={dataArray}
              chartNeedsUpdate={chartNeedsUpdate}
              setUpdate={setUpdate}
              company={capitalizedCompany}
              role={role}
            />
          </Col>
        </Row>
      </Container>
      <FormButton />
    </>
  );
}

export default ChartPage;