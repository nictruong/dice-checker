import React from 'react';
import { Provider } from 'react-redux';
import Dice from './components/dice/dice';

import './App.css';
import 'semantic-ui-css/semantic.min.css'
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Dice></Dice>
    </Provider>
  );
}

export default App;
