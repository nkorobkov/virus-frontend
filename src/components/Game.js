import React from "react";
import Field from "./Field";
import InfoBar from "./InfoBar"
import {isStepValid, getNextState, isValidMoveExists} from "../utils/gameEngine";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.sizeH = 8;
        this.sizeW = 8;
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
            isBackendConnected: false,
            playerTeam: 1,
        };
        this.handleCellClick = this.handleCellClick.bind(this);
        this.handleRollBack = this.handleRollBack.bind(this);
    }

    componentDidMount() {
        if (this.props.type === 'ai') {
            this.setUpSocket('ws://ec2-18-188-144-80.us-east-2.compute.amazonaws.com/ws/ai/' + this.props.aiType + '/');
        }
        this.timeouts = [];
        // if online
    }

    setUpSocket = (url)=> {
        console.log('connecting to the backend');
        this.socket = new WebSocket(url);
        this.socket.onopen = () => {
            this.setState({isBackendConnected: true});
            console.log('backend connected')
        };
        this.socket.onmessage = (msg) => {
            this.handleReceivedMove(JSON.parse(msg.data));
        };
        this.socket.onclose = (msg) => {
            console.log('Cant connect to the server with code:',msg.code,  'retrying in two secconds');
            this.setState({isBackendConnected: false});
            this.timeouts.push(setTimeout(()=>{this.setUpSocket(url)}, 2000))
        };
    };

    componentWillUnmount() {
        console.log('unmounting, closing socket');
        if (this.socket) {
            // remove reconnection logic before intentional socket termination.
            this.socket.onclose = null;
            this.socket.close()
        }
        this.timeouts.forEach(clearTimeout);
    }

    handleReceivedMove(data) {
        if (this.state.toMove === this.state.playerTeam || this.state.isGameEnded) {
            return;
        }
        let move = data.move;
        if (move.length > this.state.stepsLeft) {
            throw new Error("More moves than possible");
        }
        move.forEach(async (step) => {
            if (isStepValid(this.state, step[0], step[1])) {
                await this.makeStep(step[0], step[1]);
            }
        })
    }

    handleRollBack = () => {
        if (this.state.history.length === 0 || this.props.type !== 'offline') {
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
        const playerCantMoveNow = this.state.toMove !== this.state.playerTeam && this.props.type !== 'offline';
        if (playerCantMoveNow || this.state.isGameEnded || !isStepValid(this.state, h, w)) {
            return;
        }
        this.makeStep(h, w).then(this.sendStateIfNeeded.bind(this));
    };


    makeStep(h, w) {
        const field = this.state.field.slice();
        const history = this.state.history.slice();
        let stepsLeft = this.state.stepsLeft - 1;
        let toMove = this.state.toMove;

        let winner = this.state.winner;
        let isGameEnded = this.state.isGameEnded;


        field[h * this.sizeW + w] = getNextState(field[h * this.sizeW + w], this.state.toMove);
        history.push([h, w]);

        // Switch move
        if (stepsLeft === 0) {
            toMove = -toMove;
            stepsLeft = 3;

            //check  if game ended:
            let new_state = {... this.state};
            new_state.field = field.slice();
            new_state.history = history.slice();
            new_state.stepsLeft = stepsLeft;
            new_state.toMove = toMove;

            if (!isValidMoveExists(new_state)){
                //end game
                isGameEnded = true;
                winner = - toMove
            }
        }

        return new Promise((resolve) => {
            this.setState({
                toMove: toMove,
                field: field,
                stepsLeft: stepsLeft,
                history: history,
                isGameEnded: isGameEnded,
                winner: winner,
            }, resolve);
        });
    }

    sendStateIfNeeded() {
        //  don't call it on invalid or not on time moves.
        const aiMoves = this.props.type === 'ai' && this.state.playerTeam !== this.state.toMove;
        const onlineGame = this.props.type === 'online';
        if ((aiMoves && !this.state.isGameEnded) || onlineGame) {
            if (this.state.isBackendConnected){
                this.socket.send(JSON.stringify(this.state));
                console.log('state sent')
            }else{
                console.log('state not sent, retrying in two seconds');
                this.timeouts.push(setTimeout(()=>{this.sendStateIfNeeded()}, 2000))
            }
        }
    }

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
                                     gameState={this.state} type={this.props.type}/>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Game