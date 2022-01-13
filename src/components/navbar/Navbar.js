import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
// ACTIONS
import { signOut } from "../../store/actions/authActions";

const Navbar = (props) => {

  const { firebaseAuth, firebaseProfile, signOut } = props;

  return (
    <nav className="fixed-top navbar navbar-expand-md navbar-dark bg-dark lead">
      <div className="container">
        <Link to="/" className="navbar-brand">Taskify</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {
          firebaseAuth.uid
            ? <div id="navmenu" className="collapse navbar-collapse text-center text-md-start">
                <ul className="d-flex align-items-center justify-content-between navbar-nav text-secondary ms-auto">
                  <li className="nav-item d-md-flex">
                    <div>
                      <Link to="/home" className="lead nav-link text">
                        <i className="fas fa-home"></i> Home
                      </Link>
                    </div>
                    <div className="mx-5">
                      <Link to="/create-task" className="lead nav-link text-warning">
                      <i className="fas fa-clipboard-list"></i> New Task +
                      </Link>
                    </div>
                  </li>
                  {
                    firebaseProfile.isLoaded
                      ? firebaseProfile.isEmpty
                        ? null
                        : (
                            <li className="px-2 border border-2 border-secondary rounded nav-item d-flex align-items-center justify-content-center">
                              <div className="initials-circle text-light bg-primary rounded-circle d-flex justify-content-center align-items-center me-2">
                                {firebaseProfile.firstname[0]}{firebaseProfile.lastname[0]}
                              </div>
                              <div className="text-center">
                                <p className="lead mb-0 text-light">{firebaseProfile.firstname} {firebaseProfile.lastname}</p>
                                <button
                                  onClick={ signOut }
                                  className="btn text-primary"
                                >Sign Out <i className="fas fa-sign-out-alt"></i></button>
                              </div>
                            </li>
                          )
                      : <div className="spinner-border text-primary"></div>
                  }
                </ul>
              </div>
            : <div id="navmenu" className="collapse navbar-collapse text-center text-md-start">
                <ul className="d-flex align-items-center justify-content-between navbar-nav text-secondary ms-auto">
                  <li className="nav-item d-md-flex">
                    <Link to="/signup" className="nav-link text-primary">
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item d-flex align-items-center justify-content-center">
                    <Link to="/login" className="nav-link">
                      Log In
                    </Link>
                  </li>
                </ul>
              </div>
        }

      </div>
    </nav>
  )
}

const mapStateToProps = ({ firebase }) => ({
  firebaseAuth: firebase.auth
  , firebaseProfile: firebase.profile
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);