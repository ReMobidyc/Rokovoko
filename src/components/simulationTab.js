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
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteSimulation = this.deleteSimulation.bind(this);
    this.updateSimulation = this.updateSimulation.bind(this);
    this.displaySimulations = this.displaySimulations.bind(this);
    this.displaySimulation = this.displaySimulation.bind(this);
    this.setCurrentSimulation = this.setCurrentSimulation.bind(this);
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
    console.log(event);
    console.log(this.state.currentSimulation);
    httpService
      .deleteSimulation(this.state.currentSimulation.id, this.state.token)
      .then((res) => {
        console.log(res.data);
      });
  }

  updateSimulation(event) {
    event.preventDefault();
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
        <td>{simulation.progress}</td>
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
                      <button type="submit" className="btn btn-danger">
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
                      <button type="submit" className="btn btn-success">
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
    return <>{this.displaySimulations()}</>;
  }
}

SimulationTab.propTypes = {
  simulations: PropTypes.any,
};
