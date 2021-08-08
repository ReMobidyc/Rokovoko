import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle";
import Register from "./components/register";
import ListingSimulation from "./components/listingSimulations";
import IndexPage from "./components/indexPage";
import NavBar from "./components/navBar";
import ReadingSimulation from "./components/readSimulation";
import UserTokens from "./components/userTokensPage";
import Footer from "./components/footer";
class App extends Component {
  render() {
    return (
      <div className="d-flex flex-column min-vh-100">
        <header>
          <NavBar />
        </header>
        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/runs" component={ListingSimulation} />
            <Route exact path="/runs/:id" component={ReadingSimulation} />
            <Route exact path="/myTokens" component={UserTokens} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
