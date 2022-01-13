// FUNCTIONS
import stripFB from "../../myPlugins/functions/stripFB";

const initState = {
  createTaskSuccess: false
  , createTaskErr: ""
  , deleteTaskSuccess: false
};

const authReducer = (state=initState, action) => {
  switch(action.type) {
    case "CREATE_TASK_STATUS_RESET"
    : {
      return ({ ...state, createTaskSuccess: false });
    }
    case "CREATE_TASK_SUCCESS"
    : {
      return ({ ...state, createTaskSuccess: true, createTaskErr: "" });
    }
    case "CREATE_TASK_ERROR"
    : {
      return ({ ...state, createTaskErr: stripFB(action.err.message) });
    }
    case "CLEAR_CREATE_TASK_ERROR"
    : {
      return ({ ...state, createTaskErr: "" });
    }
    case "DELETE_TASK_STATUS_RESET"
    : {
      return ({ ...state, deleteTaskSuccess: false });
    }
    case "DELETE_TASK_SUCCESS"
    : {
      return ({ ...state, deleteTaskSuccess: true });
    }
    case "DO_TASK_SUCCESS"
    : {
      return state;
    }
    default
    : return state;
  }
}

export default authReducer;