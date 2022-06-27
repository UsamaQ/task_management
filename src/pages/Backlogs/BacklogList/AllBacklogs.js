import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TableContainer from '../../../Components/Common/TableContainer';
import DeleteModal from "../../../Components/Common/DeleteModal";


//redux
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal, ModalBody, Row, Input, Button, ModalHeader, FormFeedback, Form } from 'reactstrap';

import {
  getBacklogList,
  addNewBacklog,
  updateBacklog,
  deleteBacklog,
  getBacklogDetail
} from "../../../store/actions";

import {
  Id,
  Title,
  Description,
  Label,
  Actions,
} from "./BacklogListCol";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { Link } from 'react-router-dom';


const AllBacklogs = () => {
  const dispatch = useDispatch();

  const { backlogList } = useSelector((state) => ({
    backlogList: state.Backlogs.backlogList,
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


  // // Backlog Detail
  // const onClickOverview = (backlog) => {
  //   console.log(backlog.id);
  //     dispatch(getBacklogDetail(backlog));
  // };
  
  // Delete Data
  const onClickDelete = (backlog) => {
    setBacklog(backlog);
    setDeleteModal(true);
  };

  useEffect(() => {
    setBacklogList(backlogList);
    // console.log(backlogList);
  }, [backlogList]);
  
  // Delete Data
  const handleDeleteBacklog = () => {
    if (backlog.id) {
      dispatch(deleteBacklog(backlog));
      setDeleteModal(false);
      window.location.reload(true);
    }
  };
  
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (backlog && backlog.title) || '',
      description: (backlog && backlog.description) || '',
      labelID: (backlog && backlog.labelID) || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Backlog Title"),
      description: Yup.string().required("Please Enter Your Backlog Description"),
    })
  });
  
  // Update Data
  const handleEditClick = useCallback((arg) => {
    const backlog = arg;

    setBacklog({
      id: backlog.id,
      title: backlog.title,
      description: backlog.description,
      labelID: backlog.labelID,
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
          return <Title {...cellProps} />;
        },
      },
      {
          Header: "Label",
          accessor: "labelID",
          filterable: false,
          Cell: (cellProps) => {
            return <Label {...cellProps} />;
          },
        },
        // {
        //   Header: "Status",
        //   accessor: "status",
        //   filterable: false,
        //   Cell: (cellProps) => {
        //     return <Status {...cellProps} />;
        //   },
        // },
      // {
      //     Header: "Description",
      //     accessor: "description",
      //     filterable: false,
      //     Cell: (cellProps) => {
      //       return <Description {...cellProps} />;
      //     },
      //   },
        {
          Header: "Actions",
          accessor: "action",
          filterable: false,
          Cell: (cellProps) => {
            return <React.Fragment>
            <div>
                <ul className="list-inline tasks-list-menu mb-0">
                  <li className="list-inline-item">
                    <Link 
                    to={`/apps-backlogs-overview/${cellProps.row.original.id}`} 
                    // onClick={() => { const backlogData = cellProps.row.original; onClickOverview(backlogData); }}
                    >
                      <i className="ri-eye-fill align-bottom me-2 text-muted">
                      </i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" onClick={() => { const backlogData = cellProps.row.original; handleEditClick(backlogData); }}>
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
    ],
    [handleEditClick]
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
                      <input type="text" className="form-control search bg-light border-light" placeholder="Search for backlogs..." />
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
              id: backlog.id,
              title: validation.values["title"],
              description: validation.values["description"],
              labelID: validation.values["labelID"],
            };
            dispatch(updateBacklog(updatedBacklog));
            validation.resetForm();
          } else {
            const newBacklog = {
              id: validation.values["id"],
              title: validation.values["title"],
              description: validation.values["description"],
              labelID: validation.values["labelID"],
            };
            dispatch(addNewBacklog(newBacklog));
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
                  <Label for="tasksTitle-field" className="form-labelID">Title</Label>
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
                    className="form-control"
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