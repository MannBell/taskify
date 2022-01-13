import React from 'react';
import { Link } from "react-router-dom";
import { isLoaded, isEmpty } from 'react-redux-firebase';
import TaskList from "../lists/TasksList";

const LastDoneTasks = (props) => {

  const {
    lastDoneTasks
  } = props;

  return (
    <div className="col-md-6 col-lg-4">
      <section className="card bg-dark">
        <div className="card-body">
          <h2 className="card-title text-success pb-3"><i className="fas fa-clipboard-check"></i> Last Done Tasks</h2>
          <div className="row g-3">
            {
              isLoaded(lastDoneTasks)
                ? isEmpty(lastDoneTasks)
                  ? <div className="text-light">No Done Tasks Yet...</div>
                  : <TaskList tasks={ lastDoneTasks } colClass="col-12" />
                : <div className="mx-auto spinner-border text-light"></div>
            }
          </div>
          {
            isLoaded(lastDoneTasks)
              ? isEmpty(lastDoneTasks)
                ? null
                : (lastDoneTasks.length > 3) && (
                    <Link
                      to="/done-tasks"
                      className="text-center d-block mt-3 text-warning"
                    >All Done Tasks</Link>
                  )
              : null 
          }
        </div>
      </section>
    </div>
  )
}

export default LastDoneTasks;