// import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import React, { useEffect } from 'react';
//redux
import { useSelector, useDispatch } from "react-redux";

import {
  getSprintDetail
} from "../../../store/actions";

import { useParams } from 'react-router-dom';
const OverviewTab = () => {
    let {id} = useParams();
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getSprintDetail(id));
    }, [dispatch]);
    
    
    const { sprintDetail } = useSelector((state) => ({
        sprintDetail: state.Sprints.sprintList[0],
    }));
    

    return (
        <React.Fragment>
            {(sprintDetail) ? 
            <Row>
            <Col xl={12} lg={12}>
                <Card>
                    <CardHeader xxl={9}>
                        <h5 className="mb-3 fw-bold text-uppercase"> {sprintDetail.id}. {sprintDetail.title}</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="text-muted">
                            <p className="mb-2 text-uppercase fw-medium fs-14">Description :</p>
                            <p>{sprintDetail.description}</p>
                            <div className="pt-3 border-top border-top-dashed mt-4">
                                    <Row>
                                        <Col lg={3} sm={6}>
                                            <div>
                                                <p className="mb-2 text-uppercase fw-medium fs-14">Priority :</p>
                                                {sprintDetail.priority === "Medium" ? 
                                                <span className="badge badge-soft-warning text-uppercase">{sprintDetail.priority}</span>
                                                : sprintDetail.priority === "High" ?
                                                    <span className="badge badge-soft-danger text-uppercase">{sprintDetail.priority}</span>
                                                    : sprintDetail.priority === "Low" ?
                                                        <span className="badge badge-soft-success text-uppercase">{sprintDetail.priority}</span>
                                                        : null}
                                            </div>
                                        </Col>
                                        <Col lg={3} sm={6}>
                                            <div>
                                                <p className="mb-2 text-uppercase fw-medium fs-14">Status :</p>
                                                {sprintDetail.status === "Cancelled" ?
                                                <span className="badge badge-soft-danger text-uppercase">{sprintDetail.status}</span>
                                                : sprintDetail.status === "Active" ?
                                                    <span className="badge badge-soft-info text-uppercase">{sprintDetail.status}</span>
                                                    : sprintDetail.status === "Completed" ?
                                                        <span className="badge badge-soft-success text-uppercase">{sprintDetail.status}</span>
                                                        : sprintDetail.status === "Inactive" ?
                                                            <span className="badge badge-soft-warning text-uppercase">{sprintDetail.status}</span>
                                                            : null}
                                            </div>
                                        </Col>
                                        <Col lg={3} sm={6}>
                                            <div>
                                                <p className="mb-2 text-uppercase fw-medium fs-14">Start Date :</p>
                                                <div className="badge badge-soft-info fs-12">{sprintDetail.startDate}</div>
                                            </div>
                                        </Col>
                                        <Col lg={3} sm={6}>
                                            <div>
                                                <p className="mb-2 text-uppercase fw-medium fs-14">End Date :</p>
                                                <div className="badge badge-soft-danger fs-12">{sprintDetail.dueDate}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row> 
        : 
        <Row>
            <Col xl={12} lg={12}>
                <Card>
                    <CardHeader xxl={9}>
                        <h5 className="mb-3 fw-bold text-uppercase"> No Data Found.</h5>
                    </CardHeader>
                </Card>
            </Col>
        </Row>
        }
        </React.Fragment>
    );
};

export default OverviewTab;