import { createStore, combineReducers } from 'redux';
import diceReducer from './dice/dice.reducer';

const rootReducer = combineReducers({
    dice: diceReducer,
});

const store = createStore(rootReducer);

export default store;