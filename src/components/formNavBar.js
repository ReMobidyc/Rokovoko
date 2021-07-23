import React, { Component } from "react"
import { withRouter } from 'react-router-dom'

class FormNavBar extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            runID: 0
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearchId = this.handleSearchId.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSearchId(event) {
        event.preventDefault();
        this.props.history.push("/runs/" + this.state.runID); 
    }

    render() {

        return (<form className="navbar-form navbar-left" onSubmit={this.handleSearchId}>
            <div className="input-group">
                <input type="number" value={this.state.runID}
                    onChange={this.handleInputChange} className="form-control" placeholder="Simulation id" name="runID" />
                <div className="input-group-btn">
                    <button className="btn btn-light" type="submit">Search</button>
                </div>
            </div>
        </form>)
    }
}

export default withRouter(FormNavBar); 