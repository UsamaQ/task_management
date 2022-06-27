import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TableContainer from '../../../Components/Common/TableContainer';
import DeleteModal from "../../../Components/Common/DeleteModal";


// Import Scroll Bar - SimpleBar
import SimpleBar from 'simplebar-react';

//Import Flatepicker
import Flatpickr from "react-flatpickr";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal, ModalBody, Row, Label, Input, Button, ModalHeader, FormFeedback, Form, Card, CardHeader, CardBody } from 'reactstrap';

import {
  getBacklogTaskList,
  addNewTask,
  updateTask,
  deleteTask
} from "../../../store/actions";

import {
  Id,
  title,
  DueDate,
  Status,
  Priority,
  Size,
} from "./TaskListCol";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { Link, useParams } from 'react-router-dom';


import Dropzone from 'react-dropzone';

import ImageSlides from 'react-imageslides';
import 'react-imageslides/lib/index.css';



const AllTasks = () => {

  let { id, backlogName } = useParams();
  const backlogID = id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBacklogTaskList(id));
  }, [dispatch]);

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const { backlogTaskList } = useSelector((state) => ({
    backlogTaskList: state.Tasks.backlogTaskList,
  }));
  
  useEffect(() => {
    setTaskList(backlogTaskList);
  }, [backlogTaskList]);

  useEffect(() => {
    dispatch(getBacklogTaskList(id));
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(backlogTaskList)) setTaskList(backlogTaskList);
  }, [backlogTaskList]);

  useEffect(() => {
    if (backlogTaskList && !backlogTaskList.length) {
      dispatch(getBacklogTaskList(id));
    }
  }, [dispatch, backlogTaskList]);


  useEffect(() => {
    setTaskList(backlogTaskList);
  }, [backlogTaskList]);

  useEffect(() => {
    if (!isEmpty(backlogTaskList)) {
      setTaskList(backlogTaskList);
      setIsEdit(false);
    }
  }, [backlogTaskList]);


  console.log(backlogTaskList);



  const [isEdit, setIsEdit] = useState(false);
  const [task, setTask] = useState([]);
  const [TaskList, setTaskList] = useState([]);

  // Delete Task
  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTask(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  // Delete Data
  const onClickDelete = (task) => {
    setTask(task);
    setDeleteModal(true);
  };


  // Delete Data
  const handleDeleteTask = () => {
    if (task.id) {
      dispatch(deleteTask(task));
      setDeleteModal(false);
    }
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (task && task.id) || '',
      title: (task && task.title) || '',
      description: (task && task.description) || '',
      status: (task && task.status) || 'New',
      priority: (task && task.priority) || 'High',
      size: (task && task.size) || 'Medium',
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Please Enter Task Id"),
      title: Yup.string().required("Please Enter Your Task Title"),
      description: Yup.string().required("Please Enter Your Task Description"),
      status: Yup.string().required("Please Enter Status"),
      priority: Yup.string().required("Please Enter Priority"),
      size: Yup.string().required("Please Enter Size"),
    }),
    handleSubmit: (values) => {
      if (isEdit) {
        const updatedTask = {
          id: values.id,
          title: values.title,
          description: values.description,
          backlogID: backlogID,
          status: values.status,
          priority: values.priority,
          size: values.size,
        };
        // update customer
        dispatch(updateTask(updatedTask));
        validation.resetForm();
      } else {
        const newTask = {
          id: values["id"],
          title: values["title"],
          description: values["description"],
          backlogID: backlogID,
          status: values["status"],
          priority: values["priority"],
          size: values["size"],
        };
        // save new TASK
        dispatch(addNewTask(newTask));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Update Data
  const handleCustomerClick = useCallback((arg) => {
    const task = arg;

    setTask({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      size: task.size,
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);

  // Add Data
  const handleTaskClicks = () => {
    setTask("");
    setIsEdit(false);
    toggle();
  };



  // Dropzone file upload
  const [selectedFiles, setselectedFiles] = useState([]);
  const [files, setFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
      );
    setselectedFiles(files);
  }
     
     // Formats the size
  
      function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = useCallback(newIndex => {
    setActiveIndex(newIndex);
  }, []);

  const[preview , setPreview ]=useState('');
  function handlePreview (imgURL) {
    let url = imgURL.split("blob:");
    setPreview(url[1]);
    console.log(url[1]);
  }
  // console.log(imgView);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" />;
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
        Header: "Title",
        accessor: "title",
        filterable: false,
        Cell: (cellProps) => {
          return <React.Fragment>
            <div className="d-flex">
              <div className="flex-grow-1 tasks_name">{cellProps.value}</div>
              <div className="flex-shrink-0 ms-4">
                <ul className="list-inline tasks-list-menu mb-0">
                  <li className="list-inline-item">
                    <Link 
                    to={`/apps-backlog-tasks-details/${cellProps.row.original.id}`}
                    >
                      <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" onClick={() => { const taskData = cellProps.row.original; handleCustomerClick(taskData); }}>
                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" className="remove-item-btn" onClick={() => { const taskData = cellProps.row.original; onClickDelete(taskData); }}>
                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>;
        },
      },
      // {
      //   Header: "Due Date",
      //   accessor: "dueDate",
      //   filterable: false,
      //   Cell: (cellProps) => {
      //     return <DueDate {...cellProps} />;
      //   },
      // },
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
      {
        Header: "Size",
        accessor: "size",
        filterable: false,
        Cell: (cellProps) => {
          return <Size {...cellProps} />;
        },
      },
    ],
    [handleCustomerClick]
  );

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteTask}
        onCloseClick={() => setDeleteModal(false)}
      />
      {(backlogTaskList.length > 0 ) ? <h2>Data</h2> : <h2>No Data .......................</h2>}
      <div className="row">
        <Col lg={12}>
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Tasks of {backlogName}</h5>
                <div className="flex-shrink-0">
                  <button className="btn btn-danger add-btn me-1" onClick={() => { setIsEdit(false); toggle(); }}><i className="ri-add-line align-bottom me-1"></i> Create Task</button>
                  {/* <button className="btn btn-soft-danger"
                  ><i className="ri-delete-bin-2-line"></i></button> */}
                </div>
              </div>
            </div>
            <div className="card-body border border-dashed border-end-0 border-start-0">
              <form>
                <div className="row g-3">
                  <div className="col-xxl-5 col-sm-12">
                    <div className="search-box">
                      <input type="text" className="form-control search bg-light border-light" placeholder="Search for tasks or something..." />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </div>

                </div>
              </form>
            </div>
            <div className="card-body">
              <TableContainer
                columns={columns}
                data={backlogTaskList}
                isGlobalFilter={false}
                isAddUserList={false}
                customPageSize={5}
                className="custom-header-css"
                divClass="table-responsive table-card mb-4"
                tableClass="align-middle table-nowrap mb-0"
                theadClass="table-light table-nowrap"
                thClass="table-light text-muted"
                handleTaskClick={handleTaskClicks}
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
          {!!isEdit ? "Edit Task" : "Create Task"}
        </ModalHeader>


        <Form onSubmit={(e) => {     
          if (isEdit) {
            const updatedTask = {
              id: validation.values.id,
              title: validation.values["title"],
              description: validation.values.description,
              status: validation.values.status,
              priority: validation.values.priority,
              size: validation.values.size,
              backlogID: backlogID,
              attachment: selectedFiles,
            };
            dispatch(updateTask(updatedTask));
            console.log(updatedTask);
            validation.resetForm();
          } else {
            const newTask = {
              id: validation.values["id"],
              title: validation.values["title"],
              description: validation.values["description"],
              status: validation.values["status"],
              priority: validation.values["priority"],
              size: validation.values["size"],
              backlogID: backlogID,
              attachment: selectedFiles,

            };
            dispatch(addNewTask(newTask));
            console.log(newTask);
            validation.resetForm();
          }
          toggle();
          e.preventDefault();
          validation.handleSubmit();
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
                    className="form-control mb-3"
                    placeholder="Description"
                    type="textarea"
                    rows="8" 
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
              <Col lg={4}>
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
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
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
              <Col lg={4}>
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
              <Col lg={4}>
                <Label for="size-field" className="form-label">Size</Label>
                <Input
                  name="size"
                  type="select"
                  className="form-select"
                  id="size-field"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={
                    validation.values.size || ""
                  }
                >
                  <option value="">Size</option>
                  <option value="Extra Small">Extra Small</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Extra Large">Extra Large</option>
                </Input>
                {validation.touched.size &&
                  validation.errors.size ? (
                    <FormFeedback type="invalid">
                    {validation.errors.size}
                  </FormFeedback>
                ) : null}
              </Col>
                </Row>
            </Row>
            <Card style={{marginTop: 30}}>
              <CardHeader >
                  <h5 className="card-title mb-0">Attached files</h5>
              </CardHeader>
              <CardBody>
                  <div>
                      <p className="text-muted">Add Attached files here.</p>

                      <Dropzone
                          onDrop={acceptedFiles => {
                          handleAcceptedFiles(acceptedFiles);
                          }}
                      >
                          {({ getRootProps, getInputProps }) => (
                          <div className="dropzone dz-clickable">
                              <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                              >
                              <div className="mb-3">
                                  <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                              </div>
                              <h5>Drop files here or click to upload.</h5>
                              </div>
                          </div>
                          )}
                      </Dropzone>

                      <ul className="list-unstyled mb-0" id="dropzone-preview">
                      
                      {selectedFiles.map((f, i) => {
                          return (
                              <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                              >
                              <div className="p-2">
                                  <Row className="align-items-center">
                                  <Col className="col-auto">
                                      <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                      />
                                  </Col>
                                  <Col>
                                      <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                      >
                                      {f.name}
                                      </Link>
                                      <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                      </p>
                                  </Col>
                                  </Row>
                              </div>
                              </Card>
                          );
                      })}
                      </ul>

                  </div>
              </CardBody>
          </Card>
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
              <button type="submit" className="btn btn-success" id="add-btn">{!!isEdit ? "Update Task" : "Add Task"}</button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default AllTasks;