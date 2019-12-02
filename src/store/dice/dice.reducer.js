import { ROLL_DICE } from "./dice.actions";

const initialState = {
    rolls: [],
};

function diceReducer(state = initialState, action) {
    switch (action.type) {
        case ROLL_DICE: {
            return {
                ...state,
                rolls: [...state.rolls, action.roll],
            };
        }
        default: {
            return state;
        }
    }
};

export default diceReducer;