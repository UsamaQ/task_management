import React, { useEffect } from 'react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Container } from 'reactstrap';
//redux
import { useSelector, useDispatch } from "react-redux";
import { getBacklogList } from "../../../store/actions";


import List from './List';

const BacklogList = () => {
    document.title="Backlog List | Velzon - React Admin & Dashboard Template";

    const dispatch = useDispatch();

    const { backlogList } = useSelector((state) => ({
        backlogList: state.Backlogs.backlogList,
    }));

    useEffect(() => {
        dispatch(getBacklogList());
    }, [dispatch]);
    return (
        <React.Fragment>
            <div className="page-content">                
                <Container fluid>
                    <BreadCrumb title="Backlog List" pageTitle="Backlogs" />
                    <List backlogList={backlogList} />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default BacklogList;