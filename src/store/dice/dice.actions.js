export const ROLL_DICE = 'ROLL_DICE';

export function rollDice(dispatch) {
    return roll => dispatch({ type: ROLL_DICE, roll });
}