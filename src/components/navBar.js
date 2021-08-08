import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import PropTypes from "prop-types";
/**
 * Component to display the navigation bar at top.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runID: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchId = this.handleSearchId.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  /**
   * Allows us to handle when user click on the search button.
   * @param {object} event to redirect user to the good url after search button click.
   */
  handleSearchId(event) {
    event.preventDefault();
    this.props.history.push("/runs/" + this.state.runID);
  }
  /**
   *
   * @returns the navigation bar html code.
   */
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">
            <img src={logo} alt="reMobidyc logo" /> reMobidycServer
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="navbar-nav ml-auto collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/runs"} className="nav-link">
                  Runs
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/myTokens"} className="nav-link">
                  my Tokens
                </Link>
              </li>
            </ul>
            <form className="d-flex " onSubmit={this.handleSearchId}>
              <div className="input-group">
                <input
                  type="number"
                  value={this.state.runID}
                  onChange={this.handleInputChange}
                  className="form-control me-2"
                  placeholder="Simulation id"
                  name="runID"
                />
                <div className="input-group-btn">
                  <button className="btn btn-light" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
NavBar.propTypes = {
  history: PropTypes.any,
};
