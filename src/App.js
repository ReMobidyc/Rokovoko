import React, { Component } from "react";
import { Link, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/register";
import ListingSimulation from "./components/listingSimulations"
import logo from './images/logo.png'
import FormNavBar from "./components/formNavBar";
import ReadingSimulation from "./components/readSimulation";
class App extends Component {
  render() {
    return (<div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
          <FormNavBar/>
        </div>

      </nav>


      <div className="container mt-3">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/runs" component={ListingSimulation} />
          <Route exact path='/runs/:id' component={ReadingSimulation}/>
        </Switch>
      </div>

    </div>

    )

  }
}

export default App;