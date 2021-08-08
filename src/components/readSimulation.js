import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SimulationTab from "./simulationTab";
import httpService from "../services/remobidyc-server-services";

export default function ReadingSimulation(props) {
  const [simulation, getSimulationById] = useState("");

  useEffect(() => {
    getSpecificSimulation();
  }, [props.match.params.id]);

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

  const modifySimulation = (id, progress) => {
    const modifiedSimulation = simulation;
    modifiedSimulation.progress = progress;
    modifiedSimulation.id = id;
    getSimulationById(modifiedSimulation);
  };

  const deletedSimulation = (id) => {
    // if not -1 successfully deleted
    if (id !== -1) {
      getSimulationById("deleted");
    } // if -1 there no simulation with id in our API.
    else {
      getSimulationById(null);
    }
  };

  if (simulation !== null && simulation !== "deleted") {
    return (
      <SimulationTab
        simulations={simulation}
        modifySimulation={modifySimulation}
        deletedSimulation={deletedSimulation}
      />
    );
  } else if (simulation === "deleted") {
    return (
      <h1>
        The simulation with id: {props.match.params.id} was successfully
        deleted.
      </h1>
    );
  } else {
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
