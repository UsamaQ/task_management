import React from "react";
import { Link } from "react-router-dom";

const Id = (cell) => {
    return (
        <React.Fragment>
            <div className="flex-grow-1 tasks_id">{cell.value}</div>
        </React.Fragment>
    );
};

const Title = (cell) => {
    return (
        <React.Fragment>
            <div className="d-flex">
                <div className="flex-grow-1 tasks_name">{cell.value}</div>
                <div className="flex-shrink-0 ms-4">
                    <ul className="list-inline tasks-list-menu mb-0">
                        <li className="list-inline-item">
                            <Link to="/apps-backlog-tasks-details">
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


const Status = (cell) => {
    return (
        <React.Fragment>
            {cell.value === "To Do" ?
                <span className="badge badge-soft-secondary text-uppercase">{cell.value}</span>
                :
                cell.value === "In Progress" ?
                    <span className="badge badge-soft-info text-uppercase">{cell.value}</span>
                    : cell.value === "Completed" ?
                        <span className="badge badge-soft-success text-uppercase">{cell.value}</span>
                        : cell.value === "Pending" ?
                            <span className="badge badge-soft-warning text-uppercase">{cell.value}</span>
                            : cell.value === "Cancelled" ?
                            <span className="badge badge-soft-danger text-uppercase">{cell.value}</span>
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
const Size = (cell) => {
    return (
        <React.Fragment>
            {cell.value === "Medium" ?
                <span className="badge badge-soft-secondary text-uppercase">{cell.value}</span>
                : cell.value === "Small" ?
                    <span className="badge badge-soft-info text-uppercase">{cell.value}</span>
                    : cell.value === "Extra Small" ?
                        <span className="badge badge-soft-success text-uppercase">{cell.value}</span>
                        : cell.value === "Large" ?
                            <span className="badge badge-soft-warning text-uppercase">{cell.value}</span>
                            : cell.value === "Extra Large" ?
                                <span className="badge badge-soft-danger text-uppercase">{cell.value}</span>
                                : null
            }
        </React.Fragment>
    );
}


export { Id, Title, Status, Priority, Size };