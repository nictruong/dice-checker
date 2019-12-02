import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import { Provider } from 'react-redux';
import Dice from './components/dice/dice';

import './App.css';
import 'semantic-ui-css/semantic.min.css'
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Menu>
          <Menu.Item as={ Link } name='dice' to='dice'>
            Dice
          </Menu.Item>
          <Menu.Item as={ Link } name='stats' to='stats'>
            Stats  
          </Menu.Item>
        </Menu>
        <Switch>
          <Route path="/dice">
            <Dice></Dice>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
