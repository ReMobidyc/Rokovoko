import React from "react";
import PropTypes from "prop-types";
/**
 *
 * @param {object} props contains a Simulation informations
 * @returns rendering a page with the registered simulation informations
 */
export default function TokenPage(props) {
  return (
    <div>
      <h2>You just registered the following Simulation.</h2>
      <div>
        <p className="lead">
          Username: {props.simulationInformations.username} <br />
          Model: {props.simulationInformations.model} <br />
          Progress: {props.simulationInformations.progress} <br />
        </p>
        <div>
          <p className="lead">
            Please keep theses informations safe, you will need theses
            informations to update or delete your simulation.
          </p>
          <h1>Token : {props.simulationInformations.token}</h1>
          <h1>id : {props.simulationInformations.id}</h1>
        </div>
      </div>
    </div>
  );
}

TokenPage.propTypes = {
  simulationInformations: PropTypes.shape({
    username: PropTypes.string,
    model: PropTypes.string,
    progress: PropTypes.number,
    token: PropTypes.string,
    id: PropTypes.number,
  }),
};
