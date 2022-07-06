import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { Button, Card, CardBody, Col, Container, Form, Input, Label, Modal, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { map } from "lodash";
import UncontrolledBoard from './UncontrolledBoard';
import { kanbanBoardData } from '../../../common/data';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { getTaskList } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from "lodash";


const KanbanBoard = () => {
    document.title="lmno | Velzon - React Admin & Dashboard Template";

    
    const dispatch = useDispatch();
    const [TaskList, setTaskList] = useState([]);


    const { taskList } = useSelector((state) => ({
        taskList: state.Tasks.taskList,
      }));

        // useEffect(() => {
        // }, [taskList]);
        // // Get Data
        // useEffect(() => {
        // }, [dispatch]);
        // useEffect(() => {
        // }, [taskList]);
        
        useEffect(() => {
            // dispatch(getTaskList());

            if (!isEmpty(taskList)) 
                {setTaskList(taskList);}

            if (taskList && !taskList.length) 
                {dispatch(getTaskList());}

        }, [dispatch, taskList]);

        // console.log(taskList);
    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    const data = map(taskList, task => ({ ...task, cards: task }));
    // data.length = Math.min(data.length, 6);

    return (
        <React.Fragment>           
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Dashboard" pageTitle="Tasks" />
                    <Card>
                        <CardBody>
                            <Row className="g-2">
                                <Col lg={12} className="col-auto">
                                    <div className="search-box">
                                        <Input type="text" className="form-control search" placeholder="Search for project, tasks..." />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    <UncontrolledBoard board={{ columns: data }} content={taskList} />

                    

                    {/* Delete Record Modal */}
                    <Modal isOpen={modal_delete} centered modalClassName="zoomIn" id="deleteRecordModal">
                        <div className="modal-header">
                            <Button type="button" onClick={() => { setmodal_delete(false); }} className="btn-close" aria-label="Close" >
                            </Button>
                        </div>
                        <div className="modal-body">
                            <div className="mt-2 text-center">
                                <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                                    colors="primary:#f7b84b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                    <h4>Are you sure ?</h4>
                                    <p className="text-muted mx-4 mb-0">Are you sure you want to remove this tasks ?</p>
                                </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                <Button color="light" className="w-sm" onClick={() => setmodal_delete(false)}>Close</Button>
                                <Button color="danger" className="w-sm" id="delete-record">Yes, Delete It!</Button>
                            </div>
                        </div>
                    </Modal>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default KanbanBoard;