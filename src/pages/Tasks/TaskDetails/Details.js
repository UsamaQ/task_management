import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Progress, Row, ListGroup, ListGroupItem } from 'reactstrap';
import { 
    addNewSubTask,
    getSubTaskList, 
    getTaskDetail
} from '../../../store/actions';

const Details = () => {

    let {id} = useParams();
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(getTaskDetail(id));
        dispatch(getSubTaskList(id));
    }, [dispatch]);
    
    
    const { taskDetail } = useSelector((state) => ({
        taskDetail: state.Tasks.taskDetail[0],
    }));
    
    const { subTaskList } = useSelector((state) => ({
        subTaskList: state.SubTasks.subTaskList,
    }));

    // if (subTaskList) {
        
    //     let abc = subTaskList;
    //     return(abc);
    // }

    // const [checkedState, setCheckedState] = useState(subTaskList ? 
    //     subTaskList :
    //     new Array(5).fill(() => {'abc'} )
    //     // [...subTaskList, `Entry ${subTaskList.length}`]
    //     );
        
    //     console.log(checkedState);
      
    //   setCheckedState(subTaskList => [...subTaskList, `${subTaskList.length}`]);
    
    // for (let i = 0; i < subTaskList.length; i++) {
    //     if (subTaskList[i].isChecked === '1') {
    //         setCheckedState(true)
    //         console.log('usama');
    //         // console.log(checkedState+'if');
    //     }
    // }
    // console.log(checkedState);
    

      const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((subTask, index) =>{
            return(
                subTask.isChecked === '1' ? { ...subTask, isChecked: '0' } : { ...subTask },

                subTask.isChecked === '0' ? { ...subTask, isChecked: '1' } : { ...subTask }

            )
        }
        //   index === position ? !item : item 

        );
        // console.log(updatedCheckedState);
        setCheckedState(updatedCheckedState);
      };


    // console.log(subTaskList);

    const [checkedState, setCheckedState] = useState(
        new Array(subTaskList.length).fill( false )
      );

    //   const handleOnChange = (position) => {
    //     console.log(position);
    //     // database
    //   }

    // const [checkBoxValue, setCheckBoxValue]= useState("");
    // const handleCheckBoxChange = (e) => {

    //     // let abc = e.target.checked;
    //     console.log(e.target.checked);
    //     // console.log();
    //     // e.target.checked = false;
    //     if (checkBoxValue === true) {
    //         setCheckBoxValue(false);
    //     } else {
    //         setCheckBoxValue(true);
    //     }
    // }


    const [subTasks, setSubtasks]= useState("");
    const handleChange = (e) => {
        setSubtasks(e.target.value)
    }
	const handleSubmit = (e) => {
        const newSubtask ={
            taskID: id,
            data: subTasks,
            isChecked: 0,
        }
        e.preventDefault();
        dispatch(addNewSubTask(newSubtask));
        setSubtasks("")
	}
    
    return (
        <React.Fragment>
            {(taskDetail) ? 
            <Card>
                <CardHeader xxl={9}>
                    <h5 className="mb-3 fw-bold text-uppercase"> {taskDetail.id}. {taskDetail.title}</h5>
                </CardHeader>
                <CardBody>
                    <div className="text-muted">
                            <p className="mb-2 text-uppercase fw-medium fs-14">Description :</p>
                            <p>{taskDetail.description}</p>
                        <div className="pt-3 border-top border-top-dashed mt-4">
                            <Row>
                                <Col lg={6} sm={3}>
                                    <div>
                                        <p className="mb-2 text-uppercase fw-medium fs-14">Status :</p>
                                        {taskDetail.status === "To Do" ?
                                        <span className="badge badge-soft-secondary text-uppercase">{taskDetail.status}</span>
                                        : taskDetail.status === "In Progress" ?
                                            <span className="badge badge-soft-info text-uppercase">{taskDetail.status}</span>
                                            : taskDetail.status === "Completed" ?
                                                <span className="badge badge-soft-success text-uppercase">{taskDetail.status}</span>
                                                : taskDetail.status === "Pending" ?
                                                    <span className="badge badge-soft-warning text-uppercase">{taskDetail.status}</span>
                                                    : taskDetail.status === "Cancelled" ?
                                                    <span className="badge badge-soft-danger text-uppercase">{taskDetail.status}</span>
                                                    : null}
                                    </div>
                                </Col>
                                <Col lg={6} sm={3}>
                                    <div>
                                        <p className="mb-2 text-uppercase fw-medium fs-14">Priority :</p>
                                        {taskDetail.priority === "Medium" ? 
                                        <span className="badge badge-soft-warning text-uppercase">{taskDetail.priority}</span>
                                        : taskDetail.priority === "High" ?
                                            <span className="badge badge-soft-danger text-uppercase">{taskDetail.priority}</span>
                                            : taskDetail.priority === "Low" ?
                                                <span className="badge badge-soft-success text-uppercase">{taskDetail.priority}</span>
                                                : null}
                                    </div>
                                </Col>
                        </Row>
                        </div>
                        <div className="pt-3 border-top border-top-dashed mt-4">
                            <Row>
                                <Col lg={4}>
                                    <p className="mb-2 text-uppercase fw-medium fs-14">Progress :</p>
                                    <Progress color='info' value={75} />
                                </Col>
                                <Col className="ms-5" lg={7}>
                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup>
                                        <Row>
                                            <Col lg={2}>
                                                <p className="mb-2 text-uppercase fw-medium fs-14">Subtasks :</p>
                                            </Col>
                                            <Col lg={6}>
                                                <Input 
                                                type="text" 
                                                name="subTasks" 
                                                placeholder="Add Subtasks"
                                                id="subTasks" 
                                                value={subTasks}
                                                onChange={handleChange} 
                                                required 
                                                />
                                            </Col>
                                            <Col lg={3}>
                                                <button className="btn btn-soft-info" type='submit'
                                                ><i className="ri-delete-bin-2-line me-1"></i>Add Subtasks</button>
                                            </Col>
                                        </Row>
                                        </FormGroup>
                                    </Form>
                                    <Row>
                                        <Col lg={2}></Col>
                                        <Col lg={6}>
                                            <ListGroup className="mb-1">
                                                {subTaskList.map((subTask, index) => {
                                                    return (
                                                        <ListGroupItem key={index}>
                                                            <div className="d-flex align-items-center">
                                                                <div className="flex-grow-1">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0 ms-2">
                                                                            <Input 
                                                                            className="form-check-input me-1" 
                                                                            type="checkbox" 
                                                                            value={subTask.data} 
                                                                            onChange={() => handleOnChange(index)}
                                                                            // checked={checkedState[index]}
                                                                            checked={(subTask.isChecked === '1') ? true : false} 
                                                                            // {(subTask.isChecked) ? checked : ''}
                                                                             />
                                                                            {subTask.data}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-shrink-0">
                                                                    <i type='button' className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                </div>
                                                            </div>
                                                        </ListGroupItem>
                                                    );
                                                })
                                                }
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </CardBody>
            </Card>
            : 
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader>
                            <h5 className="mb-3 fw-bold text-uppercase"> No Data Found.</h5>
                        </CardHeader>
                    </Card>
                </Col>
            </Row>
            }
        </React.Fragment>
    );
};

export default Details;