import React, { useEffect, useState } from "react";
import SimulationTab from "./simulationTab";
import httpService from "../services/remobidyc-server-services";

export default function ListingSimulation() {
  const [simulations, getSimulations] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllSimulations();
  }, []);

  const getAllSimulations = () => {
    httpService
      .getAll()
      .then((response) => {
        const allSimulations = response.data;
        getSimulations(allSimulations);
        setLoading(false);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

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

  const deletedSimulation = (id) => {
    const allSimulationsCopy = [...simulations];
    const simulationIndex = allSimulationsCopy.findIndex(
      (element) => element.id == id
    );

    allSimulationsCopy.splice(simulationIndex, 1);

    getSimulations(allSimulationsCopy);
  };

  if (loading) {
    return <h1>Loading</h1>;
  } else if (simulations.length > 0) {
    return (
      <SimulationTab
        simulations={simulations}
        modifySimulation={modifySimulation}
        deletedSimulation={deletedSimulation}
      />
    );
  } else {
    return <h1>There is no simulation</h1>;
  }
}
