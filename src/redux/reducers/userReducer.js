import {
  FETCH_USER_LOGIN,
  USER_LOGOUT,
  FETCH_USER_LOGIN_SUCCESS,
  FETCH_USER_LOGIN_FAILURE,
  REFRESH,
} from "../actions/userActions";

const INITIAL_STATE = {
  account: {
    email: "",
    token: "",
  },
  isLogging: false,
  auth: null,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        isLogging: true,
      };
    case FETCH_USER_LOGIN_SUCCESS:
      localStorage.setItem("token", action.data.token);
      localStorage.setItem("email", action.data.email);
      return {
        ...state,
        account: {
          email: action.data.email,
          token: action.data.token,
        },
        isLogging: false,
        auth: true,
      };
    case FETCH_USER_LOGIN_FAILURE:
      return {
        ...state,
        account: {
          email: "",
          token: "",
        },
        isLogging: false,
        auth: false,
      };
    case REFRESH:
      return {
        ...state,
        account: {
          email: action.data.email || "",
          token: action.data.token || "",
        },
        isLogging: false,
        auth: true,
      };
    case USER_LOGOUT:
      return {
        ...state,
        account: {
          email: "",
          token: "",
        },
        isLogging: false,
        auth: false,
      };
    default:
      return state;
  }
};

export default userReducer;
