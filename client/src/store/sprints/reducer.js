import {
    GET_SPRINT_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    ADD_SPRINT_SUCCESS,
    ADD_SPRINT_FAIL,
    UPDATE_SPRINT_SUCCESS,
    UPDATE_SPRINT_FAIL,
    DELETE_SPRINT_SUCCESS,
    DELETE_SPRINT_FAIL,
    GET_SPRINT_DETAIL,
    GET_SPRINT_DETAIL_SUCCESS,
    GET_SPRINT_DETAIL_FAIL,
} from "./actionType";

const INIT_STATE = {
    sprintList: [],
};

const Sprints = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_SPRINT_LIST:
                    return {
                        ...state,
                        sprintList: action.payload.data,
                    };

                default:
                    return { ...state };
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_SPRINT_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                default:
                    return { ...state };
            }

        case GET_SPRINT_LIST: {
            return {
                ...state,
            };
        }

        case GET_SPRINT_DETAIL: {
            return {
                ...state,
            };
        }

        case GET_SPRINT_DETAIL_SUCCESS:
            return {
                ...state,
                sprintList: state.sprintList.map(sprint =>
                    sprint.id.toString() === action.payload.id.toString()
                        ? { sprint, ...action.payload }
                        : sprint
                ),
            };

        case GET_SPRINT_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case ADD_SPRINT_SUCCESS:
            return {
                ...state,
                sprintList: [...state.sprintList, action.payload],
            };

        case ADD_SPRINT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_SPRINT_SUCCESS:
            return {
                ...state,
                sprintList: state.sprintList.map(sprint =>
                    sprint.id.toString() === action.payload.id.toString()
                        ? { sprint, ...action.payload }
                        : sprint
                ),
            };

        case UPDATE_SPRINT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_SPRINT_SUCCESS:
            return {
                ...state,
                sprintList: state.sprintList.filter(
                    sprint => sprint.id.toString() !== action.payload.id.toString()
                ),
            };

        case DELETE_SPRINT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return { ...state };
    }
};

export default Sprints;