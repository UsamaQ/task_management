import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { Button, Card, CardBody, Col, Container, Form, Input, Label, Modal, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { map } from "lodash";
import UncontrolledBoard from './UncontrolledBoard';
import { kanbanBoardData } from '../../../common/data';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

// // Import Images
// import avatar1 from "../../../assets/images/users/avatar-1.jpg";
// import avatar2 from "../../../assets/images/users/avatar-2.jpg";
// import avatar3 from "../../../assets/images/users/avatar-3.jpg";
// import avatar5 from "../../../assets/images/users/avatar-5.jpg";
// import avatar6 from "../../../assets/images/users/avatar-6.jpg";
// import avatar7 from "../../../assets/images/users/avatar-7.jpg";
// import avatar8 from "../../../assets/images/users/avatar-8.jpg";
// import avatar10 from "../../../assets/images/users/avatar-10.jpg";

const KanbanBoard = () => {
    document.title="Dashboard | Velzon - React Admin & Dashboard Template";

    // const [modal_board, setmodal_board] = useState(false);
    // function tog_board() {
    //     setmodal_board(!modal_board);
    // }

    // const [modal_member, setmodal_member] = useState(false);
    // function tog_member() {
    //     setmodal_member(!modal_member);
    // }

    // const [modal_newTask, setmodal_newTask] = useState(false);
    // function tog_newTask() {
    //     setmodal_newTask(!modal_newTask);
    // }

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    const data = map(kanbanBoardData, task => ({ ...task, cards: task.tasks }));
    data.length = Math.min(data.length, 6);

    return (
        <React.Fragment>           
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Dashboard" pageTitle="Tasks" />
                    <Card>
                        <CardBody>
                            <Row className="g-2">
                                <Col lg={3} className="col-auto">
                                    <div className="search-box">
                                        <Input type="text" className="form-control search" placeholder="Search for tasks..." />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    <UncontrolledBoard board={{ columns: data }} content={kanbanBoardData} />



                    {/* Delete Record Modal */}



                    <Modal isOpen={modal_delete} toggle={() => { tog_delete(); }} centered modalClassName="zoomIn" id="deleteRecordModal">
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