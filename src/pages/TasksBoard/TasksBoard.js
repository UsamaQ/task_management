import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { PrjectsStatusCharts, BasicLineCharts } from './DashboardProjectCharts';
import TasksTable from './TasksTable';

const TasksBoard = () => {
  document.title="Tasks Board | Velzon - React Admin & Dashboard Template";

  return (
    <React.Fragment>      
      <div className="page-content">           
        <Container fluid>
          <BreadCrumb title="Tasks Board" pageTitle="Dashboard" />
          {/* <AllTasks /> */}
          
          <Row>
              <Col lg={12}>
                  <TasksTable/>
              </Col>
          </Row>
          
          <Row>
          <Col lg={6}>
                <Card>
                    <CardHeader>
                        <h4 className="card-title mb-0">Basic Line Chart</h4>
                    </CardHeader>
                    <CardBody>
                        <div>
                            <BasicLineCharts dataColors='["--vz-primary"]' />
                        </div>
                    </CardBody>
                </Card>
            </Col>
          <Col xxl={4} lg={6}>
                <Card className="card-height-100">
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Tasks Status</h4>
                        <div className="flex-shrink-0">
                            <UncontrolledDropdown className="card-header-dropdown">
                                <DropdownToggle tag="a" className="dropdown-btn text-muted" role="button">
                                    All Time <i className="mdi mdi-chevron-down ms-1"></i>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem>All Time</DropdownItem>
                                    <DropdownItem>Last 7 Days</DropdownItem>
                                    <DropdownItem>Last 30 Days</DropdownItem>
                                    <DropdownItem>Last 90 Days</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </CardHeader>

                    <CardBody>
                        <div id="prjects-status" className="apex-charts" dir="ltr">
                            <PrjectsStatusCharts dataColors ='["--vz-success", "--vz-primary", "--vz-warning", "--vz-danger"]'/>
                        </div>
                        <div className="mt-5">
                            <div className="d-flex justify-content-center align-items-center mb-4">
                                <h2 className="me-3 ff-secondary mb-0">258</h2>
                                <div>
                                    <p className="text-muted mb-0">Total Tasks</p>
                                    <p className="text-success fw-semibold mb-0">
                                        <span className="badge badge-soft-success p-1 rounded-circle"><i className="ri-arrow-right-up-line"></i></span> +3 New
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TasksBoard;