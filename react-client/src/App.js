import React, { Component } from 'react';
import NavBar from './components/Navbar';
import RoomPanel from './components/RoomPanel';
import Room from './components/Room';
import UsernameDialog from './components/UsernameDialog';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from './store';

class App extends Component {
  render() {
    return (
        <div style={{height: '100vh'}}>
          <UsernameDialog />
          <Router>
            <NavBar />
            <Switch>
              <Route path="/" exact component={RoomPanel} />
              <Route path="/room/:id" exact component={Room} />
              <Route component={RoomPanel} />
            </Switch>
          </Router>
        </div>
    );
  }
}

export {App, store};
