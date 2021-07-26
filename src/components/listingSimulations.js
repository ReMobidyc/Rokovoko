import React, { useEffect, useState } from 'react';
import SimulationTab from './simulationTab';
import httpService from '../services/remobidyc-server-services'

export default function ListingSimulation() {



    const [simulations, getSimulations] = useState('');

    useEffect(() => {

        getAllSimulations();

    }, []);

    const getAllSimulations = () => {
        httpService.getAll().then((response) => {
            const allSimulations = response.data; 
            getSimulations(allSimulations);
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

                <SimulationTab simulations={simulations} />
            </tbody>
        </table>
    )
}

