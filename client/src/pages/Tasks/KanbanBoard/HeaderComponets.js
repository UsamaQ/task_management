import React from "react";

const RenderCardTitle = props => {
  return (
    <React.Fragment>
      <div className="d-flex mb-3 me-4">
        <div className="flex-grow-1">
        {/* {props.name === "To Do" ?
          <h6 className="fs-14 badge-soft-secondary text-uppercase fw-bold p-1">{props.name}</h6>
          : props.name === "In Progress" ?
              <h6 className="fs-14 badge-soft-info text-uppercase fw-bold p-1">{props.name}</h6>
              : props.name === "Completed" ?
                  <h6 className="fs-14 badge-soft-success text-uppercase fw-bold p-1">{props.name}</h6>
                  : props.name === "Pending" ?
                      <h6 className="fs-14 badge-soft-warning text-uppercase fw-bold p-1">{props.name}</h6>
                      : props.name === "Cancelled" ?
                      <h6 className="fs-14 badge-soft-danger text-uppercase fw-bold p-1">{props.name}</h6>
                      : null} */}
                          <h6 className="fs-14 text-uppercase fw-bold mb-0">{props.name}</h6>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RenderCardTitle;
