import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/Navbar/Navbar';
import RoomPanel from './components/RoomPanel/RoomPanel';
import Room from './components/Room/Room';
import UsernameDialog from './components/UsernameDialog/UsernameDialog';

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
