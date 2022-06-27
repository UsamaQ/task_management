import React from 'react';
import { Container } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import AllTasks from './AllTasks';
// import AllTasks from './AddTasksToSprint';


const TaskList = () => {
    document.title="Sprint Tasks | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">           
                <Container fluid>
                    <BreadCrumb title="Sprint Tasks" pageTitle="Sprints" />
                    <AllTasks />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TaskList;