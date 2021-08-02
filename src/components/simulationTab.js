import React, { Component } from "react";
import PropTypes from "prop-types";
import httpService from "../services/remobidyc-server-services";
export default class SimulationTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0.0,
      token: "",
      currentSimulation: "",
      simulations: [],
    };

    // bind function to this
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteSimulation = this.deleteSimulation.bind(this);
    this.updateSimulation = this.updateSimulation.bind(this);
    this.displaySimulations = this.displaySimulations.bind(this);
    this.displaySimulation = this.displaySimulation.bind(this);
    this.setCurrentSimulation = this.setCurrentSimulation.bind(this);

    // reset SimulationTab state needed to have a rerendering after
    // parent component this.props.modifiedSimulation called
    this.baseState = this.state;
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState(this.baseState);
  }

  /*
   *  Reset all field input in our modal form
   *  after update or delete actions
   */
  resetInput() {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  setCurrentSimulation(simulation) {
    return (event) => {
      event.preventDefault();
      this.setState({ currentSimulation: simulation });
    };
  }
  deleteSimulation(event) {
    event.preventDefault();

    httpService
      .deleteSimulation(this.state.currentSimulation.id, this.state.token)
      .then((res) => {
        console.log(res.data);
        // modify in parent component the simulation
        // and reset the current component state.
        this.props.deletedSimulation(this.state.currentSimulation.id);
        this.resetState();
        this.resetInput();
      });
  }

  updateSimulation(event) {
    event.preventDefault();
    const refreshSimulation = {
      username: this.state.currentSimulation.username,
      progress: this.state.progress,
      model: this.state.currentSimulation.model,
      token: this.state.token,
    };
    httpService
      .updateSimulation(this.state.currentSimulation.id, refreshSimulation)
      .then((res) => {
        console.log(res.data);
        // modify in parent component the simulation
        // and reset the current component state.
        this.props.modifySimulation(
          this.state.currentSimulation.id,
          this.state.progress
        );
        this.resetState();
        this.resetInput();
      });
  }

  /**  Display a given simulation
   *  @param {object} simulation The simulation to display
   *  @param {Number} index      The simulation index
   *  @return A table row which contains all simulation informations.
   *
   **/
  displaySimulation(simulation, index) {
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{simulation.id}</td>
        <td>{simulation.username}</td>
        <td>{simulation.model}</td>
        <td>
          <div className="progress" style={{ height: 20 + "px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={simulation.progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: simulation.progress + "%" }}
            >
              {simulation.progress}%
            </div>
          </div>
        </td>
        <td>{simulation.state}</td>
        <td>
          <button
            type="button"
            className="btn btn-danger mx-2 btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#tokenForDeleteModal"
            onClick={this.setCurrentSimulation(simulation).bind(simulation)}
          >
            Delete
          </button>
          <div
            className="modal fade "
            id="tokenForDeleteModal"
            tabIndex="-1"
            aria-labelledby="tokenModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="tokenModalLabel">
                    Delete simulation
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.deleteSimulation}>
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label lead"
                      >
                        Token:
                      </label>
                      <input
                        name="token"
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                      >
                        Delete simulation
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-success mx-2 btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#tokenForUpdateModal"
            onClick={this.setCurrentSimulation(simulation).bind(simulation)}
          >
            Update
          </button>
          <div
            className="modal fade mx-2"
            id="tokenForUpdateModal"
            tabIndex="-1"
            aria-labelledby="tokenModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="tokenModalLabel">
                    Update simulation
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.updateSimulation}>
                    <div className="mb-3">
                      <label htmlFor="token" className="col-form-label lead">
                        Token:
                      </label>
                      <input
                        name="token"
                        type="text"
                        className="form-control"
                        id="token"
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="progress" className="col-form-label lead">
                        Progress:
                      </label>
                      <input
                        name="progress"
                        type="number"
                        className="form-control"
                        id="progress"
                        onChange={this.handleInputChange}
                        min="0"
                        max="100"
                        required
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success"
                        data-bs-dismiss="modal"
                      >
                        Update simulation
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  displaySimulations() {
    const { simulations } = this.props;

    if (simulations.length > 0) {
      return simulations.map((simulation, index) => {
        return this.displaySimulation(simulation, index);
      });
    } else {
      return this.displaySimulation(simulations, 0);
    }
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">id</th>
            <th scope="col">username</th>
            <th scope="col">model</th>
            <th scope="col">progress</th>
            <th scope="col">state</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <this.displaySimulations />
        </tbody>
      </table>
    );
  }
}

SimulationTab.propTypes = {
  simulations: PropTypes.any,
  modifySimulation: PropTypes.any,
  deletedSimulation: PropTypes.any,
};
