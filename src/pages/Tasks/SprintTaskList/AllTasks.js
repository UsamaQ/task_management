import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TableContainer from '../../../Components/Common/TableContainer';
import DeleteModal from "../../../Components/Common/DeleteModal";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Col} from 'reactstrap';

import {
  getSprintTaskList,
  deleteTask
} from "../../../store/actions";

import {
  Id,
  Title,
  Status,
  Priority,
  Size,
} from "./TaskListCol";


import { isEmpty } from "lodash";
import { Link, useParams } from 'react-router-dom';


import AddTasksToSprint from './AddTasksToSprint';


const AllTasks = () => {
  let { id, sprintName } = useParams();
  const sprintID = id;
  // console.log(sprintID);

  const dispatch = useDispatch();

  const { sprintTaskList } = useSelector((state) => ({
    sprintTaskList: state.Tasks.sprintTaskList,
  }));

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

  useEffect(() => {
    setTaskList(sprintTaskList);
  }, [sprintTaskList]);

  // Delete Data
  const handleDeleteTask = () => {
    if (task.id) {
      dispatch(deleteTask(task));
      setDeleteModal(false);
    }
  };

  // Get Data
  useEffect(() => {
    dispatch(getSprintTaskList(id));
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(sprintTaskList)) setTaskList(sprintTaskList);
  }, [sprintTaskList]);

  useEffect(() => {
    if (sprintTaskList && !sprintTaskList.length) {
      dispatch(getSprintTaskList(id));
    }
  }, [dispatch, sprintTaskList]);


  useEffect(() => {
    setTaskList(sprintTaskList);
  }, [sprintTaskList]);

  useEffect(() => {
    if (!isEmpty(sprintTaskList)) {
      setTaskList(sprintTaskList);
    }
  }, [sprintTaskList]);


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
                    to={`/apps-sprint-tasks-details/${cellProps.row.original.id}`}
                    // to="/apps-backlog-tasks-details"
                    >
                      <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
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
      );

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteTask}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="row">
        <Col lg={12}>
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Tasks of {sprintName}</h5>
                <div className="flex-shrink-0">
                  <AddTasksToSprint onClick={() => { setModal(true); }}/>
                </div>
              </div>
            </div>
            <div className="card-body border border-dashed border-end-0 border-start-0">
              <form>
                <div className="row g-3">
                  <div className="col-xxl-5 col-sm-12">
                    <div className="search-box">
                      <input type="text" className="form-control search bg-light border-light" placeholder="Search for tasks ..." />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </div>

                </div>
              </form>
            </div>
            <div className="card-body">
              <TableContainer
                columns={columns}
                data={sprintTaskList}
                isGlobalFilter={false}
                isAddUserList={false}
                customPageSize={5}
                className="custom-header-css"
                divClass="table-responsive table-card mb-4"
                tableClass="align-middle table-nowrap mb-0"
                theadClass="table-light table-nowrap"
                thClass="table-light text-muted"
              />
            </div>
          </div>
        </Col>
      </div>


      
    </React.Fragment>
  );
};

export default AllTasks;