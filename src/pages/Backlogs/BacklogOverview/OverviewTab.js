import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { getBacklogDetail } from '../../../store/actions';


const OverviewTab = () => {
  let {id} = useParams();
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getBacklogDetail(id));
    }, [dispatch]);
    
    
    const { backlogDetail } = useSelector((state) => ({
        backlogDetail: state.Backlogs.backlogList[0],
    }));
    
    return (
        <React.Fragment>
            {(backlogDetail) ? 
            <Row>
            <Col xl={12} lg={12}>
                <Card>
                    <CardHeader xxl={9}>
                        <h5 className="mb-3 fw-bold text-uppercase"> {backlogDetail.id}. {backlogDetail.title}</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="text-muted">
                            <p className="mb-2 text-uppercase fw-medium fs-14">Description :</p>
                            <p>{backlogDetail.description}</p>

                            <div className="pt-3 border-top border-top-dashed mt-4">
                                <Row>
                                    <Col lg={12}>
                                        <div>
                                            <p className="mb-2 text-uppercase fw-medium fs-14">Label :</p>
                                            <div className="badge bg-danger fs-12">{backlogDetail.labelid}</div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row> : 
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