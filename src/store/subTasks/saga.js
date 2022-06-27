import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Crypto Redux States
import {
    GET_SUBTASK_LIST,
    ADD_NEW_SUBTASK,
    DELETE_SUBTASK,
    UPDATE_SUBTASK,
} from "./actionType";
import {
    SubTaskApiResponseSuccess, 
    SubTaskApiResponseError,
    addSubTaskSuccess,
    addSubTaskFail,
    updateSubTaskSuccess,
    updateSubTaskFail,
    deleteSubTaskSuccess,
    deleteSubTaskFail,
} from "./action";

import axios from "axios";

function* getSubTaskList( {payload: id} ) {
    console.log(id+" SUBTASK");

    try {
        const response = yield call(axios.post, `http://localhost:3001/subTasks/${id}`);
        yield put(SubTaskApiResponseSuccess(GET_SUBTASK_LIST, response));
    } catch (error) {
        yield put(SubTaskApiResponseError(GET_SUBTASK_LIST, error));
    }
}

function* onAddNewSubTask({ payload: subTask }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/subTasks/add/subTask', subTask);
        yield put(addSubTaskSuccess(response));
    } catch (error) {
        yield put(addSubTaskFail(error));
    }
}

function* onDeleteSubTask({ payload: subTask }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/subTasks/delete/subTask', subTask);
        yield put(deleteSubTaskSuccess(response));
    } catch (error) {
        yield put(deleteSubTaskFail(error));
    }
}

function* onUpdateSubTask({ payload: subTask }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/subTasks/update/subTask', subTask);
        yield put(updateSubTaskSuccess(response));
    } catch (error) {
        yield put(updateSubTaskFail(error));
    }
}



export function* watchGetSubTaskList() {
    yield takeEvery(GET_SUBTASK_LIST, getSubTaskList);
}

export function* watchAddNewSubTask() {
    yield takeEvery(ADD_NEW_SUBTASK, onAddNewSubTask);
}

export function* watchUpdateSubTask() {
    yield takeEvery(UPDATE_SUBTASK, onUpdateSubTask);
}

export function* watchDeleteSubTask() {
    yield takeEvery(DELETE_SUBTASK, onDeleteSubTask);
}



function* subTaskSaga() {
    yield all([
        fork(watchGetSubTaskList),
        fork(watchAddNewSubTask),
        fork(watchUpdateSubTask),
        fork(watchDeleteSubTask)
    ]
    );
}

export default subTaskSaga;
