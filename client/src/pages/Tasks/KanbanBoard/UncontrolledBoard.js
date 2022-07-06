import React from "react";
import Board from "@lourenci/react-kanban";
import { Row, Col } from "reactstrap";
import CardTaskBox from "./taskCard";
import RenderCardTitle from "./HeaderComponets";
import { updateTask } from "../../../store/actions";
import { useDispatch } from "react-redux";

const UncontrolledBoard = props => {
  const content = props.board;
  const dispatch = useDispatch();

  function handleCardMove(board, card, source, destination) {

    // console.log("card : ", card);
    console.log("destination : ", destination);
    
    const updatedTask = {
      id: card.id,
      status: destination.toColumnId,
    };
    console.log("Data to Send: ", updatedTask);
    dispatch(updateTask(updatedTask));
  }

  return (
    <React.Fragment>
      <Row className="mb-4">
        <Col>
          <Board
            initialBoard={content}
            renderColumnHeader={({ id, name }) => (
              <RenderCardTitle id={id} name={name} />
            )}
            renderCard={(data, { dragging }) => (
              <CardTaskBox data={data} dragging={dragging}>
                {data}
              </CardTaskBox>
            )}
            onCardDragEnd={handleCardMove}
            onNewCardConfirm={draftCard => ({
              id: new Date().getTime(),
              ...draftCard,
            })}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UncontrolledBoard;
