import React, { Component } from "react";
import httpService from "../services/remobidyc-server-services";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            model: '',
            progress: 0.0,
            token:''
        }; 

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this); 
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleRegistration(event) {
        event.preventDefault(); 
        
        const simulation = {
            username: this.state.username,
            model: this.state.model,
            progress: this.state.progress

        };

        httpService.createSimulation(simulation).then(res => {this.setState({token:res.data.token})});
    }

    render() {
        return (

            <form onSubmit={this.handleRegistration}>
                <div className="form-group">
                    <label>
                        Username:
                        <input
                            name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            className="form-control" 
                            required/>
                    </label>
                </div>
                <br />
                <div className="form-group">
                    <label>
                        Model:
                        <input
                            name="model"
                            type="text"
                            value={this.state.model}
                            onChange={this.handleInputChange}
                            className="form-control"
                            required
                        />
                    </label>
                </div>
                <br />
                <div className="form-group">
                    <label>
                        Progress:
                        <input
                            name="progress"
                            type="number"
                            value={this.state.progress}
                            onChange={this.handleInputChange}
                            className="form-control"
                            step="0.1"
                            required
                        />
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default Register;