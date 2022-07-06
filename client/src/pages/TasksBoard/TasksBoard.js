import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { PrjectsStatusCharts, BasicLineCharts } from './DashboardProjectCharts';
import TasksTable from './TasksTable';

const TasksBoard = () => {
  document.title="Dashboard | Velzon - React Admin & Dashboard Template";

  useEffect(() => { 
    if (sessionStorage.getItem("loggedIn") !== '1') {   
        sessionStorage.setItem("loggedIn", 1);
        window.location.reload();
    }
}, []);

  return (
    <React.Fragment>      
      <div className="page-content">           
        <Container fluid>
          <BreadCrumb title="Tasks" pageTitle="Dashboard" />
          {/* <AllTasks /> */}
          {/* {(sessionStorage.getItem("loggedIn") === 1)? */}
          <>
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
                                    <BasicLineCharts/>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                <Col xxl={4} lg={6}>
                        <Card className="card-height-100">
                            <CardHeader className="align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Tasks Status</h4>
                                {/* <div className="flex-shrink-0">
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
                                </div> */}
                            </CardHeader>

                            <CardBody>
                                <PrjectsStatusCharts/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </>
            {/* :
            <h3>
                Loading...
            </h3>
          } */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TasksBoard;