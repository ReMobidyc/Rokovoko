import React from "react";


export default function SimulationTab(props) {

    const displaySimulations = (props) => {
        const { simulations } = props;

        if (simulations.length > 0) {

            return (
                simulations.map((simulation, index) => {

                    return (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{simulation.id}</td>
                            <td>{simulation.username}</td>
                            <td>{simulation.model}</td>
                            <td>{simulation.progress}</td>
                            <td>{simulation.state}</td>
                        </tr>
                    )
                })
            )
        }
        else {
            return (
                <tr><th scope="row">1</th>
                    <td>{simulations.id}</td>
                    <td>{simulations.username}</td>
                    <td>{simulations.model}</td>
                    <td>{simulations.progress}</td>
                    <td>{simulations.state}</td></tr>
            )
        }
    }


    return (
        <>
            {displaySimulations(props)}
        </>
    )
}
