import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TableContainer from '../../Components/Common/TableContainer';
import DeleteModal from "../../Components/Common/DeleteModal";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import {
  getTaskList,
  addNewTask,
  updateTask,
  deleteTask,
  getTaskBoardTaskList,
  getAllLabel
} from "../../store/actions";

import { 
  Id,
  TaskTitle,
  SprintID, 
  Status, 
  Priority, 
  Size,
  DueDate,
  Labell
} from "./TaskListCol";



const TasksTable = () => {

  const dispatch = useDispatch();

  const { taskboardTaskList } = useSelector((state) => ({
    taskboardTaskList: state.Tasks.taskboardTaskList,
  }));
  
  // const { test } = useSelector((state) => ({
  //   test: state,
  // }));
  // console.log(test);
  
  // Get Data
  useEffect(() => {
    dispatch(getTaskBoardTaskList());
    dispatch(getAllLabel());

  }, []);


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



  
  
  const current = new Date();
  const date = `${current.getFullYear()}-${("0" + (current.getMonth() + 1)).slice(-2)}-${current.getDate()}`;

  const currentdate = new Date(new Date().setDate(new Date().getDate() + 7));
  const date2 = `${currentdate.getFullYear()}-${("0" + (currentdate.getMonth() + 1)).slice(-2)}-${currentdate.getDate()}`;


  const handleTodayClicked = () => {
    const filteredArray = taskboardTaskList.filter((item) => item.dueDate === date)
          setTaskToFilter(filteredArray);
          setTableName('Tasks For Today');
  }
  const handleNext7DaysClicked = () => {
    const filteredArray = taskboardTaskList.filter((item) => item.dueDate >= date && item.dueDate <= date2)
          setTaskToFilter(filteredArray);
          setTableName('Tasks For Next 7 Days');
  }

  const handleThisMonthClicked = () => {
    const filteredArray = taskboardTaskList.filter((item) => 
      item.dueDate.split('-')[1] === (("0" + (currentdate.getMonth())).slice(-2)) 
      &&
      item.dueDate.split('-')[0] === currentdate.getFullYear().toString()
      )
          setTaskToFilter(filteredArray);
          setTableName('Tasks For This Month');
  }
  
  const handleThisYearClicked = () => {
    const filteredArray = taskboardTaskList.filter((item) => 
    item.dueDate.split('-')[0] === currentdate.getFullYear().toString()
    )
        setTaskToFilter(filteredArray);
        setTableName('Tasks For This Year');
  }


  // console.log(taskTofilter);


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
        Header: "Sprint ID",
        accessor: "sprintID",
        filterable: false,
        Cell: (cellProps) => {
          return <SprintID {...cellProps} />;
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
        Header: "Label",
        // accessor: "label",
        filterable: false,
        Cell: (cellProps) => {
          return <Labell {...cellProps} />;
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
      // {
      //   Header: "Actions",
      //   accessor: "actions",
      //   filterable: false,
      //   Cell: (cellProps) => {
      //     return <React.Fragment>
      //           <ul className="list-inline tasks-list-menu mb-0">
      //             <li className="list-inline-item">
      //               <Link 
      //               // to="/apps-tasks-details"
      //               >
      //                 <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
      //               </Link>
      //             </li>
      //             <li className="list-inline-item">
      //               <Link to="#" >
      //                 <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
      //               </Link>
      //             </li>
      //             <li className="list-inline-item">
      //               <Link to="#" className="remove-item-btn" onClick={() => { const taskData = cellProps.row.original; onClickDelete(taskData); }}>
      //                 <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
      //               </Link>
      //             </li>
      //           </ul>
      //     </React.Fragment>;
      //   },
      // },
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
                <h5 className="card-title mb-0 flex-grow-1">{tableName}</h5>
                <div className="flex-shrink-0">
                  <div className="hstack text-nowrap gap-3">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className="btn btn-danger add-btn"
                        tag="button"
                      ><i className="ri-filter-2-line align-bottom me-1"></i>
                      Filters
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem className="dropdown-item" onClick={handleTodayClicked}>
                          Today
                        </DropdownItem>
                        <DropdownItem className="dropdown-item" onClick={handleNext7DaysClicked}>
                          Next 7 Days
                        </DropdownItem>
                        <DropdownItem className="dropdown-item" onClick={handleThisMonthClicked}>
                          This Month
                        </DropdownItem>
                        <DropdownItem className="dropdown-item" onClick={handleThisYearClicked}>
                          This Year
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              {taskTofilter === null
                ?
                <TableContainer
                columns={columns}
                data={taskboardTaskList}
                isGlobalFilter={false}
                isAddUserList={false}
                customPageSize={5}
                className="custom-header-css"
                divClass="table-responsive table-card mb-4"
                tableClass="align-middle table-nowrap mb-0"
                theadClass="table-light table-nowrap"
                thClass="table-light text-muted"
                />
                :
                <TableContainer
                columns={columns}
                data={taskTofilter}
                isGlobalFilter={false}
                isAddUserList={false}
                customPageSize={5}
                className="custom-header-css"
                divClass="table-responsive table-card mb-4"
                tableClass="align-middle table-nowrap mb-0"
                theadClass="table-light table-nowrap"
                thClass="table-light text-muted"
                />
              }
            </div>
          </div>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default TasksTable;