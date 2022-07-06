import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Backlog Redux States
import {
    GET_BACKLOG_LIST,
    ADD_NEW_BACKLOG,
    DELETE_BACKLOG,
    UPDATE_BACKLOG,
    GET_BACKLOG_DETAIL,
    GET_ON_KEY_PRESS_BACKLOG_LIST,
} from "./actionType";
import {
    BacklogApiResponseSuccess,
    BacklogApiResponseError,
    addBacklogSuccess,
    addBacklogFail,
    updateBacklogSuccess,
    updateBacklogFail,
    deleteBacklogSuccess,
    deleteBacklogFail,
    // getBacklogDetail,
    getBacklogDetailSuccess,
    getBacklogDetailFail,
} from "./action";

//Include Both Helper File with needed methods
import {
    getBacklogList as getBacklogListApi,
    addNewBacklog,
    updateBacklog,
    deleteBacklog,
}
    from "../../helpers/fakebackend_helper";
import axios from "axios";

function* getBacklogList(user) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/backlogs/${user.payload}` );
        yield put(BacklogApiResponseSuccess(GET_BACKLOG_LIST, response));
    } catch (error) {
        yield put(BacklogApiResponseError(GET_BACKLOG_LIST, error));
    }
}

function* getOnKeyPressBacklogList({ payload: search }) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/backlogs/search-backlog/${search}`);
        yield put(BacklogApiResponseSuccess(GET_ON_KEY_PRESS_BACKLOG_LIST, response));
    } catch (error) {
        yield put(BacklogApiResponseError(GET_ON_KEY_PRESS_BACKLOG_LIST, error));
    }
}

function* getBacklogDetail({ payload: id }) {
    // console.log("Backlog");
    // console.log(id);
    try {
        const response = yield call(axios.post, `http://localhost:3001/backlogs/backlog-overview/${id}`);
        yield put(BacklogApiResponseSuccess(GET_BACKLOG_LIST, response));
    } catch (error) {
        yield put(BacklogApiResponseError(GET_BACKLOG_LIST, error));
    }
}

function* onAddNewBacklog({ payload: backlog }) {
    console.log(backlog);
    try {
        const response = yield call(axios.post, 'http://localhost:3001/backlogs/add/backlog', backlog)
        yield put(addBacklogSuccess(response));
    } catch (error) {
        yield put(addBacklogFail(error));
    }
}

function* onDeleteBacklog({ payload: backlog }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/backlogs/delete/backlog', backlog);
        yield put(deleteBacklogSuccess(response));
    } catch (error) {
        yield put(deleteBacklogFail(error));
    }
}

function* onUpdateBacklog({ payload: backlog }) {
    console.log(backlog);
    try {
        const response = yield call(axios.post, 'http://localhost:3001/backlogs/update/backlog', backlog);
        yield put(updateBacklogSuccess(response));
    } catch (error) {
        yield put(updateBacklogFail(error));
    }
}



export function* watchGetBacklogList() {
    yield takeEvery(GET_BACKLOG_LIST, getBacklogList);
}

export function* watchGetOnKeyPressBacklogList() {
    yield takeEvery(GET_ON_KEY_PRESS_BACKLOG_LIST, getOnKeyPressBacklogList);
}

export function* watchGetBacklogDetail() {
    yield takeEvery(GET_BACKLOG_DETAIL, getBacklogDetail);
}

export function* watchAddNewBacklog() {
    yield takeEvery(ADD_NEW_BACKLOG, onAddNewBacklog);
}

export function* watchUpdateBacklog() {
    yield takeEvery(UPDATE_BACKLOG, onUpdateBacklog);
}

export function* watchDeleteBacklog() {
    yield takeEvery(DELETE_BACKLOG, onDeleteBacklog);
}



function* backlogSaga() {
    yield all([
        fork(watchGetBacklogList),
        fork(watchGetOnKeyPressBacklogList),
        fork(watchGetBacklogDetail),
        fork(watchAddNewBacklog),
        fork(watchUpdateBacklog),
        fork(watchDeleteBacklog)
    ]
    );
}

export default backlogSaga;
