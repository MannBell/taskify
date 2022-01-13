import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";
import taskReducer from "./taskReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  auth: authReducer
  , taskState: taskReducer
  , modal: modalReducer
  , firebase: firebaseReducer
  , firestore: firestoreReducer
});

export default rootReducer;