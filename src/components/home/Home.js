import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from "redux";
import spreadObj from "../../myPlugins/functions/spreadObj";
import filterAndSortDate from "../../myPlugins/functions/filterAndSortDate";
import UndoneTasks from '../lists/UndoneTasks';
import LastDoneTasks from '../lists/LastDoneTasks';

const Home = (props) => {

  if(!props.firebaseAuth.uid) return <Redirect to="/"/>
  
  // To reset createTaskSuccess to false, after the creation of a Task
  const { taskState, resetTaskCreateStatus, resetTaskDeleteStatus } = props;
  if(taskState.createTaskSuccess) resetTaskCreateStatus();
  if(taskState.deleteTaskSuccess) resetTaskDeleteStatus();

  const firestoreTasks = props.tasks;

  const lastDoneTasks = firestoreTasks && filterAndSortDate(spreadObj(firestoreTasks).filter((task) => task.doneAt), { sortBy: "doneAt" }).slice(0, 3);
  const undoneTasks = firestoreTasks && spreadObj(firestoreTasks).filter((task) => !task.doneAt);

  return (
    <main className="nav-margin bg-secondary mb-5">
      <div className="container">
        <div className="row gy-5 justify-content-evenly pt-3">
          {/* <!-- left --> */}
          <LastDoneTasks lastDoneTasks={ lastDoneTasks } />
          {/* <!-- right --> */}
          <UndoneTasks undoneTasks={ undoneTasks } />
        </div>
      </div>
    </main>
  )
}

const mapStateToProps = ({ firebase, firestore, taskState }) => ({
  firebaseAuth: firebase.auth
  , taskState
  , tasks: firestore.data.tasks
});

const mapDispatchToProps = (dispatch) => ({
  resetTaskCreateStatus: () => dispatch({ type: "CREATE_TASK_STATUS_RESET" })
  , resetTaskDeleteStatus: () => dispatch({ type: "DELETE_TASK_STATUS_RESET" })
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
  , firestoreConnect((props) => {
    // check "uid" to prevent error
    return props.firebaseAuth.uid
      ? ([
          {
            collection: "tasks"
            , doc: props.firebaseAuth.uid
            , subcollections: [
              {
                collection: "tasks"
              }
            ]
            , storeAs: "tasks"
          }
        ])
      : []
  })
)(Home);