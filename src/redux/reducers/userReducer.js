import { USER_LOGIN, USER_LOGOUT } from "../actions/userActions";

const INITIAL_STATE = {
    account: {
        email : "",
        auth : false,
    },

}
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                account: {
                    email : action.payload.email,
                    auth : true,
                }
            };
        case USER_LOGOUT:
            return {
                ...state,
                account: {
                    email : "",
                    auth : false,
                },
            };
        default:
            return state;
    }
}

export default userReducer;