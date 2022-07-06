import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
} from "./actionTypes";

const initialState = {
  error: null,
  loading: false,
};

const Login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        error: null,
        loading: false,
      };
      break;
    case LOGOUT_USER:
      state = { 
        ...state, 
        error: null,
        isUserLogout: false,
        
      };
      break;
      case LOGOUT_USER_SUCCESS:
        state = { 
          ...state, 
          error: null,
          isUserLogout: true,
      };
      break;
    case API_ERROR:
      state = {
        ...state,
        error: action.payload,
        loading: false,
        isUserLogout: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Login;
