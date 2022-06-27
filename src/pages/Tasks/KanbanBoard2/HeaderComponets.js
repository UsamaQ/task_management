import React, { useState } from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody, Row, Col, Modal, Button } from "reactstrap";

const RenderCardTitle = props => {

  // const { data } = props;

  const [modal_delete, setmodal_delete] = useState(false);
  function tog_delete() {
      setmodal_delete(!modal_delete);
  }

  return (
    <React.Fragment>
      <div className="tasks-board mt-2" 
      // id={`kanbanboard${props.id}`}
      >
        <div className="tasks-list">
          <div id="unassigned-task" className="tasks">

          <Card className="tasks-box" >
              <CardBody>
                  <Row>
                      <Col lg={1} sm={1}>
                      <span className="text-muted">{props.id}</span>
                          {/* <p className="fs-16 mb-0 flex-grow-1 text-truncate">{data.isTaskIdHeader ? <Link to="#" className="text-muted fw-medium fs-14 flex-grow-1">{data.taskId}</Link> : <Link to="/apps-tasks-details" className="link-dark">{data.title}</Link>}</p> */}
                      </Col>
                      <Col lg={2} sm={11}>
                      <span className="text-muted">{props.name}</span>
                          {/* <p className="fs-16 mb-0 flex-grow-1 text-truncate">{data.isTaskIdHeader ? <Link to="#" className="text-muted fw-medium fs-14 flex-grow-1">{data.taskId}</Link> : <Link to="/apps-tasks-details" className="link-dark">{data.title}</Link>}</p> */}
                      </Col>
                      <Col lg={1} sm={1}>
                      <span className="text-muted">{props.badge}</span>
                          {/* <p className="fs-16 mb-0 flex-grow-1 text-truncate">{data.isTaskIdHeader ? <Link to="#" className="text-muted fw-medium fs-14 flex-grow-1">{data.taskId}</Link> : <Link to="/apps-tasks-details" className="link-dark">{data.title}</Link>}</p> */}
                      </Col>
                      <Col lg={7} sm={12} 
                      // style={{marginRight:2 , marginLeft:2}}
                      >
                          <span className="text-muted">{props.badgeClass}</span>
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
          </div>
          </div>
          </div>


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



      {/* <div className="d-flex mb-3 me-4">
        <div className="flex-grow-1">
          <h6 className="fs-14 text-uppercase fw-bold mb-0"> {props.name} <small className={"badge align-right ms-1 bg-" + props.badgeClass}>{props.badge}</small></h6>
        </div>
        <div className="flex-shrink-0">
          <UncontrolledDropdown className="card-header-dropdown" direction='start'>
            <DropdownToggle tag="a" role="button">
              <span className="fw-medium text-muted fs-14">Priority<i className="mdi mdi-chevron-down ms-1" /></span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>Priority</DropdownItem>
              <DropdownItem>Date Added</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div> */}
    </React.Fragment>
  );
};

export default RenderCardTitle;
