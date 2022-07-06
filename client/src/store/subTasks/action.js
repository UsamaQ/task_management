import {
  GET_SUBTASK_LIST,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  ADD_NEW_SUBTASK,
  ADD_SUBTASK_SUCCESS,
  ADD_SUBTASK_FAIL,
  UPDATE_SUBTASK,
  UPDATE_SUBTASK_SUCCESS,
  UPDATE_SUBTASK_FAIL,
  DELETE_SUBTASK,
  DELETE_SUBTASK_SUCCESS,
  DELETE_SUBTASK_FAIL,
} from "./actionType";

// common success
export const SubTaskApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const SubTaskApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getSubTaskList = subTask => ({
  type: GET_SUBTASK_LIST,
  payload: subTask,
});


export const updateSubTask = (subTask, checkedValue) => ({
  type: UPDATE_SUBTASK,
  payload: subTask,
  checkedValue: checkedValue,
});

export const updateSubTaskSuccess = subTask => ({
  type: UPDATE_SUBTASK_SUCCESS,
  payload: subTask,
});

export const updateSubTaskFail = error => ({
  type: UPDATE_SUBTASK_FAIL,
  payload: error,
});

export const addNewSubTask = subTask => ({
  type: ADD_NEW_SUBTASK,
  payload: subTask,
});

export const addSubTaskSuccess = subTask => ({
  type: ADD_SUBTASK_SUCCESS,
  payload: subTask,
});

export const addSubTaskFail = error => ({
  type: ADD_SUBTASK_FAIL,
  payload: error,
});
export const deleteSubTask = subTask => ({
  type: DELETE_SUBTASK,
  payload: subTask,
});

export const deleteSubTaskSuccess = subTask => ({
  type: DELETE_SUBTASK_SUCCESS,
  payload: subTask,
});

export const deleteSubTaskFail = error => ({
  type: DELETE_SUBTASK_FAIL,
  payload: error,
});