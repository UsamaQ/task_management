import {
  GET_TASK_LIST,
  GET_BACKLOG_TASK_LIST,
  GET_SPRINT_TASK_LIST,
  GET_BACKLOG_TASK_DETAIL,
  GET_SPRINT_TASK_DETAIL,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  ADD_NEW_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  GET_TASK_DETAIL,
  GET_TASKBOARD_TASK_LIST,
  GET_LINE_CHART_TASK_LIST,
  GET_STATUS_CHART_TASK_LIST,
  UPDATE_TASK_BY_SPRINTID,
} from "./actionType";


var user = sessionStorage.getItem("user");


// common success
export const TaskApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const TaskApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getTaskList = () => ({
  type: GET_TASK_LIST,
  payload:  user,
});

export const getTaskBoardTaskList = () => ({
  type: GET_TASKBOARD_TASK_LIST,
  payload:  user,
});

export const getLineChartTaskList = () => ({
  type: GET_LINE_CHART_TASK_LIST,
  payload:  user,
});

export const getStatusChartTaskList = () => ({
  type: GET_STATUS_CHART_TASK_LIST,
  payload:  user,
});

export const getBacklogTaskList = task => ({
  type: GET_BACKLOG_TASK_LIST,
  payload: task,

});

export const getSprintTaskList = task => ({
  type: GET_SPRINT_TASK_LIST,
  payload: task,
});

export const getTaskDetail = task => ({
  type: GET_TASK_DETAIL,
  payload: task,

});

export const getBacklogTaskDetail = task => ({
  type: GET_BACKLOG_TASK_DETAIL,
  payload: task,

});

export const getSprintTaskDetail = task => ({
  type: GET_SPRINT_TASK_DETAIL,
  payload: task,
});

export const updateTask = task => ({
  type: UPDATE_TASK,
  payload: task,
});

export const updateTaskSuccess = task => ({
  type: UPDATE_TASK_SUCCESS,
  payload: task,
});

export const updateTaskFail = error => ({
  type: UPDATE_TASK_FAIL,
  payload: error,
});

export const updateTaskBySprintId = (task, sprintId) => ({
  type: UPDATE_TASK_BY_SPRINTID,
  payload: task,
  sprintId: sprintId,
});

export const updateTaskBySprintIdSuccess = task => ({
  type: UPDATE_TASK_SUCCESS,
  payload: task,
});

export const updateTaskBySprintIdFail = error => ({
  type: UPDATE_TASK_FAIL,
  payload: error,
});

export const addNewTask = task => ({
  type: ADD_NEW_TASK,
  payload: task,
});

export const addTaskSuccess = task => ({
  type: ADD_TASK_SUCCESS,
  payload: task,
});

export const addTaskFail = error => ({
  type: ADD_TASK_FAIL,
  payload: error,
});
export const deleteTask = task => ({
  type: DELETE_TASK,
  payload: task,
});

export const deleteTaskSuccess = task => ({
  type: DELETE_TASK_SUCCESS,
  payload: task,
});

export const deleteTaskFail = error => ({
  type: DELETE_TASK_FAIL,
  payload: error,
});