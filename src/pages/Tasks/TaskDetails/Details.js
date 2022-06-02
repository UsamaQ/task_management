import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Label } from 'reactstrap';

const Details = () => {

    const [status, setStatus]= useState("Completed");
    const [priority, setPriority]= useState("High");
    
    return (
        <React.Fragment>
            <Card>
                <CardHeader xxl={9}>
                        <h5 className="mb-3 fw-bold text-uppercase">Details</h5>
                </CardHeader>
                <CardBody>
                    <div className="text-muted">
                        <ul className=" ps-3 list-unstyled vstack gap-2">
                            <li>
                                <div>
                                    <Label>
                                        ID :
                                    </Label>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <Label>
                                        Title :
                                    </Label>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <Label>
                                        Description :
                                    </Label>
                                    <p>It will be as simple as occidental in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words.</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <Label style={{marginRight: 10}}>
                                        Status :
                                    </Label>
                                    <React.Fragment>
                                        {
                                            status === "Inprogress" ?
                                            <span className="badge badge-soft-secondary text-uppercase">{status}</span>
                                            :
                                            status === "New" ?
                                            <span className="badge badge-soft-info text-uppercase">{status}</span>
                                            : status === "Completed" ?
                                            <span className="badge badge-soft-success text-uppercase">{status}</span>
                                            : status === "Pending" ?
                                            <span className="badge badge-soft-warning text-uppercase">{status}</span>
                                            : null
                                        }
                                    </React.Fragment>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <Label style={{marginRight: 10}}>
                                        priority :
                                    </Label>
                                    <React.Fragment>
                                        {priority === "Medium" ?
                                            <span className="badge bg-warning text-uppercase">{priority}</span>
                                            :
                                            priority === "High" ?
                                                <span className="badge bg-danger text-uppercase">{priority}</span>
                                                : priority === "Low" ?
                                                    <span className="badge bg-success text-uppercase">{priority}</span>
                                                    : null
                                        }
                                    </React.Fragment>
                                </div>
                            </li>
                        </ul>

                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Details;