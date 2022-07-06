import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { Button, Card, CardBody, Col, Container, Form, Input, Label, Modal, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { map } from "lodash";
import UncontrolledBoard from './UncontrolledBoard';
import { kanbanBoardData } from '../../../common/data';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskBoardTaskList } from '../../../store/actions';
import _ from 'lodash';

const KanbanBoard = () => {
    document.title="TaskBoard | Velzon - React Admin & Dashboard Template";

    const headerArray =[
        {
            id: 'To Do',
            name: 'To Do',
            tasks: [],
            cards: [],
        },
        {
            id: 'In Progress',
            name: 'In Progress',
            tasks: [],
            cards: [],
        },
        {
            id: 'Completed',
            name: 'Completed',
            tasks: [],
            cards: [],
        },
        {
            id: 'Pending',
            name: 'Pending',
            tasks: [],
            cards: [],
        },
        {
            id: 'Cancelled',
            name: 'Cancelled',
            tasks: [],
            cards: [],
        },
    ]


    const dispatch = useDispatch();

    const { taskboardTaskList } = useSelector((state) => ({
      taskboardTaskList: state.Tasks.taskboardTaskList,
    }));
    
    useEffect(() => {
        dispatch(getTaskBoardTaskList());
    }, []);
    
    
    const [array, setArray]=useState();
    
    // array.push(label);
    
    
    const grouped = _.groupBy(taskboardTaskList, groupedTasks => groupedTasks.status);
    
    const data3 = map(grouped, (task, index) => (task));
    // console.log('data 3 ',data3);

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

  const [finalArray, setFinalArray] = useState([]);

  
  



    // const data3 = map(headerArray, (task, index) => ({...task, tasks: task}));
    const data2 = map(grouped, (task, index) => ({ id: index, name: index , tasks: task}));
    const data = map(grouped, (task, index) => ({ id: index, name: index, cards: task , tasks: task}));
    
        for (let i = 0; i < headerArray.length; i++) {
            let check = 0;
            for (let j = 0; j < data3.length; j++) {
                if (headerArray[i].id === data3[j][0].status) {
                    check++;
                }
                
            }
            if (check === 0) {
                data2.push(headerArray[i]);
                data.push(headerArray[i]);
                
                
            }
        }

    // console.log(data);

    return (
        <React.Fragment>           
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Dashboard" pageTitle="Tasks" />
                    <Card>
                        <CardBody>
                            <Row className="g-2">
                                <Col className="col-lg-auto">
                                    <div className="hstack gap-2">
                                        <Button 
                                        color="primary"
                                        >
                                            <i className="ri-add-line align-bottom me-1"></i> Create Board
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    {/* <UncontrolledBoard board={{ columns: data }} content={kanbanBoardData} /> */}
                    <UncontrolledBoard board={{ columns: data }} content={data2} />

                    {/* Delete Record Modal */}
                    <Modal isOpen={modal_delete} toggle={() => { tog_delete(); }} centered modalClassName="zoomIn" id="deleteRecordModal">
                        <div className="modal-header">
                            <Button type="button" onClick={() => { setmodal_delete(false); }} className="btn-close" aria-label="Close" >
                            </Button>
                        </div>
                        <div className="modal-body">
                            <div className="mt-2 text-center">
                                <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                                    colors="primary:#f7b84b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                    <h4>Are you sure ?</h4>
                                    <p className="text-muted mx-4 mb-0">Are you sure you want to remove this tasks ?</p>
                                </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                <Button color="light" className="w-sm" onClick={() => setmodal_delete(false)}>Close</Button>
                                <Button color="danger" className="w-sm" id="delete-record">Yes, Delete It!</Button>
                            </div>
                        </div>
                    </Modal>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default KanbanBoard;