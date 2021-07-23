import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SimulationTab from './simulationTab';


export default function ReadingSimulation(props) {



    const [simulation, getSimulationById] = useState('');

    useEffect(() => {

        getSpecificSimulation();

    }, []);

    const getSpecificSimulation = () => {

        axios.get('http://localhost:2222/api/runs/' + props.match.params.id).then((response) => {
            const simulation = response.data; 
            getSimulationById(simulation);
        }).catch(error => console.error(`Error: ${error}`))

    }

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
                </tr>
            </thead>
            <tbody>

                <SimulationTab simulations={simulation} />
            </tbody>
        </table>
    )
}

