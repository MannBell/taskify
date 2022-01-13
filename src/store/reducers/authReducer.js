// FUNCTIONS
import stripFB from "../../myPlugins/functions/stripFB";

const initState = {
  loginErr: ""
  , signUpErr: ""
};

const authReducer = (state=initState, action) => {
  switch(action.type) {
    case "LOGIN_SUCCESS"
    : return ({ ...state, loginErr: "" });
    case "LOGIN_ERROR"
    : return ({ ...state, loginErr: stripFB(action.err.message) });
    case "CLEAR_LOGIN_ERROR"
    : return ({ ...state, loginErr: "" });
    case "SIGN_UP_SUCCESS"
    : return ({ ...state, signUpErr: "" });
    case "SIGN_UP_ERROR"
    : return ({ ...state, signUpErr: stripFB(action.err.message) });
    case "CLEAR_SIGN_UP_ERROR"
    : return ({ ...state, signUpErr: "" });
    case "SIGN_OUT_SUCCESS"
    : { window.location.reload(); return state; }
    default
    : return state;
  }
}

export default authReducer;