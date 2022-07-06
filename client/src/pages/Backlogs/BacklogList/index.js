import React from 'react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Container } from 'reactstrap';
import AllBacklogs from './AllBacklogs';

const BacklogList = () => {
    document.title="Backlog List | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">                
                <Container fluid>
                    <BreadCrumb title="Backlog List" pageTitle="Backlogs" />
                    <AllBacklogs/>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default BacklogList;