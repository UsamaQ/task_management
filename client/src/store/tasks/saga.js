import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Crypto Redux States
import {
    GET_TASK_LIST,
    GET_BACKLOG_TASK_LIST,
    GET_SPRINT_TASK_LIST,
    GET_BACKLOG_TASK_DETAIL,
    GET_SPRINT_TASK_DETAIL,
    ADD_NEW_TASK,
    DELETE_TASK,
    UPDATE_TASK,
    GET_TASK_DETAIL,
    GET_TASKBOARD_TASK_LIST,
    GET_LINE_CHART_TASK_LIST,
    GET_STATUS_CHART_TASK_LIST,
    UPDATE_TASK_BY_SPRINTID,
} from "./actionType";
import {
    TaskApiResponseSuccess, 
    TaskApiResponseError,
    addTaskSuccess,
    addTaskFail,
    updateTaskSuccess,
    updateTaskFail,
    deleteTaskSuccess,
    deleteTaskFail,
    updateTaskBySprintIdSuccess,
    updateTaskBySprintIdFail,
} from "./action";

import axios from "axios";

function* getTaskList(user) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/tasks/${user.payload}`);
        yield put(TaskApiResponseSuccess(GET_TASK_LIST, response));
    } catch (error) {
        yield put(TaskApiResponseError(GET_TASK_LIST, error));
    }
}

function* getTaskboardTaskList(user) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/tasks/${user.payload}`);
        yield put(TaskApiResponseSuccess(GET_TASKBOARD_TASK_LIST, response));
    } catch (error) {
        yield put(TaskApiResponseError(GET_TASKBOARD_TASK_LIST, error));
    }
}

function* getLineChartTaskList(user) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/tasks/line-chart/${user.payload}`);
        yield put(TaskApiResponseSuccess(GET_LINE_CHART_TASK_LIST, response));
    } catch (error) {
        yield put(TaskApiResponseError(GET_LINE_CHART_TASK_LIST, error));
    }
}

function* getStatusChartTaskList(user) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/tasks/status-chart/${user.payload}`);
        yield put(TaskApiResponseSuccess(GET_STATUS_CHART_TASK_LIST, response));
    } catch (error) {
        yield put(TaskApiResponseError(GET_STATUS_CHART_TASK_LIST, error));
    }
}

function* getBacklogTaskList({ payload: id }) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/tasks/backlog/${id}`);
        yield put(TaskApiResponseSuccess(GET_BACKLOG_TASK_LIST, response));
    } catch (error) {
        yield put(TaskApiResponseError(GET_BACKLOG_TASK_LIST, error));
    }
}

function* getSprintTaskList({ payload: id }) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/tasks/sprint/${id}`);
        yield put(TaskApiResponseSuccess(GET_SPRINT_TASK_LIST, response));
    } catch (error) {
        yield put(TaskApiResponseError(GET_SPRINT_TASK_LIST, error));
    }
}

function* getTaskDetail({ payload: id }) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/tasks/task-overview/${id}`);
        yield put(TaskApiResponseSuccess(GET_TASK_DETAIL, response));
    } catch (error) {
        yield put(TaskApiResponseError(GET_TASK_DETAIL, error));
    }
}

function* getBacklogTaskDetail({ payload: id }) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/tasks/backlog/task/overview/${id}`);
        yield put(TaskApiResponseSuccess(GET_BACKLOG_TASK_DETAIL, response));
    } catch (error) {
        yield put(TaskApiResponseError(GET_BACKLOG_TASK_DETAIL, error));
    }
}

function* getSprintTaskDetail({ payload: id }) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/tasks/sprint/task/overview/${id}`);
        yield put(TaskApiResponseSuccess(GET_SPRINT_TASK_DETAIL, response));
    } catch (error) {
        yield put(TaskApiResponseError(GET_SPRINT_TASK_DETAIL, error));
    }
}

function* onAddNewTask({ payload: task }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/tasks/add/task', task);

        yield put(addTaskSuccess(response));
    } catch (error) {
        yield put(addTaskFail(error));
    }
}

function* onUpdateTaskBySprintId({ payload: task ,sprintId: sprintId}) {
    console.log(task, sprintId);
    try {
        const response = yield call(axios.post, 'http://localhost:3001/tasks/updateTaskBySprint/task', {task , sprintId} );

        yield put(updateTaskBySprintIdSuccess(response));
    } catch (error) {
        yield put(updateTaskBySprintIdFail(error));
    }
}

function* onDeleteTask({ payload: task }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/tasks/delete/task', task);
        yield put(deleteTaskSuccess(response));
    } catch (error) {
        yield put(deleteTaskFail(error));
    }
}

function* onUpdateTask({ payload: task }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/tasks/update/task', task);
        yield put(updateTaskSuccess(response));
    } catch (error) {
        yield put(updateTaskFail(error));
    }
}



export function* watchGetTaskList() {
    yield takeEvery(GET_TASK_LIST, getTaskList);
}

export function* watchGetTaskboardTaskList() {
    yield takeEvery(GET_TASKBOARD_TASK_LIST, getTaskboardTaskList);
}

export function* watchGetLineChartTaskList() {
    yield takeEvery(GET_LINE_CHART_TASK_LIST, getLineChartTaskList);
}

export function* watchGetStatusChartTaskList() {
    yield takeEvery(GET_STATUS_CHART_TASK_LIST, getStatusChartTaskList);
}

export function* watchGetBacklogTaskList() {
    yield takeEvery(GET_BACKLOG_TASK_LIST, getBacklogTaskList);
}

export function* watchGetSprintTaskList() {
    yield takeEvery(GET_SPRINT_TASK_LIST, getSprintTaskList);
}

export function* watchGetTaskDetail() {
    yield takeEvery(GET_TASK_DETAIL, getTaskDetail);
}

export function* watchGetBacklogTaskDetail() {
    yield takeEvery(GET_BACKLOG_TASK_DETAIL, getBacklogTaskDetail);
}

export function* watchGetSprintTaskDetail() {
    yield takeEvery(GET_SPRINT_TASK_DETAIL, getSprintTaskDetail);
}

export function* watchAddNewTask() {
    yield takeEvery(ADD_NEW_TASK, onAddNewTask);
}

export function* watchUpdateTask() {
    yield takeEvery(UPDATE_TASK, onUpdateTask);
}

export function* watchUpdateTaskBySprintId() {
    yield takeEvery(UPDATE_TASK_BY_SPRINTID, onUpdateTaskBySprintId);
}

export function* watchDeleteTask() {
    yield takeEvery(DELETE_TASK, onDeleteTask);
}



function* taskSaga() {
    yield all([
        fork(watchGetTaskList),
        fork(watchGetTaskboardTaskList),
        fork(watchGetLineChartTaskList),
        fork(watchGetStatusChartTaskList),
        fork(watchGetBacklogTaskList),
        fork(watchGetSprintTaskList),
        fork(watchGetTaskDetail),
        fork(watchGetBacklogTaskDetail),
        fork(watchGetSprintTaskDetail),
        fork(watchAddNewTask),
        fork(watchUpdateTask),
        fork(watchUpdateTaskBySprintId),
        fork(watchDeleteTask)
    ]
    );
}

export default taskSaga;
