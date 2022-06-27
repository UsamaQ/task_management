import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Progress, Row } from 'reactstrap';
import { getBacklogDetail, getBacklogTaskDetail, getSubTaskList } from '../../../store/actions';

const Details = () => {

    let {id} = useParams();
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(getBacklogTaskDetail(id));
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(getSubTaskList(id));
    }, []);
    
    const { backlogTaskDetail } = useSelector((state) => ({
        backlogTaskDetail: state.Tasks.backlogTaskDetail[0],
    }));

    const { subTaskList } = useSelector((state) => ({
        subTaskList: state.SubTasks.subTaskList,
    }));

    const [subTasks, setSubtasks]= useState("");
    const handleChange = (e) => {
        setSubtasks(e.target.value)
    }
	const handleSubmit = (e) => {
        e.preventDefault();
        console.log(subTasks);
        setSubtasks(""); 
	}

    return (
        <React.Fragment>
            {(backlogTaskDetail) ? 
            <Card>
                <CardHeader xxl={9}>
                    <h5 className="mb-3 fw-bold text-uppercase"> {backlogTaskDetail.id}. {backlogTaskDetail.title}</h5>
                </CardHeader>
                <CardBody>
                    <div className="text-muted">
                            <p className="mb-2 text-uppercase fw-medium fs-14">Description :</p>
                            <p>{backlogTaskDetail.description}</p>
                        <div className="pt-3 border-top border-top-dashed mt-4">
                            <Row>
                                <Col lg={6} sm={3}>
                                    <div>
                                        <p className="mb-2 text-uppercase fw-medium fs-14">Status :</p>
                                        {backlogTaskDetail.status === "To Do" ?
                                        <span className="badge badge-soft-secondary text-uppercase">{backlogTaskDetail.status}</span>
                                        :
                                        backlogTaskDetail.status === "In Progress" ?
                                            <span className="badge badge-soft-info text-uppercase">{backlogTaskDetail.status}</span>
                                            : backlogTaskDetail.status === "Completed" ?
                                                <span className="badge badge-soft-success text-uppercase">{backlogTaskDetail.status}</span>
                                                : backlogTaskDetail.status === "Pending" ?
                                                    <span className="badge badge-soft-warning text-uppercase">{backlogTaskDetail.status}</span>
                                                    : backlogTaskDetail.status === "Cancelled" ?
                                                    <span className="badge badge-soft-danger text-uppercase">{backlogTaskDetail.status}</span>
                                                    : null}
                                    </div>
                                </Col>
                                <Col lg={6} sm={3}>
                                    <div>
                                        <p className="mb-2 text-uppercase fw-medium fs-14">Priority :</p>
                                        {backlogTaskDetail.priority === "Medium" ? 
                                        <span className="badge badge-soft-warning text-uppercase">{backlogTaskDetail.priority}</span>
                                        : backlogTaskDetail.priority === "High" ?
                                            <span className="badge badge-soft-danger text-uppercase">{backlogTaskDetail.priority}</span>
                                            : backlogTaskDetail.priority === "Low" ?
                                                <span className="badge badge-soft-success text-uppercase">{backlogTaskDetail.priority}</span>
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