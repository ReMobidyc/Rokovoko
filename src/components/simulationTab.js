import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SimulationTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0.0,
      token: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteSimulation = this.deleteSimulation.bind(this);
    this.updateSimulation = this.updateSimulation.bind(this);
    this.displaySimulations = this.displaySimulations.bind(this);
    this.displaySimulation = this.displaySimulation.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
    console.log("salut");
  }

  deleteSimulation(event, simulation) {
    event.preventDefault();
    alert("salut");
    console.log("salut");
    console.log(simulation);
  }

  updateSimulation(event, simulation) {
    event.preventDefault();
    console.log(simulation.id);
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
                  <form onSubmit={this.deleteSimulation.bind(this, simulation)}>
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
                  <form onSubmit={this.updateSimulation.bind(this, simulation)}>
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
                      />
                    </div>
                  </form>
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
