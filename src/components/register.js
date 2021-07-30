import React, { Component } from "react";
import httpService from "../services/remobidyc-server-services";
import TokenPage from "./tokenPage";
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
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.Display = this.Display.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleRegistration(event) {
    event.preventDefault();

    const simulation = {
      username: this.state.username,
      model: this.state.model,
      progress: this.state.progress,
    };

    httpService.createSimulation(simulation).then((res) => {
      this.setState({ token: res.data.token, id: res.data.id });
    });
  }
  Display() {
    if (this.state.token === "") {
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
              <button type="submit" className="btn btn-primary mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      );
    } else {
      const simulationInformations = {
        id: this.state.id,
        token: this.state.token,
        username: this.state.username,
        progress: this.state.progress,
        model: this.state.model,
      };
      /*
      to create another page cons: if user try to access /token => bug
      this.props.history.push({
        pathname: "/token",
        state: simulationInformations,
      });
      return null;*/

      /* to use the same page  */
      return <TokenPage simulationInformations={simulationInformations} />;
    }
  }
  render() {
    return <this.Display />;
  }
}

export default Register;
