import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TableContainer from '../../../Components/Common/TableContainer';
import DeleteModal from "../../../Components/Common/DeleteModal";

//Import Flatepicker
import Flatpickr from "react-flatpickr";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal, ModalBody, Row, Label, Input, Button, ModalHeader, FormFeedback, Form, } from 'reactstrap';

import {
  getSprintList,
  addNewSprint,
  updateSprint,
  deleteSprint
} from "../../../store/actions";

import {
  Id,
  Title,
  StartDate,
  DueDate,
  Status,
  Priority
} from "./SprintListCol";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { Link } from 'react-router-dom';
import TasksTable from './TasksTable';



const AllSprints = () => {
  const dispatch = useDispatch();

  const { sprintList } = useSelector((state) => ({
    sprintList: state.Sprints.sprintList,
  }));
  
  const [isEdit, setIsEdit] = useState(false);
  const [sprint, setSprint] = useState([]);
  const [SprintList, setSprintList] = useState([]);

  // Delete Sprint
  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setSprint(null);
    } else {
      setModal(true);
      // setStartDate();
      setDueDate();
    }
  }, [modal]);

  // Delete Data
  const onClickDelete = (sprint) => {
    setSprint(sprint);
    setDeleteModal(true);
  };

  // Delete Data
  const handleDeleteSprint = () => {
    if (sprint.id) {
      dispatch(deleteSprint(sprint));
      setDeleteModal(false);
      window.location.reload(true);
    }
  };
  
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (sprint && sprint.title) || '',
      description: (sprint && sprint.description) || '',
      startDate: (sprint && sprint.startDate) || '',
      dueDate: (sprint && sprint.dueDate) || '',
      status: (sprint && sprint.status) || 'Inactive',
      priority: (sprint && sprint.priority) || 'Medium',
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Sprint Title"),
      description: Yup.string().required("Please Enter Your Sprint Description"),
      startDate: Yup.string().required("Please Enter Start Date"),
      dueDate: Yup.string().required("Please Enter End Date"),
      status: Yup.string().required("Please Enter Status"),
      priority: Yup.string().required("Please Enter Priority"),
    }),
    handleSubmit: (values) => {
      if (isEdit) {
        const updatedSprint = {
          id: values["id"],
          title: values["title"],
          description: values["description"],
          startDate: values["startDate"],
          dueDate: values["dueDate"],
          status: values["status"],
          priority: values["priority"],
        };
        // update customer
        dispatch(updateSprint(updatedSprint));
        validation.resetForm();
      } else {
        const newSprint = {
          id: values["id"],
          title: values["title"],
          description: values["description"],
          startDate: values["startDate"],
          dueDate: values["dueDate"],
          status: values["status"],
          priority: values["priority"],
        };
        dispatch(addNewSprint(newSprint));
        validation.resetForm();
      }
      toggle();
    },
  });



  // Update Data
  const handleEditClick = useCallback((arg) => {
    const sprint = arg;

    setSprint({
      id: sprint.id,
      title: sprint.title,
      description: sprint.description,
      startDate: sprint.startDate,
      dueDate: sprint.dueDate,
      status: sprint.status,
      priority: sprint.priority,
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);

  // Add Data
  const handleSprintClicks = () => {
    setSprint("");
    setIsEdit(false);
    toggle();
  };

  var user = sessionStorage.getItem("user");
  // Get Data
  useEffect(() => {
    dispatch(getSprintList());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        id: "expander",
        Header: "#",
        Cell: ({ row }) => {
          return <input type="checkbox" {...row.getToggleRowExpandedProps()}/>;
        },
      },
      {
        Header: "ID",
        accessor: "id",
        filterable: false,
        Cell: (cellProps) => {
          return <Id {...cellProps} />;
        },
      },
      {
        Header: "Sprint Title",
        accessor: "title",
        filterable: false,
        Cell: (cellProps) => {
          return <React.Fragment>
            <div className="d-flex">
              <Link 
              to={`/apps-sprint-tasks-list-view/${cellProps.row.original.id}/${cellProps.row.original.title}`} 
              className=" flex-grow-1 sprintss_name ">{cellProps.value}</Link>
              {/* <div className="flex-grow-1 tasks_name" id='pop2' style={{cursor: "pointer"}}>{cellProps.value}</div> */}
              <div className="flex-shrink-0 ms-4">
                <ul className="list-inline tasks-list-menu mb-0">
                  <li className="list-inline-item">
                    <Link to={`/apps-sprints-overview/${cellProps.row.original.id}`}>
                      <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" onClick={() => { const sprintData = cellProps.row.original; handleEditClick(sprintData); }}>
                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" className="remove-item-btn" onClick={() => { const sprintData = cellProps.row.original; onClickDelete(sprintData); }}>
                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <UncontrolledPopover placement="top" target="pop2" >
                <PopoverHeader> Sprint Name </PopoverHeader>
                <PopoverBody> 1. Task Title.... </PopoverBody>
            </UncontrolledPopover> */}
          </React.Fragment>;
        },
      },
      {
        Header: "Start Date",
        accessor: "startDate",
        filterable: false,
        Cell: (cellProps) => {
          return <StartDate {...cellProps} />;
        },
      },
      {
        Header: "End Date",
        accessor: "dueDate",
        filterable: false,
        Cell: (cellProps) => {
          return <DueDate {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: false,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
        },
      },
      {
        Header: "Priority",
        accessor: "priority",
        filterable: false,
        Cell: (cellProps) => {
          return <Priority {...cellProps} />;
        },
      },
    ],
    [handleEditClick]
  );

  const [startDate, setStartDate] = useState("");

  const startDateFormate = (e) => {
    let date = e.toString().split(" ");
    const joinDate = (date[3] + "-" + date[1] + "-" + date[2]).toString();
    setStartDate(joinDate);
  };

  const [dueDate, setDueDate] = useState("");

  const dueDateFormate = (e) => {
    let date = e.toString().split(" ");
    const joinDate = (date[3] + "-" + date[1] + "-" + date[2]).toString();
    setDueDate(joinDate);
  };

  const renderRowSubComponent = useCallback(
    ({ row }) => (
      <>
      <TasksTable id={row.original.id}/>
      </>
    ),
    []
  );

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteSprint}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="row">
        <Col lg={12}>
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">All Sprints</h5>
                <div className="flex-shrink-0">
                  <button className="btn btn-danger add-btn me-1" onClick={() => { setIsEdit(false); toggle(); }}><i className="ri-add-line align-bottom me-1"></i> Create Sprint</button>
                  {/* <button className="btn btn-soft-danger"
                  ><i className="ri-delete-bin-2-line"></i></button> */}
                </div>
              </div>
            </div>
            <div className="card-body">
              <TableContainer
                columns={columns}
                data={sprintList}
                isGlobalFilter={false}
                customPageSize={5}
                className="custom-header-css"
                divClass="table-responsive table-card mb-4"
                tableClass="align-middle table-nowrap mb-0"
                theadClass="table-light table-nowrap"
                thClass="table-light text-muted"
                renderRowSubComponent={renderRowSubComponent}
              />
            </div>
          </div>
        </Col>
      </div>


      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName='modal fade zoomIn'
      >
        <ModalHeader className="p-3 bg-soft-info" toggle={toggle}>
          {!!isEdit ? "Edit Sprint" : "Create Sprint"}
        </ModalHeader>


        <Form onSubmit={(e) => {     
          if (isEdit) {
            const updatedSprint = {
              id: sprint.id,
              title: validation.values["title"],
              description: validation.values["description"],
              startDate: startDate,
              dueDate: dueDate,
              status: validation.values["status"],
              priority: validation.values["priority"],
            };
            dispatch(updateSprint(updatedSprint));
            validation.resetForm();
          } else {
            const newSprint = {
              id: validation.values["id"],
              title: validation.values["title"],
              description: validation.values["description"],
              startDate: startDate,
              dueDate: dueDate,
              status: validation.values["status"],
              priority: validation.values["priority"],
              assignedBy: user
            };
            dispatch(addNewSprint(newSprint));
            validation.resetForm();
          }
          toggle();
          e.preventDefault();
          // validation.handleSubmit();
          return false;
        }}>
          <ModalBody className="modal-body">
            <Row className="g-3">
              
              <Col lg={12}>
                <div>
                  <Label for="tasksTitle-field" className="form-label">Title</Label>
                  <Input
                    name="title"
                    id="tasksTitle-field"
                    className="form-control"
                    placeholder="Title"
                    type="text"
                    required
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.title || ""}
                    invalid={
                      validation.touched.title && validation.errors.title ? true : false
                    }
                  />
                  {validation.touched.title && validation.errors.title ? (
                    <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
              <div>
                  <Label for="tasksDescription-field" className="form-labelDescription">Description</Label>
                  <Input
                    name="description"
                    id="tasksDescription-field"
                    className="form-control mb-2"
                    placeholder="Description"
                    type="textarea"
                    rows="6" 
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
                    invalid={
                      validation.touched.description && validation.errors.description ? true : false
                    }
                  />
                  {validation.touched.description && validation.errors.description ? (
                    <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Row>
              <Col lg={6}>
                <Label for="sprintDate-field-start" className="form-label">Start Date</Label>
                <Flatpickr
                  name="startDate"
                  placeholder="Sprint start date."
                  id="sprintDate-field-start"
                  className="form-control bg-light border-light mb-3"
                  validate={{
                    required: { value: true },
                  }}
                  options={{
                    altInput: true,
                    altFormat: "Y-m-d",
                    dateFormat: "Y-m-d",
                  }}
                  onChange={(e) =>
                    startDateFormate(e)
                  }
                  value={validation.values.startDate || ""}
                />
                {validation.touched.startDate && validation.errors.startDate ? (
                  <FormFeedback type="invalid">{validation.errors.startDate}</FormFeedback>
                ) : null}
              </Col>
              <Col lg={6}>
                <Label for="sprintDate-field-end" className="form-label">End Date</Label>
                <Flatpickr
                name='dueDate'
                  placeholder="Sprint end date."
                  id="sprintDate-field-end"
                  className="form-control bg-light border-light mb-3"
                  validate={{
                    required: { value: true },
                  }}
                  options={{
                    altInput: true,
                    altFormat: "Y-m-d",
                    dateFormat: "Y-m-d",
                  }}
                  onChange={(e) =>
                    dueDateFormate(e)
                  }
                  value={validation.values.dueDate || ""}
                />
                {validation.touched.dueDate && validation.errors.dueDate ? (
                  <FormFeedback type="invalid">{validation.errors.dueDate}</FormFeedback>
                ) : null}
              </Col>
              <Col lg={6}>
                <Label for="ticket-status" className="form-label">Status</Label>
                <Input
                  name="status"
                  type="select"
                  className="form-select"
                  id="ticket-field"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={
                    validation.values.status || ""
                  }
                >
                  <option value="">Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </Input>
                {validation.touched.status &&
                  validation.errors.status ? (
                    <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col lg={6}>
                <Label for="priority-field" className="form-label">Priority</Label>
                <Input
                  name="priority"
                  type="select"
                  className="form-select"
                  id="priority-field"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={
                    validation.values.priority || ""
                  }
                  >
                  <option value="">Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Input>
                {validation.touched.priority &&
                  validation.errors.priority ? (
                    <FormFeedback type="invalid">
                    {validation.errors.priority}
                  </FormFeedback>
                ) : null}
              </Col>

                </Row>
            </Row>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <Button
                type="button"
                onClick={() => {
                  setModal(false);
                }}
                className="btn-light"
              >Close</Button>
              <button type="submit" className="btn btn-success" id="add-btn">{!!isEdit ? "Update Sprint" : "Add Sprint"}</button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};


export default AllSprints;