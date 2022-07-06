import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllLabel, getLabelListByTask } from "../../store/labels/action";

const Id = (cell) => {
    return (
        <React.Fragment>
            <div className="d-flex">
                <Link             
                    to={`/apps-tasks-details/${cell.row.original.id}`}        
                    className=" flex-grow-1 backlogs_name ">{cell.value}
                </Link>
            </div>
        </React.Fragment>
    );
};

const TaskTitle = (cell) => {
    return (
        <React.Fragment>
            <div className="d-flex">
                <Link             
                    to={`/apps-tasks-details/${cell.row.original.id}`}        
                    className=" flex-grow-1 backlogs_name ">{cell.value}
                </Link>
            </div>
        </React.Fragment>
    );
};

const SprintID = (cell) => {
    return (
        <React.Fragment>
            <div className="d-flex">
                <div className="flex-grow-1 tasks_name">{cell.value}</div>
            </div>
        </React.Fragment>
    );
};

const Status = (cell) => {
    return (
        <React.Fragment>
            {cell.value === "To Do" ?
            <span className="badge badge-soft-secondary text-uppercase">{cell.value}</span>
            : cell.value === "In Progress" ?
                <span className="badge badge-soft-info text-uppercase">{cell.value}</span>
                : cell.value === "Completed" ?
                    <span className="badge badge-soft-success text-uppercase">{cell.value}</span>
                    : cell.value === "Pending" ?
                        <span className="badge badge-soft-warning text-uppercase">{cell.value}</span>
                        : cell.value === "Cancelled" ?
                            <span className="badge badge-soft-danger text-uppercase">{cell.value}</span>
                            : null}
        </React.Fragment>
    );
};
const Priority = (cell) => {
    return (
        <React.Fragment>
            {cell.value === "Medium" ?
            <span className="badge bg-warning text-uppercase">{cell.value}</span>
            :cell.value === "High" ?
                <span className="badge bg-danger text-uppercase">{cell.value}</span>
                : cell.value === "Low" ?
                    <span className="badge bg-success text-uppercase">{cell.value}</span>
                    : null}
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
const Labell = (cell) => {

    const dispatch = useDispatch();
    // cell.row.original.id
  
    //   useEffect(() => {
    //     }, []);
    
        const { labelList } = useSelector((state) => ({
            labelList: state.Labels.labelList,
      }));
      
    var labels_changed = 0;
    if (cell.row.original.labelID) {
        var labelFromTask = cell.row.original.labelID.toString();
        labels_changed = labelFromTask.split(',');
    }
        
      return (
          <React.Fragment>
             <div className="d-flex">
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
          </React.Fragment>
      );
  };


const DueDate = (cell) => {
    return (
        <React.Fragment>
            <div className="d-flex">
                <div className="flex-grow-1 tasks_name">{cell.value}</div>
            </div>
        </React.Fragment>
    );
};

const Actions = (cell) => {
    return (
        <React.Fragment>
            <div className="flex-shrink-0 ms-4">
                <ul className="list-inline tasks-list-menu mb-0">
                    <li className="list-inline-item">
                        <Link to="/apps-tasks-details">
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
        </React.Fragment>
    );
};


export { Id, TaskTitle, Status, SprintID, Actions, Priority, Size, Labell, DueDate };