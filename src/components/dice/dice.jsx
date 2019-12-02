import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Segment, Header, Button } from 'semantic-ui-react';
import { rollDice } from '../../store/dice/dice.actions';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
// import Gauge from 'react-svg-gauge';

const data = {
    labels: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
        {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ["#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", ],
        }
    ]
}

const Dice = ({
    diceState,
    action_rollDice,
}) => {
    const [result, setResult] = useState(undefined);
    const [firstDie, setFirstDie] = useState(0);
    const [secondDie, setSecondDie] = useState(0);
    const [totalRolls, setTotalRolls] = useState(0);
    // const [gauge, setGauge] = useState(0);

    // const getGaugeLevel = rolls => {
    //     const total = Object.keys(rolls).reduce((sum, num) => {
    //         return sum + rolls[num];
    //     }, 0);
    //     return Math.round(Object.keys(rolls).reduce((gaugeLevel, num) => {
    //         const amount = rolls[num];
    //         const ratio = amount / total;
    //         let diff;
    //         if (num === 2 || num === 12) {
    //             diff = Math.abs(ratio - 1 / 36);
    //         } else if (num === 3 || num === 11) {
    //             diff = Math.abs(ratio - 2 / 36);
    //         } else if (num === 4 || num === 10) {
    //             diff = Math.abs(ratio - 3 / 36);
    //         } else if (num === 5 || num === 9) {
    //             diff = Math.abs(ratio - 4 / 36);
    //         } else if (num === 6 || num === 8) {
    //             diff = Math.abs(ratio - 5 / 36);
    //         } else {
    //             diff = Math.abs(ratio - 6 / 36);
    //         }

    //         return gaugeLevel += diff;
    //     }, 0) * 36);
    // };

    useEffect(() => {
        if (diceState.rolls.length) {
            const [first, second] = diceState.rolls[diceState.rolls.length - 1];
            const rolls = diceState.rolls.reduce((result, roll) => {
                const sum = roll[0] + roll[1];
                result[sum]++;
                return result;
            }, { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 });
            
            const numbers = Object.keys(rolls)
                .map(num => Number(num))
                .sort((a, b) => a - b)
                .map(num => rolls[num]);

            data.datasets[0].data = numbers;

            // const gaugeLevel = getGaugeLevel(rolls);

            setFirstDie(first);
            setSecondDie(second);
            setResult(first + second);
            // setGauge(gaugeLevel);
        }
    }, [diceState]);

    const onRollClick = () => {
        const first = Math.floor(Math.random() * 6) + 1;
        const second = Math.floor(Math.random() * 6) + 1;

        setTotalRolls(totalRolls + 1);

        action_rollDice([first, second]);
    }

    return (
        <Container>
            <Segment>
                <Header as='h1'>Roll Them Dice</Header>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{position: 'relative'}}>
                        <div style={{marginBottom: '4em'}}>
                            <div style={{fontSize: '20px', marginBottom: '1em'}}>{firstDie}, {secondDie}</div>
                            <div style={{fontSize: '50px'}}>Roll: {result}</div>
                        </div>
                        <Button
                            primary
                            onClick={onRollClick}>
                            Roll 'em
                        </Button>
                    </div>
                    <div style={{position: 'relative'}}>
                        <div style={{marginBottom: '4em'}}>
                            <div style={{fontSize: '20px', marginBottom: '1em'}}> </div>
                            <div style={{fontSize: '50px'}}># of rolls: {totalRolls}</div>
                        </div>
                        {/* <Gauge value={gauge} width={200} height={160} label="Salt level" /> */}
                    </div>
                </div>
            </Segment>
            <Segment>
                <Header as='h1'>Look At The Bullshit, Look At It</Header>
                <Bar
                    data={data}
                    options={{
                        scales: {
                            yAxes: [{
                                display: true,
                                ticks: {
                                    stepSize: 1,
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend: {
                            display: false
                        },
                    }}
                >
                </Bar>
            </Segment>
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        diceState: state.dice,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action_rollDice: rollDice(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dice);