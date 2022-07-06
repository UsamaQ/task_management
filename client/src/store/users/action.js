import {
    GET_USER_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    GET_USER_DETAIL,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_FAIL,
  } from "./actionType";
  
var loginUser = sessionStorage.getItem("user");
  // common success
  export const UserApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
  });
  // common error
  export const UserApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
  });
  
  export const getUserList = () => ({
    type: GET_USER_LIST,
    payload:  loginUser,
  });

  export const getUserDetail = user => ({
    type: GET_USER_DETAIL,
    payload:  user,
  });

  export const getUserDetailSuccess = user => ({
    type: GET_USER_DETAIL_SUCCESS,
    payload: user,
  });
  
  export const getUserDetailFail = error => ({
    type: GET_USER_DETAIL_FAIL,
    payload: error,
  });
  
  export const updateUser = user => ({
    type: UPDATE_USER,
    payload: user,
  });
  
  export const updateUserSuccess = user => ({
    type: UPDATE_USER_SUCCESS,
    payload: user,
  });
  
  export const updateUserFail = error => ({
    type: UPDATE_USER_FAIL,
    payload: error,
  });