import {
    GET_TASK_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAIL,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    GET_BACKLOG_TASK_LIST,
    GET_SPRINT_TASK_LIST,
    GET_TASK_DETAIL,
    GET_BACKLOG_TASK_DETAIL,
    GET_SPRINT_TASK_DETAIL,
    GET_TASKBOARD_TASK_LIST,
    GET_LINE_CHART_TASK_LIST,
    GET_STATUS_CHART_TASK_LIST,
    UPDATE_TASK_BY_SPRINTID_SUCCESS,
    UPDATE_TASK_BY_SPRINTID_FAIL,
} from "./actionType";

const INIT_STATE = {
    taskboardTaskList: [],
    taskList: [],
    backlogTaskList: [],
    sprintTaskList: [],
    taskDetail: [],
    backlogTaskDetail: [],
    sprintTaskDetail: [],
    lineChartTaskList: [],
    statusChartTaskList: [],

};

const Tasks = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {

                case GET_TASK_LIST:
                    return {
                        ...state,
                        taskList: action.payload.data,
                    };

                case GET_TASKBOARD_TASK_LIST:
                    return {
                        ...state,
                        taskboardTaskList: action.payload.data,
                    };
                    
                case GET_LINE_CHART_TASK_LIST:
                    return {
                        ...state,
                        lineChartTaskList: action.payload.data,
                    };

                case GET_STATUS_CHART_TASK_LIST:
                    return {
                        ...state,
                        statusChartTaskList: action.payload.data,
                    };

                case GET_BACKLOG_TASK_LIST:
                    return {
                        ...state,
                        backlogTaskList: action.payload.data,
                    };

                case GET_SPRINT_TASK_LIST:
                    return {
                        ...state,
                        sprintTaskList: action.payload.data,
                    };

                case GET_TASK_DETAIL:
                    return {
                        ...state,
                        taskDetail: action.payload.data,
                    };

                case GET_BACKLOG_TASK_DETAIL:
                    return {
                        ...state,
                        backlogTaskDetail: action.payload.data,
                    };

                case GET_SPRINT_TASK_DETAIL:
                    return {
                        ...state,
                        sprintTaskDetail: action.payload.data,
                    };
                

                default:
                    return { ...state };
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_TASKBOARD_TASK_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_LINE_CHART_TASK_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_STATUS_CHART_TASK_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_BACKLOG_TASK_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_SPRINT_TASK_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_BACKLOG_TASK_DETAIL:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_SPRINT_TASK_DETAIL:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                default:
                    return { 
                        ...state,
                        error: action.payload.error,
                    };
            }

        case GET_TASK_LIST: {
            return {
                ...state,
            };
        }
        
        case GET_TASKBOARD_TASK_LIST:{
            return {
                ...state,
            };
        }

        case GET_LINE_CHART_TASK_LIST:{
            return {
                ...state,
            };
        }

        case GET_STATUS_CHART_TASK_LIST: {
            return {
                ...state,
            };
        }

        case GET_BACKLOG_TASK_LIST: {
            return {
                ...state,
            };
        }


        case GET_SPRINT_TASK_LIST: {
            return {
                ...state,
            };
        }

        case GET_TASK_DETAIL: {
            return {
                ...state,
            };
        }

        case GET_BACKLOG_TASK_DETAIL: {
            return {
                ...state,
            };
        }


        case GET_SPRINT_TASK_DETAIL: {
            return {
                ...state,
            };
        }

        case ADD_TASK_SUCCESS:
            return {
                ...state,
                backlogTaskList: [...state.backlogTaskList, action.payload],
            };

        case ADD_TASK_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                backlogTaskList: state.backlogTaskList.map(task =>
                    task.id.toString() === action.payload.id.toString()
                        ? { task, ...action.payload }
                        : task
                ),
            };

        case UPDATE_TASK_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_TASK_BY_SPRINTID_SUCCESS:
            return {
                ...state,
                backlogTaskList: state.backlogTaskList.map(task =>
                    task.id.toString() === action.payload.id.toString()
                        ? { task, ...action.payload }
                        : task
                ),
            };

        case UPDATE_TASK_BY_SPRINTID_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                backlogTaskList: state.backlogTaskList.filter(
                    task => task.id.toString() !== action.payload.id.toString()
                ),
            };

        case DELETE_TASK_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return { ...state };
    }
};

export default Tasks;