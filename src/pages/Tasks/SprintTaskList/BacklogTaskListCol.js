import React from "react";

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
            </div>
        </React.Fragment>
    );
};


export { Id, Title };