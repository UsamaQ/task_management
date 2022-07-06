import {
    GET_SUBTASK_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    ADD_SUBTASK_SUCCESS,
    ADD_SUBTASK_FAIL,
    UPDATE_SUBTASK_SUCCESS,
    UPDATE_SUBTASK_FAIL,
    DELETE_SUBTASK_SUCCESS,
    DELETE_SUBTASK_FAIL,
} from "./actionType";

const INIT_STATE = {
    subTaskList: [],
};

const SubTasks = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_SUBTASK_LIST:
                    return {
                        ...state,
                        subTaskList: action.payload.data,
                    };
                default:
                    return { ...state };
            }

        case API_RESPONSE_ERROR: {
            return { 
                ...state ,
                error: action.payload.error,

            };
        }

        case GET_SUBTASK_LIST: {
            return {
                ...state,
            };
        }
        case ADD_SUBTASK_SUCCESS:
            return {
                ...state,
                subTaskList: [...state.subTaskList, action.payload],
            };

        case ADD_SUBTASK_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_SUBTASK_SUCCESS:
            return {
                ...state,
                subTaskList: state.subTaskList.map(subTask =>
                    subTask.id.toString() === action.payload.id.toString()
                        ? { subTask, ...action.payload }
                        : subTask
                ),
            };

        case UPDATE_SUBTASK_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_SUBTASK_SUCCESS:
            return {
                ...state,
                subTaskList: state.subTaskList.filter(
                    subTask => subTask.id.toString() !== action.payload.id.toString()
                ),
            };

        case DELETE_SUBTASK_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return { ...state };
    }
};

export default SubTasks;