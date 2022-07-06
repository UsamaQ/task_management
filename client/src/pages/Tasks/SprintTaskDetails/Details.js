import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Progress, Row } from 'reactstrap';
import { addNewSubTask, deleteSubTask, getSprintTaskDetail, getSubTaskList, updateSubTask } from '../../../store/actions';
import { getAllLabel } from '../../../store/labels/action';

const Details = () => {

    let {id} = useParams();
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(getSprintTaskDetail(id));
        dispatch(getSubTaskList(id));
        dispatch(getAllLabel(id));
    }, [dispatch, id]);

    const { sprintTaskDetail } = useSelector((state) => ({
        sprintTaskDetail: state.Tasks.sprintTaskDetail[0],
    }));

    const { subTaskList } = useSelector((state) => ({
        subTaskList: state.SubTasks.subTaskList,
    }));

    const { labelList } = useSelector((state) => ({
        labelList: state.Labels.labelList,
    }));

    var labels_changed = 0;
    if (sprintTaskDetail) {
        var labelFromTask = sprintTaskDetail.labelID.toString();
        labels_changed = labelFromTask.split(',');
    }

    let progress = 0;
        if (progress === 0) {
            if (subTaskList && subTaskList.length) {
                let checked_count = 0;
                for (let i = 0; i < subTaskList.length; i++) {
                    if (subTaskList[i].isChecked === true) {
                         checked_count++;
                    }
                    progress = (checked_count / subTaskList.length) * 100 ;
                }
                
            }
        }

    const [subTasks, setSubtasks]= useState("");
    const handleChange = (e) => {
        setSubtasks(e.target.value)
    }

	const handleSubmit = (e) => {
        e.preventDefault();
        const subTaskData = {
            data: subTasks,
            taskID: id,
        }
        dispatch(addNewSubTask(subTaskData));
        setSubtasks(""); 
	}

    function handleDelete (id) {
        const subTaskData = {
            id: id,
        }
        dispatch(deleteSubTask(subTaskData))
    }

    const handleOnChange = (checkedValue, id) => {
        dispatch(updateSubTask(id, checkedValue));
    };

    return (
        <React.Fragment>
            {(sprintTaskDetail) ? 
            <Card>
                <CardHeader xxl={9}>
                    <h5 className="mb-3 fw-bold text-uppercase"> {sprintTaskDetail.id}. {sprintTaskDetail.title}</h5>
                </CardHeader>
                <CardBody>
                    <div className="text-muted">
                            <p className="mb-2 text-uppercase fw-medium fs-14">Description :</p>
                            <p>{sprintTaskDetail.description}</p>
                        <div className="pt-3 border-top border-top-dashed mt-4">
                            <Row>
                                <Col lg={4} sm={3}>
                                    <div>
                                        <p className="mb-2 text-uppercase fw-medium fs-14">Status :</p>
                                        {sprintTaskDetail.status === "To Do" ?
                                        <span className="badge badge-soft-secondary text-uppercase">{sprintTaskDetail.status}</span>
                                        :
                                        sprintTaskDetail.status === "In Progress" ?
                                            <span className="badge badge-soft-info text-uppercase">{sprintTaskDetail.status}</span>
                                            : sprintTaskDetail.status === "Completed" ?
                                                <span className="badge badge-soft-success text-uppercase">{sprintTaskDetail.status}</span>
                                                : sprintTaskDetail.status === "Pending" ?
                                                    <span className="badge badge-soft-warning text-uppercase">{sprintTaskDetail.status}</span>
                                                    : sprintTaskDetail.status === "Cancelled" ?
                                                    <span className="badge badge-soft-danger text-uppercase">{sprintTaskDetail.status}</span>
                                                    : null}
                                    </div>
                                </Col>
                                <Col lg={4} sm={3}>
                                    <div>
                                        <p className="mb-2 text-uppercase fw-medium fs-14">Priority :</p>
                                        {sprintTaskDetail.priority === "Medium" ? 
                                        <span className="badge badge-soft-warning text-uppercase">{sprintTaskDetail.priority}</span>
                                        : sprintTaskDetail.priority === "High" ?
                                            <span className="badge badge-soft-danger text-uppercase">{sprintTaskDetail.priority}</span>
                                            : sprintTaskDetail.priority === "Low" ?
                                                <span className="badge badge-soft-success text-uppercase">{sprintTaskDetail.priority}</span>
                                                : null}
                                    </div>
                                </Col>
                                <Col lg={4} sm={3}>
                                    <div>
                                        <p className="mb-2 text-uppercase fw-medium fs-14">Label :</p>
                                        {
                                        labels_changed !== 0 ?

                                            <div>
                                            {labelList.map((allLabels, index) => {
                                                return (
                                                    <div key={index}>
                                                        {labels_changed.indexOf(allLabels.id.toString()) !== -1 ?
                                                        <div 
                                                        key={index}
                                                        className={`badge ${allLabels.labelColor} text-uppercase me-3`}
                                                        >
                                                            {allLabels.labelName}
                                                        </div>
                                                        :
                                                        <div></div>
                                                        }
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        :
                                        <></>
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="pt-3 border-top border-top-dashed mt-4">
                            <Row>
                                <Col lg={4}>
                                    <p className="mb-2 text-uppercase fw-medium fs-14">Progress :</p>
                                    <Progress color='info' value={progress} />
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
                                                                            id={`custom-checkbox-${index}`}
                                                                            value={subTask.data} 
                                                                            onChange={(e) => handleOnChange(e.target.checked, subTask.id)}
                                                                            checked={subTask.isChecked}
                                                                             />
                                                                            {subTask.data}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-shrink-0">
                                                                    <i type='button' 
                                                                    className="ri-delete-bin-fill align-bottom me-2 text-muted"
                                                                    onClick={ () => handleDelete(subTask.id)}
                                                                    ></i>
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