import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Sprint Redux States
import {
    GET_SPRINT_LIST,
    ADD_NEW_SPRINT,
    DELETE_SPRINT,
    UPDATE_SPRINT,
    GET_SPRINT_DETAIL,
    GET_SPRINT_LIST_ON_GLOBAL_SEARCH,
} from "./actionType";
import {
    SprintApiResponseSuccess, SprintApiResponseError,
    addSprintSuccess,
    addSprintFail,
    updateSprintSuccess,
    updateSprintFail,
    deleteSprintSuccess,
    deleteSprintFail,
    getSprintDetailSuccess,
    getSprintDetailFail,
} from "./action";

//Include Both Helper File with needed methods
import {
    getSprintList as getSprintListApi,
    addNewSprint,
    updateSprint,
    deleteSprint,
}
    from "../../helpers/fakebackend_helper";
import axios from "axios";

function* getSprintList(user) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/sprints/${user.payload}`);
        yield put(SprintApiResponseSuccess(GET_SPRINT_LIST, response));
    } catch (error) {
        yield put(SprintApiResponseError(GET_SPRINT_LIST, error));
    }
}

function* getSprintDetail({ payload: id }) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/sprints/sprint-overview/${id}`);
        yield put(SprintApiResponseSuccess(GET_SPRINT_LIST, response));
    } catch (error) {
        yield put(SprintApiResponseError(GET_SPRINT_LIST, error));
    }
}

function* getSprintListOnGlobalSearch({ payload: search }) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/sprints/global/search-sprint/${search}`);
        yield put(SprintApiResponseSuccess(GET_SPRINT_LIST_ON_GLOBAL_SEARCH, response));
    } catch (error) {
        yield put(SprintApiResponseError(GET_SPRINT_LIST_ON_GLOBAL_SEARCH, error));
    }
}

function* onAddNewSprint({ payload: sprint }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/sprints/add/sprint', sprint)
        yield put(addSprintSuccess(response));
    } catch (error) {
        yield put(addSprintFail(error));
    }
}

function* onDeleteSprint({ payload: sprint }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/sprints/delete/sprint', sprint);
        yield put(deleteSprintSuccess(response));
    } catch (error) {
        yield put(deleteSprintFail(error));
    }
}

function* onUpdateSprint({ payload: sprint }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/sprints/update-sprint', sprint);
        yield put(updateSprintSuccess(response));
    } catch (error) {
        yield put(updateSprintFail(error));
    }
}



export function* watchGetSprintList() {
    yield takeEvery(GET_SPRINT_LIST, getSprintList);
}

export function* watchGetSprintDetail() {
    yield takeEvery(GET_SPRINT_DETAIL, getSprintDetail);
}

export function* watchGetSprintListOnGlobalSearch() {
    yield takeEvery(GET_SPRINT_LIST_ON_GLOBAL_SEARCH, getSprintListOnGlobalSearch);
}

export function* watchAddNewSprint() {
    yield takeEvery(ADD_NEW_SPRINT, onAddNewSprint);
}

export function* watchUpdateSprint() {
    yield takeEvery(UPDATE_SPRINT, onUpdateSprint);
}

export function* watchDeleteSprint() {
    yield takeEvery(DELETE_SPRINT, onDeleteSprint);
}



function* sprintSaga() {
    yield all([
        fork(watchGetSprintList),
        fork(watchGetSprintDetail),
        fork(watchGetSprintListOnGlobalSearch),
        fork(watchAddNewSprint),
        fork(watchUpdateSprint),
        fork(watchDeleteSprint)
    ]
    );
}

export default sprintSaga;
