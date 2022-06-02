import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TableContainer from '../../../Components/Common/TableContainer';
import DeleteModal from "../../../Components/Common/DeleteModal";


// Import Scroll Bar - SimpleBar
import SimpleBar from 'simplebar-react';

//Import Flatepicker
import Flatpickr from "react-flatpickr";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal, ModalBody, Row, Label, Input, Button, ModalHeader, FormFeedback, Form } from 'reactstrap';

import {
  getBacklogList,
  addNewBacklog,
  updateBacklog,
  deleteBacklog
} from "../../../store/actions";

import {
  backlogId,
  backlogTitle,
  DueDate,
  Status,
  Priority
} from "./BacklogListCol";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { Link } from 'react-router-dom';


//Import CK Editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";



const AllBacklogs = () => {
  const dispatch = useDispatch();

  const { backlogList } = useSelector((state) => ({
    backlogList: state.tasks.backlogList,
  }));

  const [isEdit, setIsEdit] = useState(false);
  const [backlog, setBacklog] = useState([]);
  const [BacklogList, setBacklogList] = useState([]);

  // Delete Backlog
  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setBacklog(null);
    } else {
      setModal(true);
      setDate(dateFormat());
    }
  }, [modal]);

  // Delete Data
  const onClickDelete = (backlog) => {
    setBacklog(backlog);
    setDeleteModal(true);
  };

  useEffect(() => {
    setBacklogList(backlogList);
  }, [backlogList]);

  // Delete Data
  const handleDeleteBacklog = () => {
    if (backlog.id) {
      dispatch(deleteBacklog(backlog));
      setDeleteModal(false);
    }
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      backlogId: (backlog && backlog.backlogId) || '',
      project: (backlog && backlog.project) || '',
      backlogTitle: (backlog && backlog.backlogTitle) || '',
      description: (backlog && backlog.description) || '',
      creater: (backlog && backlog.creater) || '',
      dueDate: (backlog && backlog.dueDate) || '',
      status: (backlog && backlog.status) || 'New',
      priority: (backlog && backlog.priority) || 'High',
      subItem: (backlog && backlog.subItem) || [],
    },
    validationSchema: Yup.object({
      backlogId: Yup.string().required("Please Enter Backlog Id"),
      project: Yup.string().required("Please Enter Project Name"),
      backlogTitle: Yup.string().required("Please Enter Your Backlog Title"),
      description: Yup.string().required("Please Enter Your Backlog Description"),
      creater: Yup.string().required("Please Enter Creater Name"),
      // dueDate: Yup.string().required("Please Enter Due Date"),
      status: Yup.string().required("Please Enter Status"),
      priority: Yup.string().required("Please Enter Priority"),
      subItem: Yup.array().required("Please Enter")
    }),
    handleSubmit: (values) => {
      if (isEdit) {
        const updatedBacklog = {
          id: backlog ? backlog.id : 0,
          backlogId: values.backlogId,
          project: values.project,
          backlogTitle: values.backlogTitle,
          description: values.description,
          creater: values.creater,
          dueDate: date,
          status: values.status,
          priority: values.priority,
          subItem: values.subItem,
        };
        // update customer
        dispatch(updateBacklog(updatedBacklog));
        validation.resetForm();
      } else {
        const newBacklog = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          backlogId: values["backlogId"],
          project: values["project"],
          backlogTitle: values["backlogTitle"],
          description: values["description"],
          creater: values["creater"],
          dueDate: date,
          status: values["status"],
          priority: values["priority"],
          subItem: values["subItem"],
        };
        console.log("hi");
        // save new customer
        dispatch(addNewBacklog(newBacklog));
        validation.resetForm();
      }
      toggle();

      // console.log(values.backlogId);
      // console.log(values.backlogTitle);
      // console.log(values.description);
      // console.log(values.status);
      // console.log(values.priority);
    },
  });
  
  const handleCkEditorChange = (event,editor) => {
    const data= editor.getData();
    // console.log(data);
  }
  // Update Data
  const handleCustomerClick = useCallback((arg) => {
    const backlog = arg;

    setBacklog({
      id: backlog.id,
      backlogId: backlog.backlogId,
      project: backlog.project,
      backlogTitle: backlog.backlogTitle,
      description: backlog.description,
      creater: backlog.creater,
      dueDate: backlog.dueDate,
      status: backlog.status,
      priority: backlog.priority,
      subItem: backlog.subItem,
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);

  // Add Data
  const handleBacklogClicks = () => {
    setBacklog("");
    setIsEdit(false);
    toggle();
  };


  // Get Data
  useEffect(() => {
    dispatch(getBacklogList());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(backlogList)) setBacklogList(backlogList);
  }, [backlogList]);

  useEffect(() => {
    if (backlogList && !backlogList.length) {
      dispatch(getBacklogList());
    }
  }, [dispatch, backlogList]);


  useEffect(() => {
    setBacklogList(backlogList);
  }, [backlogList]);

  useEffect(() => {
    if (!isEmpty(backlogList)) {
      setBacklogList(backlogList);
      setIsEdit(false);
    }
  }, [backlogList]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" />;
        },
      },
      {
        Header: "Backlog ID",
        accessor: "backlogId",
        filterable: false,
        Cell: (cellProps) => {
          return <OrdersId {...cellProps} />;
        },
      },
      {
        Header: "Backlog Title",
        accessor: "backlogTitle",
        filterable: false,
        Cell: (cellProps) => {
          return <React.Fragment>
            <div className="d-flex">
              <div className="flex-grow-1 tasks_name">{cellProps.value}</div>
              <div className="flex-shrink-0 ms-4">
                <ul className="list-inline tasks-list-menu mb-0">
                  <li className="list-inline-item">
                    <Link to="/apps-tasks-details">
                      <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" onClick={() => { const backlogData = cellProps.row.original; handleCustomerClick(backlogData); }}>
                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" className="remove-item-btn" onClick={() => { const backlogData = cellProps.row.original; onClickDelete(backlogData); }}>
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
    ],
    [handleCustomerClick]
  );

  const dateFormat = () => {
    let d = new Date(),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return ((d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear()).toString());
  };

  const [date, setDate] = useState(dateFormat());

  const dateformate = (e) => {
    const date = e.toString().split(" ");
    const joinDate = (date[2] + " " + date[1] + ", " + date[3]).toString();
    setDate(joinDate);
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteBacklog}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="row">
        <Col lg={12}>
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">All Backlogs</h5>
                <div className="flex-shrink-0">
                  <button className="btn btn-danger add-btn me-1" onClick={() => { setIsEdit(false); toggle(); }}><i className="ri-add-line align-bottom me-1"></i> Create Backlog</button>
                  <button className="btn btn-soft-danger"
                  ><i className="ri-delete-bin-2-line"></i></button>
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
                data={backlogList}
                isGlobalFilter={false}
                isAddUserList={false}
                customPageSize={5}
                className="custom-header-css"
                divClass="table-responsive table-card mb-4"
                tableClass="align-middle table-nowrap mb-0"
                theadClass="table-light table-nowrap"
                thClass="table-light text-muted"
                handleBacklogClick={handleBacklogClicks}
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
          {!!isEdit ? "Edit Backlog" : "Create Backlog"}
        </ModalHeader>


        <Form onSubmit={(e) => {     
          if (isEdit) {
            const updatedBacklog = {
              backlogId: validation.values.backlogId,
              backlogTitle: validation.values["backlogTitle"],
              description: validation.values.description,
              status: validation.values.status,
              priority: validation.values.priority,
            };
            dispatch(updateBacklog(updatedBacklog));
            validation.resetForm();
          } else {
            const newBacklog = {
              backlogId: validation.values["backlogId"],
              backlogTitle: validation.values["backlogTitle"],
              description: validation.values["description"],
              status: validation.values["status"],
              priority: validation.values["priority"],
            };
            dispatch(addNewBacklog(newBacklog));
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
                    name="backlogTitle"
                    id="tasksTitle-field"
                    className="form-control"
                    placeholder="Title"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.backlogTitle || ""}
                    invalid={
                      validation.touched.backlogTitle && validation.errors.backlogTitle ? true : false
                    }
                  />
                  {validation.touched.backlogTitle && validation.errors.backlogTitle ? (
                    <FormFeedback type="invalid">{validation.errors.backlogTitle}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
              <div className="mb-3">
                  <Label className="form-label">Backlog Description</Label>
                  <CKEditor
                      name="description"
                      id="description-field"
                      editor={ClassicEditor}
                      config={{placeholder: "Description"}}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      
                    }}
                    onChange={handleCkEditorChange
                    //   ( event, editor ) => {
                    //   const data = editor.getData();
                    //   console.log( { event, editor, data } );
                    // } 
                  }
                    />
              </div>
              </Col>

              {/* <Col lg={6}>
                <Label for="duedate-field" className="form-label">Due Date</Label>

                <Flatpickr
                  name="dueDate"
                  id="duedate-field"
                  className="form-control"
                  placeholder="Select a date"
                  options={{
                    altInput: true,
                    altFormat: "d M, Y",
                    dateFormat: "d M, Y",
                  }}
                  onChange={(e) =>
                    dateformate(e)
                  }
                  value={validation.values.dueDate || ""}
                />
                {validation.touched.dueDate && validation.errors.dueDate ? (
                  <FormFeedback type="invalid">{validation.errors.dueDate}</FormFeedback>
                ) : null}
              </Col> */}
              <Col lg={12}>
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
                  <option value="New">New</option>
                  <option value="Inprogress">Inprogress</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </Input>
                {validation.touched.status &&
                  validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col lg={12}>
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
              <button type="submit" className="btn btn-success" id="add-btn">{!!isEdit ? "Update Backlog" : "Add Backlog"}</button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default AllBacklogs;