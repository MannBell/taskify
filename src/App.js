import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import ScrollToTop from "./ex_plugins/components/ScrollToTop";
// components
import Navbar from "./components/navbar/Navbar";
import Welcome from "./components/home/Welcome";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import DoneTasks from "./components/lists/DoneTasks";
import TaskControl from "./components/task/TaskControl";
import CreateTask from "./components/task/CreateTask";
import Modal from "./components/special/Modal";
import NotFound from "./components/special/NotFound";

const App = () => {
  return (
    <HashRouter>
      <div>
        <Navbar/>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={ Welcome } />
            <Route path="/signup" component={ SignUp } />
            <Route path="/login" component={ Login } />
            <Route path="/home" component={ Home } />
            <Route path="/done-tasks" component={ DoneTasks } />
            <Route path="/task/:id" component={ TaskControl } />
            <Route path="/create-task" component={ CreateTask } />
            {/* Below is to handle 404 requests */}
            <Route component={ NotFound } />
          </Switch>
        </ScrollToTop>
        <Modal/>
      </div>
    </HashRouter>
  )
}

export default App;