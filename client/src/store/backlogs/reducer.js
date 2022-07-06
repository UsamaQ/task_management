import {
    GET_BACKLOG_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    ADD_BACKLOG_SUCCESS,
    ADD_BACKLOG_FAIL,
    UPDATE_BACKLOG_SUCCESS,
    UPDATE_BACKLOG_FAIL,
    DELETE_BACKLOG_SUCCESS,
    DELETE_BACKLOG_FAIL,
    GET_BACKLOG_DETAIL,
    GET_BACKLOG_DETAIL_SUCCESS,
    GET_BACKLOG_DETAIL_FAIL,
    GET_ON_KEY_PRESS_BACKLOG_LIST,
    GET_BACKLOG_LIST_ON_GLOBAL_SEARCH
} from "./actionType";

const INIT_STATE = {
    backlogList: [],
    globalSearchBackolg: [],
};

const Backlogs = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_BACKLOG_LIST:
                    return {
                        ...state,
                        backlogList: action.payload.data,
                    };
                case GET_ON_KEY_PRESS_BACKLOG_LIST:
                    return {
                        ...state,
                        backlogList: action.payload.data,
                    };
                case GET_BACKLOG_LIST_ON_GLOBAL_SEARCH:
                    return {
                        ...state,
                        globalSearchBacklog: action.payload.data,
                    };

                default:
                    return { ...state };
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_BACKLOG_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_ON_KEY_PRESS_BACKLOG_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_BACKLOG_LIST_ON_GLOBAL_SEARCH:
                    return {
                        ...state,
                        error: action.payload.error,
                    };   

                default:
                    return { ...state };
            }

        case GET_BACKLOG_LIST: {
            return {
                ...state,
            };
        }

        case GET_ON_KEY_PRESS_BACKLOG_LIST: {
            return {
                ...state,
            };
        }

        case GET_BACKLOG_LIST_ON_GLOBAL_SEARCH:{
            return {
                ...state,
            };
        }

        case GET_BACKLOG_DETAIL: {
            return {
                ...state,
            };
        }

        case GET_BACKLOG_DETAIL_SUCCESS:
            return {
                ...state,
                backlogList: action.payload.data
            };

            // case GET_BACKLOG_DETAIL_SUCCESS:
            //     return {
            //         ...state,
            //         backlogList: state.backlogList.map(backlog =>
            //             backlog.id.toString() === action.payload.id.toString()
            //                 ? { backlog, ...action.payload }
            //                 : backlog
            //         ),
            //     };

        case GET_BACKLOG_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload.error,
            };

        case ADD_BACKLOG_SUCCESS:
            return {
                ...state,
                backlogList: [...state.backlogList, action.payload],
            };

        case ADD_BACKLOG_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_BACKLOG_SUCCESS:
            return {
                ...state,
                backlogList: state.backlogList.map(backlog =>
                    backlog.id.toString() === action.payload.id.toString()
                        ? { backlog, ...action.payload }
                        : backlog
                ),
            };

        case UPDATE_BACKLOG_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_BACKLOG_SUCCESS:
            return {
                ...state,
                backlogList: state.backlogList.filter(
                    backlog => backlog.id.toString() !== action.payload.id.toString()
                ),
            };

        case DELETE_BACKLOG_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return { ...state };
    }
};

export default Backlogs;