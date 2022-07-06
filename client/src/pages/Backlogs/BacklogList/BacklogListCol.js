import React from "react";
import { Link } from "react-router-dom";

const Id = (cell) => {
    return (
        <React.Fragment>
            <Link 
            to={`/apps-backlog-tasks-list-view/${cell.row.original.id}/${cell.row.original.title}`}
            className=" backlogs_id">{cell.value}</Link>
        </React.Fragment>
    );
};

const Title = (cell) => {
    return (
        <React.Fragment>
            <div className="d-flex">
                <Link             
                    to={`/apps-backlog-tasks-list-view/${cell.row.original.id}/${cell.row.original.title}`}        
                    className=" flex-grow-1 backlogs_name ">{cell.value}</Link>
                {/* <div className="flex-grow-1 backlogs_name">{cell.value}</div> */}
            </div>
        </React.Fragment>
    );
};

const Description = (cell) => {
    return (
        <React.Fragment>
            <div className="d-flex">
                <div className="flex-grow-1 backlogs_name">{cell.value}</div>
            </div>
        </React.Fragment>
    );
};


// const Label = (cell) => {
//     return (
//         <React.Fragment>
//                 <span className="badge badge-soft-info text-uppercase">{cell.value}</span>
//         </React.Fragment>
//     );
// };

// const Status = (cell) => {
//     return (
//         <React.Fragment>
//             {cell.value === "Inprogress" ?
//                 <span className="badge badge-soft-secondary text-uppercase">{cell.value}</span>
//                 :
//                 cell.value === "New" ?
//                     <span className="badge badge-soft-info text-uppercase">{cell.value}</span>
//                     : cell.value === "Completed" ?
//                         <span className="badge badge-soft-success text-uppercase">{cell.value}</span>
//                         : cell.value === "Pending" ?
//                             <span className="badge badge-soft-warning text-uppercase">{cell.value}</span>
//                             : null
//             }
//         </React.Fragment>
//     );
// };

// const Priority = (cell) => {
//     return (
//         <React.Fragment>
//             {cell.value === "Medium" ?
//                 <span className="badge bg-warning text-uppercase">{cell.value}</span>
//                 :
//                 cell.value === "High" ?
//                     <span className="badge bg-danger text-uppercase">{cell.value}</span>
//                     : cell.value === "Low" ?
//                         <span className="badge bg-success text-uppercase">{cell.value}</span>
//                         : null
//             }
//         </React.Fragment>
//     );
// };


export { Id, Title, Description};