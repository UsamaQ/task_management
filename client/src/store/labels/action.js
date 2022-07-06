import {
  GET_ALL_LABEL,
  GET_LABEL_LIST_BY_TASK,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  ADD_NEW_LABEL,
  ADD_LABEL_SUCCESS,
  ADD_LABEL_FAIL,
  UPDATE_LABEL,
  UPDATE_LABEL_SUCCESS,
  UPDATE_LABEL_FAIL,
  DELETE_LABEL,
  DELETE_LABEL_SUCCESS,
  DELETE_LABEL_FAIL,
  GET_LABEL_LIST_BY_TASK_FOR_DETAILS,
} from "./actionType";

// common success
export const LabelApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const LabelApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getAllLabel = () => ({
  type: GET_ALL_LABEL,
});

export const getLabelListByTask = label => ({
  type: GET_LABEL_LIST_BY_TASK,
  payload: label,
});

export const getLabelListByTaskForDetails = label => ({
  type: GET_LABEL_LIST_BY_TASK_FOR_DETAILS,
  payload: label,
});


export const updateLabel = label => ({
  type: UPDATE_LABEL,
  payload: label,
});

export const updateLabelSuccess = label => ({
  type: UPDATE_LABEL_SUCCESS,
  payload: label,
});

export const updateLabelFail = error => ({
  type: UPDATE_LABEL_FAIL,
  payload: error,
});

export const addNewLabel = label => ({
  type: ADD_NEW_LABEL,
  payload: label,
});

export const addLabelSuccess = label => ({
  type: ADD_LABEL_SUCCESS,
  payload: label,
});

export const addLabelFail = error => ({
  type: ADD_LABEL_FAIL,
  payload: error,
});
export const deleteLabel = label => ({
  type: DELETE_LABEL,
  payload: label,
});

export const deleteLabelSuccess = label => ({
  type: DELETE_LABEL_SUCCESS,
  payload: label,
});

export const deleteLabelFail = error => ({
  type: DELETE_LABEL_FAIL,
  payload: error,
});