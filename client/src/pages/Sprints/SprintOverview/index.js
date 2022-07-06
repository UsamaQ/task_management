import React from 'react';
import { Container } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import OverviewTab from './OverviewTab';


const ProjectOverview = () => {
    document.title="Sprint Details | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">                
                <Container fluid>        
                <BreadCrumb title="Sprint Details" pageTitle="Sprints" />
                <OverviewTab />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectOverview;