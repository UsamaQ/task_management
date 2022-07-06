import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// User Redux States
import {
    GET_USER_LIST,
    UPDATE_USER,
    GET_USER_DETAIL,
} from "./actionType";
import {
    UserApiResponseSuccess,
    UserApiResponseError,
    updateUserSuccess,
    updateUserFail,
} from "./action";

import axios from "axios";

function* getUserList(user) {
    try {
        const response = yield call(axios.post, `http://localhost:3001/auth/login/${user.payload}` );
        yield put(UserApiResponseSuccess(GET_USER_LIST, response));
    } catch (error) {
        yield put(UserApiResponseError(GET_USER_LIST, error));
    }
}

function* getUserDetail({ payload: id }) {
    // console.log("User");
    // console.log(id);
    try {
        const response = yield call(axios.post, `http://localhost:3001/auth/user-overview/${id}`);
        yield put(UserApiResponseSuccess(GET_USER_LIST, response));
    } catch (error) {
        yield put(UserApiResponseError(GET_USER_LIST, error));
    }
}

function* onUpdateUser({ payload: user }) {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/auth/update/user', user);
        yield put(updateUserSuccess(response));
    } catch (error) {
        yield put(updateUserFail(error));
    }
}



export function* watchGetUserList() {
    yield takeEvery(GET_USER_LIST, getUserList);
}

export function* watchGetUserDetail() {
    yield takeEvery(GET_USER_DETAIL, getUserDetail);
}

export function* watchUpdateUser() {
    yield takeEvery(UPDATE_USER, onUpdateUser);
}



function* userSaga() {
    yield all([
        fork(watchGetUserList),
        fork(watchGetUserDetail),
        fork(watchUpdateUser),
    ]
    );
}

export default userSaga;
