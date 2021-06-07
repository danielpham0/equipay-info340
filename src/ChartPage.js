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
  const urlParams = useParams();
  // capitalizing first letter of each using method here:
  // https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
  let role = urlParams.role.replace(/_/g, ' ');
  role = role.split(' ').map((str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  })).join(' ');
  let company = urlParams.company;
  let capitalizedCompany = company.charAt(0).toUpperCase() + company.slice(1);
  let navLinks = [{Companies: "/"},
    {[capitalizedCompany]: "/roles/" + company},
    {[role]: "/chart/" + company + "/" + urlParams.role}];
  // Get the data table for the current company
  const dataArray = [];
  // TODO: handle invalid companies with error message
    Object.keys(props.data[company]).forEach((key) => {
      dataArray.push(props.data[company][key]);
    });

  const [chartNeedsUpdate, setUpdate] = React.useState(false);
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