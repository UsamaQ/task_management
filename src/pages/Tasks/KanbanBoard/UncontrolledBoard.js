import React from "react";
import Board from "@lourenci/react-kanban";
import { Row, Col } from "reactstrap";
import CardTaskBox from "./taskCard";
import RenderCardTitle from "./HeaderComponets";

const UncontrolledBoard = props => {
  const content = props.board;
  console.log(props);
  console.log(content.columns.length);
  return (
    <React.Fragment>
      <Row className="mb-4">
        <Col>
        {/* {console.log("usama")} */}
          <Board
            initialBoard={content}
            renderColumnHeader={({ status }) => (
              <RenderCardTitle status={status} />
            )}
            renderCard={(data, { dragging }) => (
              <CardTaskBox data={data} dragging={dragging}>
                {console.log("Data Card")}
                {data}
              </CardTaskBox>
            )}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UncontrolledBoard;
