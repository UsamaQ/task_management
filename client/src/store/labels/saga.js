import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Crypto Redux States
import {
    GET_ALL_LABEL,
    GET_LABEL_LIST_BY_TASK,
    ADD_NEW_LABEL,
    DELETE_LABEL,
    UPDATE_LABEL,
    GET_LABEL_LIST_BY_TASK_FOR_DETAILS,
} from "./actionType";
import {
    LabelApiResponseSuccess, 
    LabelApiResponseError,
    addLabelSuccess,
    addLabelFail,
    updateLabelSuccess,
    updateLabelFail,
    deleteLabelSuccess,
    deleteLabelFail,
} from "./action";

import axios from "axios";

function* getAllLabel()  {
    try {
        const response = yield call(axios.post, `http://localhost:3001/labels`);
        yield put(LabelApiResponseSuccess(GET_ALL_LABEL, response));
    } catch (error) {
        yield put(LabelApiResponseError(GET_ALL_LABEL, error));
    }
}

function* getLabelListByTask( {payload: id} ) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/labels/${id}`);
        yield put(LabelApiResponseSuccess(GET_LABEL_LIST_BY_TASK, response));
    } catch (error) {
        yield put(LabelApiResponseError(GET_LABEL_LIST_BY_TASK, error));
    }
}

function* getLabelListByTaskForDetails( {payload: id} ) {
    console.log(id);
    try {
        const response = yield call(axios.post, `http://localhost:3001/labels/${id}`);
        console.log(response);
        yield put(LabelApiResponseSuccess(GET_LABEL_LIST_BY_TASK_FOR_DETAILS, response));
    } catch (error) {
        yield put(LabelApiResponseError(GET_LABEL_LIST_BY_TASK_FOR_DETAILS, error));
    }
}

function* onAddNewLabel({ payload: label }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/labels/add-label', label);
        yield put(addLabelSuccess(response));
    } catch (error) {
        yield put(addLabelFail(error));
    }
}

function* onDeleteLabel({ payload: label }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/labels/delete/label', label);
        yield put(deleteLabelSuccess(response));
    } catch (error) {
        yield put(deleteLabelFail(error));
    }
}

function* onUpdateLabel({ payload: label }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/labels/update/label', label);
        yield put(updateLabelSuccess(response));
    } catch (error) {
        yield put(updateLabelFail(error));
    }
}


export function* watchGetAllLabel() {
    yield takeEvery(GET_ALL_LABEL, getAllLabel);
}

export function* watchGetLabelListByTask() {
    yield takeEvery(GET_LABEL_LIST_BY_TASK, getLabelListByTask);
}

export function* watchGetLabelListByTaskForDetails() {
    yield takeEvery(GET_LABEL_LIST_BY_TASK_FOR_DETAILS, getLabelListByTaskForDetails);
}

export function* watchAddNewLabel() {
    yield takeEvery(ADD_NEW_LABEL, onAddNewLabel);
}

export function* watchUpdateLabel() {
    yield takeEvery(UPDATE_LABEL, onUpdateLabel);
}

export function* watchDeleteLabel() {
    yield takeEvery(DELETE_LABEL, onDeleteLabel);
}



function* labelSaga() {
    yield all([
        fork(watchGetAllLabel),
        fork(watchGetLabelListByTask),
        fork(watchGetLabelListByTaskForDetails),
        fork(watchAddNewLabel),
        fork(watchUpdateLabel),
        fork(watchDeleteLabel)
    ]
    );
}

export default labelSaga;
