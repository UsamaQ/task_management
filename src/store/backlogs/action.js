import {
    GET_BACKLOG_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    ADD_NEW_BACKLOG,
    ADD_BACKLOG_SUCCESS,
    ADD_BACKLOG_FAIL,
    UPDATE_BACKLOG,
    UPDATE_BACKLOG_SUCCESS,
    UPDATE_BACKLOG_FAIL,
    DELETE_BACKLOG,
    DELETE_BACKLOG_SUCCESS,
    DELETE_BACKLOG_FAIL,
  } from "./actionType";
  
  // common success
  export const BacklogApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
  });
  // common error
  export const BacklogApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
  });
  
  export const getBacklogList = () => ({
    type: GET_BACKLOG_LIST,
  });
  
  export const updateBacklog = backlog => ({
    type: UPDATE_BACKLOG,
    payload: backlog,
  });
  
  export const updateBacklogSuccess = backlog => ({
    type: UPDATE_BACKLOG_SUCCESS,
    payload: backlog,
  });
  
  export const updateBacklogFail = error => ({
    type: UPDATE_BACKLOG_FAIL,
    payload: error,
  });
  
  export const addNewBacklog = backlog => ({
    type: ADD_NEW_BACKLOG,
    payload: backlog,
  });
  
  export const addBacklogSuccess = backlog => ({
    type: ADD_BACKLOG_SUCCESS,
    payload: backlog,
  });
  
  export const addBacklogFail = error => ({
    type: ADD_BACKLOG_FAIL,
    payload: error,
  });
  export const deleteBacklog = backlog => ({
    type: DELETE_BACKLOG,
    payload: backlog,
  });
  
  export const deleteBacklogSuccess = backlog => ({
    type: DELETE_BACKLOG_SUCCESS,
    payload: backlog,
  });
  
  export const deleteBacklogFail = error => ({
    type: DELETE_BACKLOG_FAIL,
    payload: error,
  });