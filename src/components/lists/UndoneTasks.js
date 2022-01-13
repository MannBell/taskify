import React, { Component } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import filterAndSortDate from "../../myPlugins/functions/filterAndSortDate";
import TaskList from "../lists/TasksList";

class UndoneTasks extends Component {

  state = {
    sortBy: "createdAt"
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {

    const { sortBy } = this.state;
    const { undoneTasks } = this.props;

    return (
      <div className="col-md-6 col-lg-8">
        <section className="card bg-dark">
          <div className="card-body">
            <h2 className="card-title text-warning"><i className="fas fa-clock"></i> Undone Tasks</h2>
            <div className="input-group mb-3 d-flex justify-content-end">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="sortBy"><i className="fas fa-sort-amount-down me-2"></i>Sort By:</label>
              </div>
              <select onChange={this.handleChange} className="custom-select" id="sortBy">
                <option value="createdAt">Creation Date</option>
                <option value="deadlineAt">Deadline</option>
              </select>
            </div>
            {/* <!-- grid --> */}
            <div className="row g-3">
              {
                isLoaded(undoneTasks)
                  ? isEmpty(undoneTasks) || undoneTasks.every((task) => isEmpty(task) )
                    ? <div className="text-light" >No Tasks Yet...</div>
                    : <TaskList tasks={ filterAndSortDate(undoneTasks, { sortBy, asc: (sortBy === "deadlineAt") && true }) } colClass="col-12 col-lg-6" />
                  : <div className="mx-auto spinner-border text-light"></div>
              }
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default UndoneTasks;