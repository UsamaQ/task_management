import {
    GET_USER_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    GET_USER_DETAIL,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_FAIL,
} from "./actionType";

const INIT_STATE = {
    userList: [],
};

const Users = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_USER_LIST:
                    return {
                        ...state,
                        userList: action.payload.data,
                    };

                default:
                    return { ...state };
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_USER_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                default:
                    return { ...state };
            }

        case GET_USER_LIST: {
            return {
                ...state,
            };
        }

        case GET_USER_DETAIL: {
            return {
                ...state,
            };
        }

        case GET_USER_DETAIL_SUCCESS:
            return {
                ...state,
                userList: action.payload.data
            };

        case GET_USER_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload.error,
            };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                userList: state.userList.map(user =>
                    user.id.toString() === action.payload.id.toString()
                        ? { user, ...action.payload }
                        : user
                ),
            };

        case UPDATE_USER_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return { ...state };
    }
};

export default Users;