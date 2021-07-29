import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SimulationTab from "./simulationTab";
import httpService from "../services/remobidyc-server-services";

export default function ReadingSimulation(props) {
  const [simulation, getSimulationById] = useState("");

  useEffect(() => {
    const getSpecificSimulation = () => {
      httpService
        .getSimulation(props.match.params.id)
        .then((response) => {
          const simulation = response.data;
          getSimulationById(simulation);
        })
        .catch((error) => console.error(`Error: ${error}`));
    };
    getSpecificSimulation();
  }, [props.match.params.id]);

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
        <SimulationTab simulations={simulation} />
      </tbody>
    </table>
  );
}

ReadingSimulation.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
