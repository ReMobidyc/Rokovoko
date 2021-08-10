import React, { Component } from "react";
import httpService from "../services/remobidyc-server-services";
import TokenPage from "./tokenPage";
import ApiErrConnection from "./apiErrConnection";
/**
 * Component to allow user to register a Simulation into our API.
 */
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      model: "",
      host: "",
      progress: 0.0,
      token: "",
      id: "",
      errorStatus: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.resetState = this.resetState.bind(this);
    this.Display = this.Display.bind(this);
    // save initial state
    this.basicState = this.state;
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
   * Handle when user click on the register button.
   * @param {object} event occur when user click on register button.
   */
  handleRegistration(event) {
    event.preventDefault();

    const simulation = {
      username: this.state.username,
      model: this.state.model,
      progress: this.state.progress,
    };

    httpService
      .createSimulation(simulation)
      .then((res) => {
        this.setState({ token: res.data.token, id: res.data.id });

        let tokenAlreadySaved =
          localStorage.getItem("token") === null
            ? []
            : JSON.parse(localStorage.getItem("token"));
        tokenAlreadySaved.push({ id: res.data.id, token: res.data.token });

        localStorage.setItem("token", JSON.stringify(tokenAlreadySaved));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
          this.setState({ errorStatus: err.response });
        } else if (err.request) {
          console.log(err.request);
          this.setState({ errorStatus: err.request });
        } else {
          console.log(err);
        }
      });
  }
  /**
   * Allows us to reset the component state.
   */
  resetState() {
    this.setState(this.basicState);
  }
  /**
   * Display the /register page content
   * @returns display the registered simulation informations if user just registered a simulation,
   *          otherwise display the form which allows user to register a simulation.
   */
  Display() {
    if (this.state.token) {
      const simulationInformations = {
        id: this.state.id,
        token: this.state.token,
        username: this.state.username,
        progress: this.state.progress,
        model: this.state.model,
      };
      /* to use the same page  */
      return (
        <div>
          <TokenPage simulationInformations={simulationInformations} />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.resetState}
          >
            Add new simulation
          </button>
        </div>
      );
    } else if (this.state.errorStatus) {
      return (
        <div>
          <ApiErrConnection />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.resetState}
          >
            Add new simulation
          </button>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-md-7 col-md-push-5">
            <section className="py-5 text-center container">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light"> Registration Form</h1>
                <p className="lead text-muted">
                  By filling the following form, you can register a Simulation,
                  in our system.
                </p>
              </div>
            </section>
          </div>
          <div className="col-md-4 col-md-pull-7">
            <form onSubmit={this.handleRegistration}>
              <div className="form-group">
                <label className="lead">
                  Username
                  <input
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    className="form-control"
                    required
                  />
                </label>
              </div>
              <br />
              <div className="form-group ">
                <label className="lead">
                  Model
                  <input
                    name="model"
                    type="text"
                    value={this.state.model}
                    onChange={this.handleInputChange}
                    className="form-control"
                    required
                  />
                </label>
              </div>
              <br />
              <div className="form-group">
                <label className="lead">
                  Host
                  <input
                    name="host"
                    type="text"
                    value={this.state.host}
                    onChange={this.handleInputChange}
                    className="form-control"
                    required
                  />
                </label>
              </div>
              <br />
              <div className="form-group">
                <label className="lead">
                  Progress
                  <input
                    name="progress"
                    type="number"
                    value={this.state.progress}
                    onChange={this.handleInputChange}
                    className="form-control"
                    min="0"
                    max="100"
                    required
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-submit mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      );
    }
  }

  render() {
    return <this.Display />;
  }
}

export default Register;
