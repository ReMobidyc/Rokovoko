import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
class NavBar extends Component {


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

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand">
                        <img src={logo} alt='reMobidyc logo' /> reMobidycServer
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Register
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/runs/:id"} className="nav-link">
                                Tokens
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/runs"} className="nav-link">
                                Runs
                            </Link>
                        </li>
                        <form className="d-flex " onSubmit={this.handleSearchId}>
                            <div className="input-group">
                                <input type="search" value={this.state.runID}
                                    onChange={this.handleInputChange} className="form-control me-2" placeholder="Simulation id" name="runID" />
                                <div className="input-group-btn">
                                    <button className="btn btn-light" type="submit">Search</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </nav>)
    }
}

export default withRouter(NavBar);