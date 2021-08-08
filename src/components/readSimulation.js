import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SimulationTab from "./simulationTab";
import httpService from "../services/remobidyc-server-services";
/**
 * Component to display a single simulation information,
 * This component receive a simulation ID, do a GET request to our API
 * to retrieve the simulation information and display it using the SimulationTab component.
 *
 * @param {object} props contains a simulation id
 * @returns display a Tab with the simulation information if we can retrieve it in our API
 *          a message which inform user that the simulation is not present in our API otherwise.
 */
export default function ReadingSimulation(props) {
  const [simulation, getSimulationById] = useState("");

  useEffect(() => {
    getSpecificSimulation();
  }, [props.match.params.id]);

  /**
   * Allows us to do a GET request to our API in order to retrieve simulation information.
   */
  const getSpecificSimulation = () => {
    httpService
      .getSimulation(props.match.params.id)
      .then((response) => {
        const simulation = response.data;
        getSimulationById(simulation);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        deletedSimulation(-1);
      });
  };
  /**
   * Allows us to modify the current simulation.
   * @param {number} id the simulation id
   * @param {number} progress the new progress
   */
  const modifySimulation = (id, progress) => {
    const modifiedSimulation = simulation;
    modifiedSimulation.progress = progress;
    modifiedSimulation.id = id;
    getSimulationById(modifiedSimulation);
  };
  /**
   * Allows us to remove the current simulation on front end.
   * @param {number} id the simulation id.
   */
  const deletedSimulation = (id) => {
    // if not -1 successfully deleted
    if (id !== -1) {
      getSimulationById("deleted");
    } // if -1 there no simulation with id in our API.
    else {
      getSimulationById(null);
    }
  };
  /** if simulation is not null and not deleted so we can display it with
   *  the component SimulationTab
   */
  if (simulation !== null && simulation !== "deleted") {
    return (
      <SimulationTab
        simulations={simulation}
        modifySimulation={modifySimulation}
        deletedSimulation={deletedSimulation}
      />
    );
  } else if (simulation === "deleted") {
    /** if the simulation was successfully deleted so we can display a message
     *   to inform the user
     */
    return (
      <h1>
        The simulation with id: {props.match.params.id} was successfully
        deleted.
      </h1>
    );
  } else {
    /** else id ==-1 and we got an error from our API
     *  so we can inform the user that the simulation with the specified id
     *  is not present in our API.
     */
    return <h1>There is no simulation with id: {props.match.params.id}</h1>;
  }
}

ReadingSimulation.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
