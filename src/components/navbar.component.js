import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link
            to="/"
            className="navbar-brand font-weight-bold font-italic"
            style={{ fontSize: 30 + "px" }}
          >
            MovieStop
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
    
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="nav navbar-nav ml-auto">
            <li className="navbar-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}