import {
    GET_ALL_LABEL,
    GET_LABEL_LIST_BY_TASK,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    ADD_LABEL_SUCCESS,
    ADD_LABEL_FAIL,
    UPDATE_LABEL_SUCCESS,
    UPDATE_LABEL_FAIL,
    DELETE_LABEL_SUCCESS,
    DELETE_LABEL_FAIL,
    GET_LABEL_LIST_BY_TASK_FOR_DETAILS,
} from "./actionType";

const INIT_STATE = {
    labelList: [],
    labelListByTask: [],
    labelListByTaskForDetail: [],
};

const Labels = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_ALL_LABEL:
                    return {
                        ...state,
                        labelList: action.payload.data,
                    };
                case GET_LABEL_LIST_BY_TASK:
                    return {
                        ...state,
                        labelListByTask: action.payload.data,
                    };
                case GET_LABEL_LIST_BY_TASK_FOR_DETAILS:
                    return {
                        ...state,
                        labelListByTaskForDetail: action.payload.data,
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

        case GET_ALL_LABEL: {
            return {
                ...state,
            };
        }

        case GET_LABEL_LIST_BY_TASK: {
            return {
                ...state,
            };
        }

        case GET_LABEL_LIST_BY_TASK_FOR_DETAILS: {
            return {
                ...state,
            };
        }

        case ADD_LABEL_SUCCESS:
            return {
                ...state,
                labelList: [...state.labelList, action.payload],
            };

        case ADD_LABEL_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_LABEL_SUCCESS:
            return {
                ...state,
                labelList: state.labelList.map(label =>
                    label.id.toString() === action.payload.id.toString()
                        ? { label, ...action.payload }
                        : label
                ),
            };

        case UPDATE_LABEL_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_LABEL_SUCCESS:
            return {
                ...state,
                labelList: state.labelList.filter(
                    label => label.id.toString() !== action.payload.id.toString()
                ),
            };

        case DELETE_LABEL_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return { ...state };
    }
};

export default Labels;