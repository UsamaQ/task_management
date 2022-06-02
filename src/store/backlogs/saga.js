import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Crypto Redux States
import {
    GET_BACKLOG_LIST,
    ADD_NEW_BACKLOG,
    DELETE_BACKLOG,
    UPDATE_BACKLOG,
} from "./actionType";
import {
    BacklogApiResponseSuccess, BacklogApiResponseError,
    addBacklogSuccess,
    addBacklogFail,
    updateBacklogSuccess,
    updateBacklogFail,
    deleteBacklogSuccess,
    deleteBacklogFail,
} from "./action";

//Include Both Helper File with needed methods
import {
    getBacklogList as getBacklogListApi,
    addNewBacklog,
    updateBacklog,
    deleteBacklog,
}
    from "../../helpers/fakebackend_helper";

function* getBacklogList() {
    try {
        const response = yield call(getBacklogListApi);
        yield put(BacklogApiResponseSuccess(GET_BACKLOG_LIST, response));
    } catch (error) {
        yield put(BacklogApiResponseError(GET_BACKLOG_LIST, error));
    }
}

function* onAddNewBacklog({ payload: backlog }) {
    try {
        const response = yield call(addNewBacklog, backlog);

        yield put(addBacklogSuccess(response));
    } catch (error) {
        yield put(addBacklogFail(error));
    }
}

function* onDeleteBacklog({ payload: backlog }) {
    try {
        const response = yield call(deleteBacklog, backlog);
        yield put(deleteBacklogSuccess(response));
    } catch (error) {
        yield put(deleteBacklogFail(error));
    }
}

function* onUpdateBacklog({ payload: backlog }) {
    try {
        const response = yield call(updateBacklog, backlog);
        yield put(updateBacklogSuccess(response));
    } catch (error) {
        yield put(updateBacklogFail(error));
    }
}



export function* watchGetBacklogList() {
    yield takeEvery(GET_BACKLOG_LIST, getBacklogList);
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
        fork(watchAddNewBacklog),
        fork(watchUpdateBacklog),
        fork(watchDeleteBacklog)
    ]
    );
}

export default backlogSaga;
