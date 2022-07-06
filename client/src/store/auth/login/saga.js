import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios"


// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN, API_ERROR } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";
import { Alert } from "reactstrap";

const fireBaseBackend = getFirebaseBackend();



function* loginUser({ payload: { user, history } }) {
  let response;
  try {
          const data = { email: user.email, password: user.password };
          response = yield call(axios.post, 'http://localhost:3001/auth/login', data);
          // console.log(response);
          if (response.status !== 0)
        {
          localStorage.setItem("authUser", JSON.stringify(response.accessToken));
          sessionStorage.setItem("accessToken", JSON.stringify(response.accessToken));
          sessionStorage.setItem("user", response.id);
          // history.clearAndPush('/dashboard')
          history.push('/dashboard')
          // window.location.href = '/dashboard';
          // <Redirect to="/dashboard" />;
        }
        else{
          yield put(loginSuccess(response));
          document.getElementById('errorMsg').style.display= 'flex';
        document.getElementById('errorMsg').innerText=response.error;
        // document.getElementById('errorMsg').innerText=response.error;
        }
      } catch (error) {
        // dispatch(error);
        yield put(apiError(error));
        // document.getElementById('errorMsg').innerText=response.error;
        console.log(response.error);
      }
    }
    

    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //   const response = yield call(
    //     fireBaseBackend.loginUser,
    //     user.email,
    //     user.password
    //   );
    //   yield put(loginSuccess(response));
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
    //   const response = yield call(postJwtLogin, {
    //     email: user.email,
    //     password: user.password,
    //   });
    //   localStorage.setItem("authUser", JSON.stringify(response));
    //   yield put(loginSuccess(response));
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
    //   const response = yield call(postFakeLogin, {
    //     email: user.email,
    //     password: user.password,
    //   });
    //   localStorage.setItem("authUser", JSON.stringify(response));
    //   yield put(loginSuccess(response));
    // }

function* logoutUser() {
  try {
    localStorage.removeItem("authUser");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    sessionStorage.clear();
    localStorage.clear();
    
    
    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //   const response = yield call(fireBaseBackend.logout);
    //   yield put(logoutUserSuccess(LOGOUT_USER, response));
    // } else {
    // }
    yield put(logoutUserSuccess(LOGOUT_USER, true));

  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

// function* socialLogin({ payload: { data, history, type } }) {
//   try {
//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const fireBaseBackend = getFirebaseBackend();
//       const response = yield call(
//         fireBaseBackend.socialLoginUser,
//         data,
//         type,
//       );
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     } else {
//       const response = yield call(postSocialLogin, data);
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     }
//     history.push("/dashboard");
//   } catch (error) {
//     yield put(apiError(error));
//   }
// }

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  // yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
