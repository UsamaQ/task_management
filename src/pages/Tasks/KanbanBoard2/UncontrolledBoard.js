import React, { useState } from "react";
import Board from "@lourenci/react-kanban";
import { Row, Col, Accordion, AccordionItem, Collapse } from "reactstrap";
import CardTaskBox from "./taskCard";
import RenderCardTitle from "./HeaderComponets";
import classnames from "classnames";


const UncontrolledBoard = props => {
  const content = props.board;
let id= props.content;



let [plusiconCol1, setplusiconCol1] = useState(false);
const [toggle, setToggle] = useState(0);
let handleToggle=(id)=>{
  setplusiconCol1(!plusiconCol1);
  if(toggle===id){
    setToggle(0);
    }
   setToggle(id);
  //  console.log(id);
   console.log(toggle);
}


//   let counter = 0;

//   const t_plusiconCol1 = () => {
// };

  // let selectedId = "";

  //  function setselectedId (id) {
  //   console.log("test"+id);
  //   selectedId = "test"+id;
  //   console.log(selectedId);
  //   setplusiconCol1(!plusiconCol1);

  // }

  return (
    <React.Fragment>
      <Row className="mb-12">
        <Col>     

        <Accordion className="tasks-board" 
          // id={`accordionWithplusicon${props}`}
          >
                    
                  <Board
                    initialBoard={content}
                    renderColumnHeader={({ id, name, badge, badgeClass }) => (
                      // try to Add multiple accordian in a single function
                      <AccordionItem className="tasks-board mt-2 ">
                      <div className={classnames("tasks-Box", { collapsed: !plusiconCol1 })} onClick={()=>handleToggle(id)} style={{ cursor: "pointer" }} >
                      
                        <RenderCardTitle  id={id} name={name} badge={badge} badgeClass={badgeClass} />
                      
                      </div>
                    </AccordionItem>
                      )}
  
                    renderCard={( data, { dragging }) => (
                      <Collapse isOpen={(id===toggle)? plusiconCol1: !plusiconCol1} className="accordion-collapse" >
                      <div className="accordion-body">
                      <div id={`cardList${data}`}>
                              <CardTaskBox data={data} dragging={dragging}>
                                {data}
                              </CardTaskBox>
                              </div>
                      </div>
                    </Collapse>
  
                    )}
                    onNewCardConfirm={draftCard => ({
                      id: new Date().getTime(),
                      ...draftCard,
                    })}
                  />
          </Accordion>
                {/* <Board
                  initialBoard={content}
                  renderColumnHeader={({ id, name, badge, badgeClass }) => (
                    <div onClick={()=>handleToggle(id)} style={{cursor:"pointer"}}> 
                    <RenderCardTitle  id={id} name={name} badge={badge} badgeClass={badgeClass} />
                    </div>
                    )}


                    renderCard={( data, { dragging }) => (
                    (id===toggle)?
                    <CardTaskBox data={data} dragging={dragging}>{data}</CardTaskBox>
                    :
                    ''
                  // <CardTaskBox data={data} dragging={dragging}>{data}</CardTaskBox>
                  )}
                  onNewCardConfirm={draftCard => ({
                    id: new Date().getTime(),
                    ...draftCard,
                  })}
                /> */}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UncontrolledBoard;
