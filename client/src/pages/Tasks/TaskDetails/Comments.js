import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane, UncontrolledDropdown } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import avatar7 from "../../../assets/images/users/avatar-7.jpg";
import avatar10 from "../../../assets/images/users/avatar-10.jpg";
import avatar8 from "../../../assets/images/users/avatar-8.jpg";
import avatar6 from "../../../assets/images/users/avatar-6.jpg";
import image4 from "../../../assets/images/small/img-4.jpg";
import image5 from "../../../assets/images/small/img-5.jpg";

const Comments = () => {
    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    return (
        <React.Fragment>
            <Row>
                <Col xl={9} lg={8}>
                    <Card>
                        <CardHeader>
                            <div className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Comments</h4>
                            </div>
                        </CardHeader>
                        <CardBody>
                                    <SimpleBar style={{ height: "408px" }} className="px-3 mx-n3 mb-2">
                                        <div className="d-flex mb-4">
                                            <div className="flex-shrink-0">
                                                <img src={avatar7} alt="" className="avatar-xs rounded-circle" />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h5 className="fs-15"><Link to="/pages-profile">Joseph Parker</Link> <small className="text-muted">20 Dec 2021 - 05:47AM</small></h5>
                                                <p className="text-muted">I am getting message from customers that when they place order always get error message .</p>
                                                <Link to="#" className="badge text-muted bg-light"><i className="mdi mdi-reply"></i> Reply</Link>
                                                <div className="d-flex mt-4">
                                                    <div className="flex-shrink-0">
                                                        <img src={avatar10} alt="" className="avatar-xs rounded-circle" />
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h5 className="fs-15"><Link to="/pages-profile">Tonya Noble</Link> <small className="text-muted">22 Dec 2021 - 02:32PM</small></h5>
                                                        <p className="text-muted">Please be sure to check your Spam mailbox to see if your email filters have identified the email from Dell as spam.</p>
                                                        <Link to="#" className="badge text-muted bg-light"><i className="mdi mdi-reply"></i> Reply</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex mb-4">
                                            <div className="flex-shrink-0">
                                                <img src={avatar8} alt="" className="avatar-xs rounded-circle" />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h5 className="fs-15"><Link to="/pages-profile">Thomas Taylor</Link> <small className="text-muted">24 Dec 2021 - 05:20PM</small></h5>
                                                <p className="text-muted">If you have further questions, please contact Customer Support from the “Action Menu” on your <Link to="#" className="text-decoration-underline">Online Order Support</Link>.</p>
                                                <Link to="#" className="badge text-muted bg-light"><i className="mdi mdi-reply"></i> Reply</Link>
                                            </div>
                                        </div>
                                    </SimpleBar>
                                    <form className="mt-4">
                                        <Row className="g-3">
                                            <Col lg={12}>
                                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Leave a Comments</label>
                                                <textarea className="form-control bg-light border-light" id="exampleFormControlTextarea1" rows="3" placeholder="Enter comments"></textarea>
                                            </Col>
                                            <Col xs={12} className="text-end">
                                                <button type="button" className="btn btn-ghost-secondary btn-icon waves-effect me-1"><i className="ri-attachment-line fs-16"></i></button>
                                                <Link to="#" className="btn btn-success">Post Comments</Link>
                                            </Col>
                                        </Row>
                                    </form>
                        </CardBody>
                    </Card>
                </Col>
                
                <Col xl={3} lg={4}>
                    <Card>
                        <CardHeader className="align-items-center d-flex border-bottom-dashed">
                            <h4 className="card-title mb-0 flex-grow-1">Attachments</h4>
                            <div className="flex-shrink-0">
                                <button type="button" className="btn btn-soft-info btn-sm"><i className="ri-upload-2-fill me-1 align-bottom"></i> Upload</button>
                            </div>
                        </CardHeader>

                        <CardBody>

                            <div className="vstack gap-2">
                                <div className="border rounded border-dashed p-2">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar-sm">
                                                <div className="avatar-title bg-light text-secondary rounded fs-24">
                                                    <i className="ri-folder-zip-line"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="fs-15 mb-1"><Link to="#" className="text-body text-truncate d-block">App-pages.zip</Link></h5>
                                            <div>2.2MB</div>
                                        </div>
                                        <div className="flex-shrink-0 ms-2">
                                            <div className="d-flex gap-1">
                                                <button type="button" className="btn btn-icon text-muted btn-sm fs-18"><i className="ri-download-2-line"></i></button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="button" className="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Rename</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded border-dashed p-2">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar-sm">
                                                <div className="avatar-title bg-light text-secondary rounded fs-24">
                                                    <i className="ri-file-ppt-2-line"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="fs-15 mb-1"><Link to="#" className="text-body text-truncate d-block">Velzon-admin.ppt</Link></h5>
                                            <div>2.4MB</div>
                                        </div>
                                        <div className="flex-shrink-0 ms-2">
                                            <div className="d-flex gap-1">
                                                <button type="button" className="btn btn-icon text-muted btn-sm fs-18"><i className="ri-download-2-line"></i></button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="button" className="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Rename</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded border-dashed p-2">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar-sm">
                                                <div className="avatar-title bg-light text-secondary rounded fs-24">
                                                    <i className="ri-folder-zip-line"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="fs-15 mb-1"><Link to="#" className="text-body text-truncate d-block">Images.zip</Link></h5>
                                            <div>1.2MB</div>
                                        </div>
                                        <div className="flex-shrink-0 ms-2">
                                            <div className="d-flex gap-1">
                                                <button type="button" className="btn btn-icon text-muted btn-sm fs-18"><i className="ri-download-2-line"></i></button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="button" className="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Rename</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded border-dashed p-2">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar-sm">
                                                <div className="avatar-title bg-light text-secondary rounded fs-24">
                                                    <i className="ri-image-2-line"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="fs-14 mb-1"><Link to="#" className="text-body text-truncate d-block">bg-pattern.png</Link></h5>
                                            <div>1.1MB</div>
                                        </div>
                                        <div className="flex-shrink-0 ms-2">
                                            <div className="d-flex gap-1">
                                                <button type="button" className="btn btn-icon text-muted btn-sm fs-18"><i className="ri-download-2-line"></i></button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="button" className="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Rename</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 text-center">
                                    <button type="button" className="btn btn-success">View more</button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Comments;