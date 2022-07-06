import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

const Starter = () => {
  document.title="Starter | Velzon - React Admin & Dashboard Template";
  const AccordionData =[
    {
        id:1,
        qn:"What is Lorem Ipsum?",
        ans:"Lorem Ipsum is simply dummy text of the printing and typesetting industry"   
    },
    {
        id:2,
        qn:"Where does it come from?",
        ans:"Contrary to popular belief, Lorem Ipsum is not simply random text"
       
    },
    {
        id:3,
        qn:"Why do we use it?",
        ans:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
       
    },
    {
        id:4,
        qn:"Where can I get some?",
        ans:"There are many variations of passages of Lorem Ipsum available"
       
    }
];

const [toggle, setToggle] = useState(null);
let handleToggle=(id)=>{
    if(toggle===id){
        setToggle(null);
        return false
    }
   setToggle(id)
}
function AccordionList({accordionData, handleToggle, toggle}){
  return(  
        accordionData.map((value)=>{
            const {id, qn, ans} = value;
            return(
                <div className="card" key={id}>
                <div className="card-header" onClick={()=>handleToggle(id)} style={{cursor:"pointer"}}> <b>{(id===toggle)?'-':'+'} {qn}</b></div>
                {(id===toggle)?<div className="card-body">{ans}</div>:''}
              
            </div>
            
            )
        })
  )
}

  return (
    <React.Fragment>      
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Starter" pageTitle="Pages" />
          <Row>
            <Col xs={12}>
              <Card>
                <div className="container">
                  <div className="row">
                      <div className="col-sm-4">
                      <h3>React Accordion</h3>
                      <AccordionList accordionData={AccordionData} handleToggle={handleToggle} toggle={toggle} />
                      </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Starter;