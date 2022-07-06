import React, { useState, useEffect, useMemo, useCallback } from 'react';

//redux
import { useSelector, useDispatch } from "react-redux";
import { Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DeleteModal from '../../../Components/Common/DeleteModal';
import TableContainer from '../../../Components/Common/TableContainerNoPagination';

import {
  deleteTask,
  getSprintTaskList
} from "../../../store/actions";

import { 
  Id,
  TaskTitle,
  SprintID, 
  Status, 
  Priority, 
  Size,
  DueDate
} from "../../TasksBoard/TaskListCol";



const TasksTable = (id) => {

  const dispatch = useDispatch();

  const { sprintTaskList } = useSelector((state) => ({
    sprintTaskList: state.Tasks.sprintTaskList,
  }));
  
  useEffect(() => {
    dispatch(getSprintTaskList(id.id));
  }, [dispatch]);

  const [task, setTask] = useState([]);
  const [taskTofilter, setTaskToFilter] = useState(null);
  const [tableName, setTableName] = useState('All Tasks');

  // Delete Task
  const [deleteModal, setDeleteModal] = useState(false);
  
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
 

  const columns = useMemo(
    () => [
      {
        Header: "Task ID",
        accessor: "id",
        filterable: false,
        Cell: (cellProps) => {
          return <Id {...cellProps} />;
        },
      },
      {
        Header: "Task Title",
        accessor: "title",
        filterable: false,
        Cell: (cellProps) => {
          return <TaskTitle {...cellProps} />;
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
      {
        Header: "Date",
        accessor: "dueDate",
        filterable: false,
        Cell: (cellProps) => {
          return <DueDate {...cellProps} />;
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
            <div className="card-body">
                <TableContainer
                columns={columns}
                data={sprintTaskList}
                isGlobalFilter={false}
                isAddUserList={false}
                // customPageSize={100000}
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

export default TasksTable;