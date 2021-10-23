import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddNotebooks from "./components/add-Notebooks.component";
import Notebooks from "./components/Notebooks.component";
import NotebooksList from "./components/Notebooks-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tutorials"} className="navbar-brand">
            Neverwrote
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Notebooks
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/Notebooks"]} component={NotebooksList} />
            <Route exact path="/add" component={AddNotebooks} />
            <Route path="/Notebooks/:id" component={Notebooks} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
