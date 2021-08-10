import React, { useEffect, useState } from "react";
import SimulationTab from "./simulationTab";
import ApiErrConnection from "./apiErrConnection";
import httpService from "../services/remobidyc-server-services";
/**
 * Component to display all simulations informations after
 * a GET command on our API.
 * @returns display all simulations informations using the SimulationTab component
 */
export default function ListingSimulation() {
  const [simulations, getSimulations] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);
  useEffect(() => {
    getAllSimulations();
  }, []);

  /**
   * Allows us to get all simulations informations present in our API.
   * we store it using hook into the simulations variable.
   */
  const getAllSimulations = () => {
    httpService
      .getAll()
      .then((response) => {
        const allSimulations = response.data;
        getSimulations(allSimulations);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          console.log(err.response);
          setErrorStatus(err.response);
        } else if (err.request) {
          console.log(err.request);
          setErrorStatus(err.request);
        } else {
          console.error(`Error: ${err}`);
        }
      });
  };
  /**
   * Allows us to modify a specific simulation in the simulations array variable.
   * @param {number} id the simulation id
   * @param {number} progress the new progress
   */
  const modifySimulation = (id, progress) => {
    const allSimulationsCopy = [...simulations];

    const simulationIndex = allSimulationsCopy.findIndex(
      (element) => element.id == id
    );

    allSimulationsCopy[simulationIndex] = {
      ...allSimulationsCopy[simulationIndex],
      progress: progress,
    };

    getSimulations(allSimulationsCopy);
  };
  /**
   * Allows us to delete a specific simulation in the simulations array variable.
   * @param {number} id the simulation id.
   */
  const deletedSimulation = (id) => {
    if (simulations.length !== 1) {
      const allSimulationsCopy = [...simulations];
      const simulationIndex = allSimulationsCopy.findIndex(
        (element) => element.id == id
      );

      allSimulationsCopy.splice(simulationIndex, 1);

      getSimulations(allSimulationsCopy);
    } else {
      getSimulations(null);
    }
  };

  if (loading) {
    /**
     * if we are waiting for the axios GET command, display a loading message
     */
    return <h1>Loading</h1>;
  } else if (simulations !== null && simulations.length > 0) {
    /** If simulations is not null (use when we delete the last element in our array with the delete method)
     *  or if the simulations is not empty, display all simulations informations using the SimulationTab component
     */
    return (
      <SimulationTab
        simulations={simulations}
        modifySimulation={modifySimulation}
        deletedSimulation={deletedSimulation}
      />
    );
  } else if (errorStatus !== null) {
    return <ApiErrConnection />;
  } else {
    /**
     * If simulations === null or simulations is empty so, display the following message.
     */
    return <h1>There is no simulation</h1>;
  }
}
