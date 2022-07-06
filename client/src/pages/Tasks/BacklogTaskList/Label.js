import React, { useState, useEffect } from 'react';
import DeleteModal from "../../../Components/Common/DeleteModal";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal, ModalBody, Row, Label, Input, Button, ModalHeader, FormFeedback, Form, Card, CardHeader, CardBody, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';

import {
  getLabelList,
  addNewLabel,
  updatelabel,
  deleteLabel
} from "../../../store/actions";
import { getAllLabel } from '../../../store/actions';

const LabelTag = ({handleLabelClick}) => {
  const dispatch = useDispatch();


useEffect(() => {
    dispatch(getAllLabel());
}, []);

const { labelList } = useSelector((state) => ({
    labelList: state.Labels.labelList,
}));

const [labels, setLabel]= useState("");
const [LabelColor, setLabelColor]= useState("");

const handleLabelTextChange = (e) => {
    setLabel(e.target.value)
}

const handleLabelColorChange = (e) => {
  setLabelColor(e.target.value)
}

const handleBtnClick = (e) => {
    e.preventDefault();
    const labelData = {
        labelName: labels,
        labelColor: LabelColor,
    }
    console.log(labelData);
    dispatch(addNewLabel(labelData));
    setLabel(""); 
}

function handleDelete (id) {
    const labelData = {
        id: id,
    }
    dispatch(deleteLabel(labelData))
}


  return (
    <React.Fragment>
      <Card style={{marginTop: 30}}>
        <CardBody>
          <Label for="labelName-field labelColor-field" className=" card-title form-label">Label</Label>
          <Row>
                <Col lg={6}>
                  <Input
                  name="labelName"
                  id="labelName-field"
                  className="form-control"
                  placeholder="Label"
                  type="text"
                  value={labels}
                  onChange={handleLabelTextChange} 
                  />
                </Col>  

                <Col lg={4}>  
                  <Input
                    name="labelColor"
                    type="select"
                    className="form-select"
                    id="labelColor-field"
                    value='badge-soft-info'
                    onChange={handleLabelColorChange}
                  >
                    <option value="">Colour</option>
                    <option value="badge-soft-success">Green</option>
                    <option value="badge-soft-info">Cayn</option>
                    <option value="badge-soft-secondary">Blue</option>
                    <option value="badge-soft-warning">Yellow</option>
                    <option value="badge-soft-danger">Red</option>
                  </Input>
                </Col>
            <Col lg={2}>
              <button 
              // type="submit" 
              style={{width: 100}}
              className="btn btn-info" 
              id="label-btn"
              onClick={handleBtnClick}
              >
                Add Label
              </button>
            </Col>
            <Row className='mt-2'>
              <Col lg={12}>
                {/* <ListGroup className="mb-1"> */}
                  {labelList.map((label, index) => {
                    return (
                        // <ListGroupItem >
                          <div 
                          key={index}
                          className={`badge ${label.labelColor} text-uppercase me-3`}
                          onClick={() => handleLabelClick(label.id)}
                          style={{cursor: 'pointer'}}
                          >
                          {label.labelName}
                            <i type='button' 
                            className="ri-delete-bin-fill align-bottom ms-1 text-muted"
                            onClick={ () => handleDelete(label.id)}
                            ></i>
                          </div>
                        // </ListGroupItem>
                      );
                    })
                    }
                {/* </ListGroup> */}
              </Col>
            </Row>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default LabelTag;