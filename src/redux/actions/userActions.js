
import { loginApi } from "../../services/UserService";

export const USER_LOGIN = "USER_LOGIN";
export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const FETCH_USER_LOGIN_FAILURE = "FETCH_USER_LOGIN_FAILURE";
export const USER_LOGOUT = "USER_LOGOUT";
export const REFRESH = "REFRESH";

export const handleLoginRedux = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_LOGIN });
    let res = await loginApi(email, password);
    if (res && res.token) {
      dispatch({
        type: FETCH_USER_LOGIN_SUCCESS,
        data: { email: email, token: res.token },
      });
    } else {
      dispatch({
        type: FETCH_USER_LOGIN_FAILURE,
        data:null
      });
    }
  };
};
export const handleRefresh = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: REFRESH,
      data: { email: localStorage.getItem("email"), token: localStorage.getItem("token") },
    });
  };
}
export const handleUserLogout = () => {
    return async (dispatch, getState) => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        dispatch({
        type: USER_LOGOUT,
        data: null,
        });
    };
    }

