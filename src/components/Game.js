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

    endGameIfNeeded(){
        if (this.state.stepsLeft === 3 && !isValidMoveExists(this.state)) {
            this.setState({
                isGameEnded: true,
                winner: -this.state.toMove,
            });
            console.log('game is ended,  winner: ', this.state.winner)
        }
    }

    handleCellClick = (h, w) => {
        if (isStepValid(this.state, h, w)) {
            const field = this.state.field.slice();
            const history = this.state.history.slice();
            field[h * this.sizeW + w] = getNextState(field[h * this.sizeW + w], this.state.toMove);
            history.push([h, w]);
            let stepsLeft = this.state.stepsLeft - 1;
            let toMove = this.state.toMove;
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

            <div className="columns">
                <div className="column is-three-quarters">
                    <Field sizeH={this.sizeH} sizeW={this.sizeW} onCellClick={this.handleCellClick}
                           field={this.state.field}/>
                </div>
                <div className="column">
                    <InfoBar onMenuClick={this.props.onMenuClick} gameState={this.state}/>
                </div>
            </div>


        )
    }
}

export default Game