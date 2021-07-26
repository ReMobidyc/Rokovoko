import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/register";
import ListingSimulation from "./components/listingSimulations"

import FormNavBar from "./components/formNavBar";
import ReadingSimulation from "./components/readSimulation";
import Footer from "./components/footer";
class App extends Component {
  render() {
    return (<div className="d-flex flex-column min-vh-100">
      <header>
        <FormNavBar/>
      </header>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/runs" component={ListingSimulation} />
          <Route exact path='/runs/:id' component={ReadingSimulation}/>
        </Switch>
      </div>
      <Footer/>
    </div>

    )

  }
}

export default App;