import React, { Component, createRef } from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
// // COMPONENTS
import WelcomeCard from "../cards/WelcomeCard";
// // CONSTANTS
import { heroImg } from "../../myPlugins/constants/links";
import { cards } from "../../myPlugins/constants/welcomeCards";
import Typed from "typed.js";

class Welcome extends Component {

  componentDidMount() {
    const options = {
      strings: [
        "Accomplish Your Goals"
        , "Do Things In A Tidier Way"
        , "A Unique Way To Manage Your Tasks"
      ]
      , typeSpeed: 40
      , backSpeed: 40
    }
    // make sure `this.typedEl` is not `undefined`
    this.typed = this.typedEl && new Typed(this.typedEl, options);
  }

  render() {
    if(this.props.firebaseAuth.uid) return <Redirect to="/home"/>

    return (
      <main className="my-5">
        {/* <!-- Showcase --> */}
        <section
          className="py-5 p-sm-5 text-light"
          style={{background: "linear-gradient(to top, var(--bs-primary), var(--bs-secondary))"}}
        >
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-md mb-5 mb-md-0 mx-auto mx-md-0 w-50 w-sm-75">
                <img src={ heroImg } alt="" className="img-fluid" />
              </div>
              <div className="col-md text-center text-md-start">
                <h1 className="hero-text">
                  <span ref={ (el) => { this.typedEl = el; } }></span>
                </h1>
                <Link to="/signup" className="btn btn-lg btn-dark">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- About --> */}
        <section id="about" className="py-5 p-sm-5 bg-dark">
          <div className="container">
            <div className="row gy-5 g-sm-5">
              {
                cards.map((card, i) => {
                  return (
                    <WelcomeCard
                      key={i}
                      title={card.title}
                      content={card.content}
                      icon={card.icon}
                    />
                  );
                })
              }
            </div>
          </div>
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  firebaseAuth: state.firebase.auth
});

export default connect(mapStateToProps)(Welcome);