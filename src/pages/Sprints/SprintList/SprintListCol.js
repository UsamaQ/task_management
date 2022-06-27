import React from "react";
import { Link } from "react-router-dom";

const Id = (cell) => {
    return (
        <React.Fragment>
            <Link to={"/apps-sprint-tasks-list-view"} className=" sprints_id">{cell.value}</Link>
        </React.Fragment>
    );
};

const Title = (cell) => {
    return (
        <React.Fragment>
            <div className="d-flex">
                <Link to="/apps-sprint-tasks-list-view" className=" flex-grow-1 sprints_name ">{cell.value}</Link>
                <div className="flex-grow-1 tasks_name">{cell.value}</div>
                <div className="flex-shrink-0 ms-4">
                    <ul className="list-inline tasks-list-menu mb-0">
                        <li className="list-inline-item">
                            <Link to="/apps-sprint-tasks-details">
                                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="#">
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <a className="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};


const StartDate = (cell) => {
    return (
        <React.Fragment>
            {cell.value}
        </React.Fragment>
    );
};

const DueDate = (cell) => {
    return (
        <React.Fragment>
            {cell.value}
        </React.Fragment>
    );
};

const Status = (cell) => {
    return (
        <React.Fragment>
            {cell.value === "Cancelled" ?
                <span className="badge badge-soft-danger text-uppercase">{cell.value}</span>
                : cell.value === "Active" ?
                    <span className="badge badge-soft-info text-uppercase">{cell.value}</span>
                    : cell.value === "Completed" ?
                        <span className="badge badge-soft-success text-uppercase">{cell.value}</span>
                        : cell.value === "Inactive" ?
                            <span className="badge badge-soft-warning text-uppercase">{cell.value}</span>
                            : null
            }
        </React.Fragment>
    );
};

const Priority = (cell) => {
    return (
        <React.Fragment>
            {cell.value === "Medium" ?
                <span className="badge bg-warning text-uppercase">{cell.value}</span>
                :
                cell.value === "High" ?
                    <span className="badge bg-danger text-uppercase">{cell.value}</span>
                    : cell.value === "Low" ?
                        <span className="badge bg-success text-uppercase">{cell.value}</span>
                        : null
            }
        </React.Fragment>
    );
};


export { Id, Title, StartDate, DueDate, Status, Priority };