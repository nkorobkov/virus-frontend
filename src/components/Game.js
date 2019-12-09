import React, {Component} from "react";
import Field from "./Field";
import InfoBar from "./InfoBar"
import {isStepValid, getNextState, isValidMoveExists} from "../utils/gameEngine";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.sizeH = 8;
        this.sizeW = 8;
        this.handleCellClick = this.handleCellClick.bind(this);
        this.handleRollBack = this.handleRollBack.bind(this);
        let field = new Array(this.sizeH * this.sizeW).fill(0);
        field[0] = 1;
        field[this.sizeH * this.sizeW - 1] = -1;
        this.state = {
            field: field,
            toMove: 1,
            stepsLeft: 2,
            sizeH: this.sizeH,
            sizeW: this.sizeW,
            history: [],
            isGameEnded: false,
            winner: null,
        };
    }

    endGameIfNeeded() {
        if (this.state.stepsLeft === 3 && !isValidMoveExists(this.state)) {
            this.setState({
                isGameEnded: true,
                winner: -this.state.toMove,
            });
        }
    }

    handleRollBack = () => {
        if (this.state.history.length === 0) {
            // Initial state. Nothing to roll back
            return;
        }
        const history = this.state.history.slice();
        const field = this.state.field.slice();
        let toMove = this.state.toMove;
        let stepsLeft = this.state.stepsLeft + 1;
        let isGameEnded = this.state.isGameEnded;
        let winner = this.state.winner;

        const move = history.pop();
        const currState = field[move[0] * this.sizeW + move[1]]; // Hope it is not 0 (that would cause an error, but should be impossible)
        // Next state is 1 for -2 and 0 for (1, -1) so it is opposite sign and smaller modulo
        field[move[0] * this.sizeW + move[1]] = -Math.sign(currState) * (Math.abs(currState) - 1);


        if (stepsLeft > 3) {
            // We tried to roll back when stepsLeft ==  3 --> after roll back different team moves and has last move.
            toMove = -toMove;
            stepsLeft = 1;
            // in this case we may have game end in place.
            if (isGameEnded) {
                isGameEnded = false;
                winner = null;
            }
        }

        this.setState({
            field: field,
            toMove: toMove,
            stepsLeft: stepsLeft,
            history: history,
            isGameEnded: isGameEnded,
            winner: winner,
        })


    };

    handleCellClick = (h, w) => {
        if (this.state.isGameEnded) {
            return;
        }
        if (isStepValid(this.state, h, w)) {
            const field = this.state.field.slice();
            const history = this.state.history.slice();
            let toMove = this.state.toMove;
            let stepsLeft = this.state.stepsLeft - 1;

            field[h * this.sizeW + w] = getNextState(field[h * this.sizeW + w], this.state.toMove);
            history.push([h, w]);

            if (stepsLeft === 0) {
                toMove = -toMove;
                stepsLeft = 3;
            }
            this.setState({
                field: field,
                toMove: toMove,
                stepsLeft: stepsLeft,
                history: history,
            }, this.endGameIfNeeded);

        }
    };


    render() {
        return (
            <div className="container is-fluid game-container">

                <div className="tile is-ancestor">
                    <div className="tile is-parent is-8">
                        <div className="tile is-child is-game-tile">
                            <Field sizeH={this.sizeH} sizeW={this.sizeW} onCellClick={this.handleCellClick}
                                   field={this.state.field}/>
                        </div>
                    </div>
                    <div className="tile is-parent">
                        <div className="tile is-child is-info-bar ">
                            <InfoBar onMenuClick={this.props.onMenuClick} onRollBack={this.handleRollBack}
                                     gameState={this.state}/>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Game