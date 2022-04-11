import React, { useState, useEffect } from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components

import "./argon-dashboard-react.css";

const Tables = (props) => {
  //console.log(props.statistics[0])
  const [compteur, setCompteur] = useState(0);
  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid style={{ paddingTop: "100px" }}>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Card tables</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">All tickets</th>
                    <th scope="col">Closed Tickets</th>
                    <th scope="col">In Progress</th>
                    <th scope="col">With issues</th>
                    <th scope="col">Productivity</th>
                  </tr>
                </thead>
                <tbody>
                  {props.statistics.map((item, index) => {
                    return (
                      <>
                        {index >= compteur && index <= compteur + 5 ? (
                          <tr key={index}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <span className="mb-0 text-sm">
                                  {Object.values(props.statistics[index])[3]}
                                </span>
                              </Media>
                            </th>
                            <td>
                              {Object.values(props.statistics[index])[0]}{" "}
                              tickets
                            </td>
                            <td>
                              {Object.values(props.statistics[index])[1]}{" "}
                              tickets
                            </td>
                            <td>
                              {Object.values(props.statistics[index])[2]}{" "}
                              tickets
                            </td>
                            <td>
                              {Object.values(props.statistics[index])[6]}{" "}
                              tickets
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="mr-2">60%</span>
                                <div>
                                  <Progress
                                    max="100"
                                    value="60"
                                    barClassName="bg-danger"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  className="btn-icon-only text-light"
                                  href="#pablo"
                                  role="button"
                                  size="sm"
                                  color=""
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-arrow"
                                  right
                                >
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Another action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Something else here
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={() => {
                          if (compteur > 0) {
                            setCompteur(compteur - 5);
                          }
                        }}
                        tabIndex="-1"
                      >
                        <i className="fa fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={() => setCompteur(compteur + 5)}
                      >
                        <i className="fa fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
