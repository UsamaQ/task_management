import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import OverviewTab from './OverviewTab';


const ProjectOverview = () => {
  let {id} = useParams();


    document.title={id}+"Backlog Details | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">                
                <Container fluid>    
                <BreadCrumb title="Backlog Details" pageTitle="Backlogs" />
                <OverviewTab />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectOverview;