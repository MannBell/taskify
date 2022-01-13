import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from "redux";
import TaskList from "../lists/TasksList";
import spreadObj from "../../myPlugins/functions/spreadObj";
import filterAndSortDate from "../../myPlugins/functions/filterAndSortDate";

const DoneTasks = (props) => {

  if(!props.firebaseAuth.uid) return <Redirect to="/"/>

  const firestoreTasks = props.tasks;
  const doneTasks = firestoreTasks && filterAndSortDate(spreadObj(firestoreTasks).filter((task) => task.doneAt), { sortBy: "doneAt" });

  return (
    <main className="bg-secondary nav-margin mb-5">
      <div className="container">
        <section className="card bg-dark">
          <div className="card-body">
            <h2 className="card-title text-success pb-3"><i className="fas fa-clipboard-check"></i> Done Tasks</h2>
            {/* <!-- grid --> */}
            <div className="row g-3">
              {
                isLoaded(doneTasks)
                  ? isEmpty(doneTasks)
                    ? <div className="text-light" >No Tasks Yet...</div>
                    : <TaskList tasks={ doneTasks } colClass="col-12 col-md-6 col-lg-4" />
                  : <div className="mx-auto spinner-border text-light"></div>
              }
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

const mapStateToProps = ({ firebase, firestore }) => ({
  firebaseAuth: firebase.auth
  , tasks: firestore.data.tasks
});

export default compose(
  connect(mapStateToProps)
  , firestoreConnect((props) => {
    
    return ([
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
    ]);
  })
)(DoneTasks);