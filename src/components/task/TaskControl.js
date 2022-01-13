import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from "redux";
import Moment from "moment";
import makeDateFromMomentObj from "../../myPlugins/functions/makeDateFromMomentObj";
import { doTask, deleteTask } from "../../store/actions/taskActions";
import cleanHtml from "../../myPlugins/functions/cleanHtml";
import breakText from "../../myPlugins/functions/breakText";
import { showModal } from "../../store/actions/modalActions";

const TaskControl = (props) => {

  if(!props.firebaseAuth.uid) return <Redirect to="/"/>

  const {
    doTask
    , deleteTask
    , task
    , taskState
    , showModal
  } = props;

  // If post has been deleted successfully, redirect to /home
  if(taskState.deleteTaskSuccess) return <Redirect to="/home" />;

  return (
    <main className="nav-margin">
      <div className="container container-small mb-5">
        {
          isLoaded(task)
            ? isEmpty(task)
              ? <div className="card p-5"></div>
              : (
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title text-primary">{ task.title }</h2>  
                      <p
                        className="card-text py-3"
                        dangerouslySetInnerHTML={{__html: cleanHtml(breakText(task.content))}}
                      ></p>
                      <div className="d-flex flex-column flex-sm-row">
                        {
                          !task.doneAt
                          &&
                          (
                            <button
                              onClick={
                                () => showModal (
                                  "This project will be considered as 'Done'"
                                  , { sideFunction: doTask.bind(this, task.id), choice: true}
                                )
                              }
                              className="mb-3 mb-sm-0 btn btn-lg btn-success px-sm-5"
                            >
                              <i className="fas fa-check"></i> Mark As Done
                            </button>
                          )
                        }
                        <button
                          onClick={
                            () => showModal (
                              "You are about to delete this task(irreversible)"
                              , { sideFunction: deleteTask.bind(this, task.id), choice: true, danger: true}
                            )
                          }
                          className="btn btn-lg btn-danger ms-sm-auto px-sm-5"
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                    <div className="p-3 card-footer text-center">
                      <h6 className="mb-2 card-subtitle text-danger"><i className="fas fa-flag-checkered"></i> Deadline: { makeDateFromMomentObj(Moment(task.deadline).toObject()) }</h6>
                      { task.doneAt && <h6 className="mb-2 card-subtitle text-success"><i className="fas fa-check-circle"></i> Done: { Moment(task.doneAt.toDate()).calendar() }</h6> }
                      <h6 className="card-subtitle text-muted">created: { Moment(task.createdAt.toDate()).calendar() }</h6>
                    </div>
                  </div>
                )
            : <div className="d-block mx-auto spinner-border text-dark"></div>
        }
      </div>
    </main>
  )
}

const mapStateToProps = ({ firebase, firestore, taskState }) => ({
  firebaseAuth: firebase.auth
  , task: firestore.data.task
  , taskState
});

const mapDispatchToProps = (dispatch) => ({
  doTask: (taskId) => dispatch(doTask(taskId))
  , deleteTask: (taskId) => dispatch(deleteTask(taskId))
  , showModal: (content, params) => dispatch(showModal(content, params))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
  , firestoreConnect((props) => {
    
    const { id: taskId } = props.match.params;

    return ([
      {
        collection: "tasks"
        , doc: props.firebaseAuth.uid
        , subcollections: [
          {
            collection: "tasks"
            , doc: taskId
          }
        ]
        , storeAs: "task"
      }
    ]);
  })
)(TaskControl)