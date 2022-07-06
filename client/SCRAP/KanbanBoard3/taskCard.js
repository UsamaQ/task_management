import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionItem, Button, Card, CardBody, Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Modal, Row, UncontrolledDropdown } from 'reactstrap';
import SimpleBar from 'simplebar-react';
// import classnames from "classnames";
import { map } from "lodash";

const CardTaskBox = props => {


    // const [plusiconCol1, setplusiconCol1] = useState(false);
    // const t_plusiconCol1 = () => {
    //     setplusiconCol1(!plusiconCol1);
    // };


    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    const { data } = props;
    return (
        <React.Fragment>
            <div className="tasks-board mt-2 " id="kanbanboard">
                <div className="tasks-list">

                    {/* <SimpleBar className="tasks-wrapper px-3 mx-n3"> */}
                        <div id="unassigned-task" className="tasks">
                        {/* <Accordion className="custom-accordionwithicon-plus" id="accordionWithplusicon">
                <AccordionItem>
                    <div className={classnames("accordion-header", { collapsed: !plusiconCol1 })} id="accordionwithouticonExample1" type="button" onClick={t_plusiconCol1} style={{ cursor: "pointer" }}>
                        <div> */}
                             {/* className={classnames("accordion-button", { collapsed: !plusiconCol1 })} type="button" onClick={t_plusiconCol1} style={{ cursor: "pointer" }} > */}

                            <Card className="tasks-box" >
                                <CardBody>
                                    <Row>
                                    {/* <div 
                                    // className="d-flex mb-2"
                                    > */}
                                        <Col lg={1} sm={1}>
                                        <span className="text-muted">{data.id}</span>
                                            {/* <p className="fs-16 mb-0 flex-grow-1 text-truncate">{data.isTaskIdHeader ? <Link to="#" className="text-muted fw-medium fs-14 flex-grow-1">{data.taskId}</Link> : <Link to="/apps-tasks-details" className="link-dark">{data.title}</Link>}</p> */}
                                        </Col>
                                        <Col lg={2} sm={11}>
                                        <span className="text-muted">{data.title}</span>
                                            {/* <p className="fs-16 mb-0 flex-grow-1 text-truncate">{data.isTaskIdHeader ? <Link to="#" className="text-muted fw-medium fs-14 flex-grow-1">{data.taskId}</Link> : <Link to="/apps-tasks-details" className="link-dark">{data.title}</Link>}</p> */}
                                        </Col>
                                        <Col lg={8} sm={12} 
                                        // style={{marginRight:2 , marginLeft:2}}
                                        >
                                            <span className="text-muted">{data.desc}</span>
                                        </Col>
                                        <Col lg={1} sm={12} >
                                            <UncontrolledDropdown direction='start'>
                                                <DropdownToggle tag="a" id="dropdownMenuLink1" role="button">
                                                    <i className="ri-more-fill" />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem tag="a" to="/apps-tasks-details"><i className="ri-eye-fill align-bottom me-2 text-muted" />View</DropdownItem>
                                                    <DropdownItem><i className="ri-edit-2-line align-bottom me-2 text-muted" />Edit</DropdownItem>
                                                    <DropdownItem onClick={() => { tog_delete(); }} to="#deleteRecordModal"><i className="ri-delete-bin-5-line align-bottom me-2 text-muted" />Delete</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Col>

                                </Row>
                                </CardBody>
                            </Card>
                        {/* </div>
                    </div> */}
                    {/* <Collapse isOpen={plusiconCol1} className="accordion-collapse" id="accor_plusExamplecollapse1" > */}
                        {/* <div className="accordion-body"> */}
                        {/* <Card className="tasks-box" >
                                <CardBody>
                                    <Row>
                                    {/* <div 
                                    // className="d-flex mb-2"
                                    > 
                                        <Col lg={1} sm={1}>
                                        <span className="text-muted">{data.id}</span>
                                            {/* <p className="fs-16 mb-0 flex-grow-1 text-truncate">{data.isTaskIdHeader ? <Link to="#" className="text-muted fw-medium fs-14 flex-grow-1">{data.taskId}</Link> : <Link to="/apps-tasks-details" className="link-dark">{data.title}</Link>}</p> */}
                                        {/* </Col>
                                        <Col lg={2} sm={11}>
                                        <span className="text-muted">{data.title}</span> */}
                                            {/* <p className="fs-16 mb-0 flex-grow-1 text-truncate">{data.isTaskIdHeader ? <Link to="#" className="text-muted fw-medium fs-14 flex-grow-1">{data.taskId}</Link> : <Link to="/apps-tasks-details" className="link-dark">{data.title}</Link>}</p> */}
                                     {/*   </Col>
                                        <Col lg={8} sm={12} 
                                        // style={{marginRight:2 , marginLeft:2}}
                                        >
                                            <span className="text-muted">{data.desc}</span>
                                        </Col>
                                        <Col lg={1} sm={12} >
                                            <UncontrolledDropdown direction='start'>
                                                <DropdownToggle tag="a" id="dropdownMenuLink1" role="button">
                                                    <i className="ri-more-fill" />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem tag="a" to="/apps-tasks-details"><i className="ri-eye-fill align-bottom me-2 text-muted" />View</DropdownItem>
                                                    <DropdownItem><i className="ri-edit-2-line align-bottom me-2 text-muted" />Edit</DropdownItem>
                                                    <DropdownItem onClick={() => { tog_delete(); }} to="#deleteRecordModal"><i className="ri-delete-bin-5-line align-bottom me-2 text-muted" />Delete</DropdownItem>
                                                    <DropdownItem onClick={() => { tog_expand(); }} to="#expandTasks"><i className="ri-arrow-up-down-line align-bottom me-2 text-muted" />View Tasks</DropdownItem></DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Col>

                                </Row>
                                </CardBody>
                            </Card> */}
                        {/* </div>
                    </Collapse>
                </AccordionItem>
            </Accordion> */}
                        </div>
                </div>
            </div>

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
            
        </React.Fragment>
    );
};

export default CardTaskBox;
