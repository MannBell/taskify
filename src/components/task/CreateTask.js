import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { createTask } from "../../store/actions/taskActions";
import Moment from 'moment';

class CreateTask extends Component {
  
  state = {
    task: {
      id: uuidv4()
      , deadline: null
      , title: ""
      , content: ""
    }
    , loading: false
  }

  handleChange = (e) => {
    this.state.loading && this.setState({ loading: false });
    const { id, value } = e.target;
    this.setState((state) => ({
      task: { ...state.task, [id]: value } 
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { task }=this.state;
    const { createTask, clearError }=this.props;
    clearError("CLEAR_CREATE_TASK_ERROR");
    createTask({...task, deadlineAt: Moment(task.deadline)._d});
    this.setState({ loading: true });
  }

  render() {

    if(!this.props.firebaseAuth.uid) return <Redirect to="/"/>

    const { taskState } = this.props;
    // If post has been created successfully, redirect to /home
    if(taskState.createTaskSuccess) return <Redirect to="/home" />;

    return (
      <div className="nav-margin p-sm-5 mb-5">
        <div className="container container-small">
          <form onSubmit={ this.handleSubmit } className="card form">
            <div className="card-body">
              <h1 className="text-primary card-title pb-5">Create a New Task</h1>
              {/* <!-- Deadline --> */}
              <label className="text-primary form-label lead" htmlFor="deadline">Deadline:</label>
              <input required onChange={ this.handleChange } className="mb-3 form-control" type="date" id="deadline"/>
              {/* <!-- Title --> */}
              <label className="text-primary form-label lead" htmlFor="title">Title:</label>
              <input required onChange={ this.handleChange } className="mb-3 form-control" type="text" id="title"/>
              {/* <!-- Content --> */}
              <label className="text-primary form-label lead" htmlFor="content">Task Content:</label>
              <textarea required onChange={ this.handleChange } className="mb-3 form-control" id="content"></textarea>
              <div className="d-flex">
                <button className="ms-auto my-3 btn-lg btn btn-primary px-sm-5" type="submit">
                  Create
                  {
                    this.state.loading && !taskState.createTaskErr
                    &&
                    <span className="ms-2">
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="sr-only">Loading...</span>
                    </span>
                  }
                </button>
              </div>
              { taskState.createTaskErr && <p className="text-danger text-center">{taskState.createTaskErr}</p> }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { taskState, firebase } = state;
  
  return ({
    taskState
    , firebaseAuth: firebase.auth
  });
}

const mapDispatchToProps = (dispatch) => ({
  createTask: (task) => dispatch(createTask(task))
  , resetcreateTaskStatus: () => dispatch({ type: "CREATE_TASK_STATUS_RESET" })
  , clearError: (type) => dispatch({ type })
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);