import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TableContainer from '../../../Components/Common/TableContainerNoPagination';

//redux
import { useSelector, useDispatch } from "react-redux";
import {  Modal, ModalBody, Button, ModalHeader, Form } from 'reactstrap';

import {
  getOnKeyPressBacklogList,
  getBacklogTaskList,
  updateTaskBySprintId,
} from "../../../store/actions";


import {
  Id,
  Title,
} from "./BacklogTaskListCol";
import { useParams } from 'react-router-dom';


const AddTasksToSprint = () => {
  const [checked, setChecked] = useState([])
  let { id, sprintName } = useParams();
let sprintId = id;
  const dispatch = useDispatch();


  // BACKLOG LIST

  const { backlogList } = useSelector((state) => ({
    backlogList: state.Backlogs.backlogList,
  }));


  let inputHandler = (e) => {
    let search = e.target.value;
    if (search)  { 
      dispatch(getOnKeyPressBacklogList(search));
    } else {
      console.log('');
    }
  };

  const [backlog, setBacklog] = useState("");
  
  // TASK LIST

  const [task, setTask] = useState([]);
  
  const { backlogTaskList } = useSelector((state) => ({
    backlogTaskList: state.Tasks.backlogTaskList,
    }));
    
    
    function handleListClick (backlogId, backlogName){
      dispatch(getBacklogTaskList(backlogId));
      setBacklog(backlogName);
    }

  // MODAL
  
  const [modal, setModal] = useState(false);
  const handleModalOpen = () =>{
    setModal(true);
  }

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTask(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  const handleSubmit = (values) => {
    dispatch(updateTaskBySprintId(checked, sprintId));
    // setModal(false);
  }


  const handleCheckBoxChange = (id) =>{

    if (checked.indexOf(id) === -1) {
      checked.push(id);
    } else {
      checked.splice(checked.indexOf(id),1);
    }
}
  
  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: (cellProps) => {
          return <input 
          id={cellProps.row.original.id}
          value={cellProps.row.original.title}
          type="checkbox"
          onChange={(e) => handleCheckBoxChange(cellProps.row.original.id)}
           />;
        },
      },
      {
        Header: "ID",
        accessor: "id",
        filterable: false,
        Cell: (cellProps) => {
          return (
          <Id {...cellProps} />
          )
        },
      },
      {
        Header: "Task Title",
        accessor: "title",
        filterable: false,
        Cell: (cellProps) => {
          return <Title {...cellProps} />;
        },
      },
    ]
  );


  return (
    <React.Fragment>
      <button className="btn btn-danger add-btn me-1" onClick={handleModalOpen}><i className="ri-add-line align-bottom me-1"></i> Add Task</button>

      <Modal
        isOpen={modal}
        centered
        size="lg"
        className="border-0"
        modalClassName='modal fade zoomIn'
      >
        <ModalHeader className="p-3 bg-soft-info" toggle={toggle}>Add Task</ModalHeader>


        <Form onSubmit={(e) => {
          handleSubmit();
          return false;
        }}>
          <ModalBody className="modal-body">
          
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="row g-3">
                <div className="col-xxl-5 col-sm-12">
                  <div className="search-box">
                    <input 
                    type="text" 
                    className="form-control search bg-light border-light" 
                    placeholder="Search for Backlogs..." 
                    onChange={inputHandler}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                  {/* <List input={inputText} /> */}
                  {backlogList.map((item) => (
                      <div style={{cursor: "pointer"}}  onClick={() => handleListClick(item.id, item.title)} key={item.id}>{item.title}</div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="card-body border border-dashed border-end-0 border-start-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">{backlog}</h5>
              </div>  
            </div>

            <div className="card-body">
            {
              (backlogList.length === 0) 
              ? 
              (
                'Select Backlog'
                )
                :
                (
                <TableContainer
                  columns={columns}
                  data={backlogTaskList}
                  isGlobalFilter={false}
                  isAddUserList={false}
                  customPageSize={3}
                  className="custom-header-css"
                  divClass="table-responsive table-card mb-4"
                  tableClass="align-middle table-nowrap mb-0"
                  theadClass="table-light table-nowrap"
                  thClass="table-light text-muted"
                  />
              )
              }
              </div>

          </div>
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
              <button type="submit" className="btn btn-success" id="add-btn">Add Task</button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default AddTasksToSprint;