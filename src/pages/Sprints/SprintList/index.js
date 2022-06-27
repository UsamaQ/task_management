import React from 'react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Container } from 'reactstrap';
import AllSprints from './AllSprints';

const SprintList = () => {
    document.title="Sprint List | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">                
                <Container fluid>
                    <BreadCrumb title="Sprint List" pageTitle="Sprints" />
                    <AllSprints/>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default SprintList;