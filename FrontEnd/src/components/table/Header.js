/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

const Header = () => {
  return (
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              New users
            </CardTitle>
            <span className="h2 font-weight-bold mb-0">2,356</span>
          </div>
          <Col className="col-auto">
            <div className="iconDashboard icon-shape bg-warning text-white rounded-circle shadow">
              <i className="fa fa-user" />
            </div>
          </Col>
        </Row>
        <p className="mt-3 mb-0 text-muted text-sm">
          <span className="text-danger mr-2">
            <i className="fa fa-arrow-down" /> 3.48%
          </span>{" "}
          <span className="text-nowrap">Since last week</span>
        </p>
      </CardBody>
    </Card>
  );
};

export default Header;
