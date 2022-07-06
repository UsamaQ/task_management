import {
    GET_SPRINT_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    ADD_NEW_SPRINT,
    ADD_SPRINT_SUCCESS,
    ADD_SPRINT_FAIL,
    UPDATE_SPRINT,
    UPDATE_SPRINT_SUCCESS,
    UPDATE_SPRINT_FAIL,
    DELETE_SPRINT,
    DELETE_SPRINT_SUCCESS,
    DELETE_SPRINT_FAIL,
    GET_SPRINT_DETAIL,
    GET_SPRINT_DETAIL_SUCCESS,
    GET_SPRINT_DETAIL_FAIL,
    GET_SPRINT_LIST_ON_GLOBAL_SEARCH,
  } from "./actionType";

var user = sessionStorage.getItem("user");
  
  // common success
  export const SprintApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
  });
  // common error
  export const SprintApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
  });
  
  export const getSprintList = () => ({
    type: GET_SPRINT_LIST,
    payload:  user,
  });

  export const getSprintListOnGlobalSearch = sprint => ({
    type: GET_SPRINT_LIST_ON_GLOBAL_SEARCH,
    payload:  sprint,
  });

  export const getSprintDetail =  sprint => ({
    type: GET_SPRINT_DETAIL,
    payload: sprint,
  });

  export const getSprintDetailSuccess = sprint => ({
    type: GET_SPRINT_DETAIL_SUCCESS,
    payload: sprint,
  });
  
  export const getSprintDetailFail = error => ({
    type: GET_SPRINT_DETAIL_FAIL,
    payload: error,
  });
  
  export const updateSprint = sprint => ({
    type: UPDATE_SPRINT,
    payload: sprint,
  });
  
  export const updateSprintSuccess = sprint => ({
    type: UPDATE_SPRINT_SUCCESS,
    payload: sprint,
  });
  
  export const updateSprintFail = error => ({
    type: UPDATE_SPRINT_FAIL,
    payload: error,
  });
  
  export const addNewSprint = sprint => ({
    type: ADD_NEW_SPRINT,
    payload: sprint,
  });
  
  export const addSprintSuccess = sprint => ({
    type: ADD_SPRINT_SUCCESS,
    payload: sprint,
  });
  
  export const addSprintFail = error => ({
    type: ADD_SPRINT_FAIL,
    payload: error,
  });
  export const deleteSprint = sprint => ({
    type: DELETE_SPRINT,
    payload: sprint,
  });
  
  export const deleteSprintSuccess = sprint => ({
    type: DELETE_SPRINT_SUCCESS,
    payload: sprint,
  });
  
  export const deleteSprintFail = error => ({
    type: DELETE_SPRINT_FAIL,
    payload: error,
  });