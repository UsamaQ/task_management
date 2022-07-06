import React from 'react';
import { Container } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import AllTasks from './AllTasks';


const TaskList = () => {
    document.title="Backlog Tasks | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">           
                <Container fluid>
                    <BreadCrumb title="Backlog Tasks" pageTitle="Backlogs" />
                    <AllTasks />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TaskList;