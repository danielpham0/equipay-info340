import React from 'react';
import { NavLink } from 'react-router-dom';
import equalpay from "./imgs/equalpay.png";
import Container from 'react-bootstrap/Container';

//This page generates the landing page; A page that describes the presimise of our problem and how
//we set out to solve it. This page also references the data we are using and has many important details


function LandingPage(props){
    return (
        <div>
            {/* <header>
                <h1>Learn More About EquiPay</h1>
            </header> */}
            <main>
                <nav>
                <ul>
                    <li><NavLink to="/Companies"> Back </NavLink></li>
                </ul>
                </nav>
                <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 p-3">
                    <h2>Understand Your Worth</h2>
                    <img className="picture" alt="showing equal pay" src={equalpay}></img>
                    </div>
                    <div className="col-12 col-md-6 p-3">
                    <h2>Our Purpose</h2>
                    <p>
                        When embarking on a new career path, it is how much you should be paid. This problem is especially true for minority groups because in the past companies have paid them less. To solve this problem EquiPay has set out to create an anonymous salary reporting platform that takes into acount various data points such as company, role, gender, ethnicity, sexual orientation etc. Users will be able to view this data selecting filters of their choice.
                    </p>

                    <p>
                        Our application will help solve the problem of wage inequality by allowing users to review data related to a company and examine trends between salary, demographic and qualifications. This gives them a better idea of how to negotiate if they are an incoming employee, and which roles they want to go for if they are a prospective one. The New York Times also goes into detail about the benefits of sharing salary information <a href="https://www.nytimes.com/2018/08/31/smarter-living/pay-secrecy-national-labor-rights-act.html">here</a>. This puts pressure on companies that show obvious trends against diversity in demographics, and allows employees to ensure that they get the pay they deserve regardless of their ethnicity, gender or sexual orientation.
                    </p>
                    </div>
                </div>
                </div>
                <Container>
                    <h2>The Data</h2>
                    <div className="bottomSection">The data set we used can we found <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fh1bdata.info%2Findex.php%3Fem%3DGoogle%26year%3D2019%26fbclid%3DIwAR2e4ffqUhUS2L32mxPVVmZ1T4j4K0jAZcdWzjWFKHPkk_VD_akU-ui-gZk&h=AT1_Imm1Ss-gHPOIJqww85KFcbNTT8xGB0MWQ7Mv1MlMud0U2nroHXzhfqo7QMbr0l9FelCvs6L408FKdja3iWrq8IOJUrISI4MDy--MxFEeNaaPN7W1L-5mIDh958NkDaSJpQ">here.</a> This data only includes company, role, and salary information. Taking this into account we "made up" the other parts of the data set in a way that would show the data is changing for different demographics. To clarify data related to roles and salary is correct but is not correctly alligned with what demographics they coorespond to.</div>
                </Container>
            </main>
        </div>
    )
}

export default LandingPage;