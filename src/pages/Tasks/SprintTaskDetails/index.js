import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Comments from './Comments';
import Details from './Details';
// import TimeTracking from "./TimeTracking";

const TaskDetails = () => {
    document.title="Sprint Task Details | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">               
                <Container fluid>
                    <BreadCrumb title="Sprint Task Details" pageTitle="Sprints" />
                    <Row>
                        <Col xxl={3}>
                        </Col>
                        <Col xxl={9}>
                            <Details />
                            {/* <Comments /> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TaskDetails;