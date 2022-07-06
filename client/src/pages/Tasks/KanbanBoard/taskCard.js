import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, Modal, UncontrolledDropdown } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getAllLabel } from "../../../store/actions";

const CardTaskBox = props => {

    const { data } = props;
    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getAllLabel(data.id));
    }, []);
    
    const { labelList } = useSelector((state) => ({
        labelList: state.Labels.labelList,
    }));

    var labels_changed = 0;
    if (data.labelID) {
        var labelFromTask = data.labelID.toString();
        labels_changed = labelFromTask.split(',');
    }

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    return (
        <React.Fragment>
            <div className="tasks-board mb-3" id="kanbanboard">
                <div className="tasks-list">

                    <SimpleBar className="tasks-wrapper px-3 mx-n3">
                        <div id="unassigned-task" className="tasks">

                            <Card className="tasks-box" >
                                <CardBody>
                                    <div className="d-flex mb-2">
                                        <h6 className="fs-16 mb-0 flex-grow-1 text-truncate">{data.isTaskIdHeader 
                                        ? <Link to="#" className="text-muted fw-medium fs-14 flex-grow-1">{data.taskId}</Link> 
                                        : <Link to="/apps-tasks-details" className="link-dark">{data.title}</Link>}</h6>
                                    </div>

                                    {data.isTaskIdHeader && <h6 className="fs-15 text-truncate"><Link to="/apps-tasks-details" className="link-dark">{data.title}</Link></h6>}

                                    {data.description ? <p className="text-muted">{data.description}</p> : null }



                                    {/* {console.log(data)} */}
                                    {data.id && <div >
                                        <div className="d-flex ">
                                            <div className="flex-grow-1 align-items-center">
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
                                            <div className="flex-shrink-0">
                                                <span className="text-muted">{data.dueDate}</span>
                                            </div>
                                        </div>
                                    </div>}
                                        <div className="flex-grow-1">
                                    <div className="d-flex align-items-center">
                                            {map(data.labels, (data, key) => (<span className="badge badge-soft-primary me-1" key={key}>{data.tag}</span>))}
                                        </div>
                                    </div>
                                </CardBody>
                                <div className="card-footer border-top-dashed">
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            {data.id ? <h6 className="text-muted mb-0">{data.id}</h6> :
                                                <span className="text-muted"><i className="ri-time-line align-bottom"></i> {data.dueDate} </span>}
                                        </div>
                                        <div className="flex-shrink-0">
                                            <ul className="link-inline mb-0">
                                                <li className="list-inline-item">
                                                    <Link to={`/apps-tasks-details/${data.id}`} className="text-muted"><i className="ri-eye-line align-bottom" /></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </SimpleBar>
                    {/* <div className="my-3">
                        <Button color="info" className="btn-soft-info w-100" onClick={() => { tog_newTask(); }}>Add More</Button>
                    </div> */}
                </div>
            </div>

            {/* Delete Record Modal */}
            <Modal isOpen={modal_delete} toggle={() => { tog_delete(); }} centered modalClassName="zoomIn" id="deleteRecordModal">
                <div className="modal-header">
                    <Button type="button" onClick={() => { setmodal_delete(false); }} className="btn-close" aria-label="Close" >
                    </Button>
                </div>
                <div className="modal-body">
                    <div className="mt-2 text-center">
                        <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                            colors="primary:#f7b84b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you sure ?</h4>
                            <p className="text-muted mx-4 mb-0">Are you sure you want to remove this tasks ?</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <Button color="light" className="w-sm" onClick={() => setmodal_delete(false)}>Close</Button>
                        <Button color="danger" className="w-sm" id="delete-record">Yes, Delete It!</Button>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default CardTaskBox;
