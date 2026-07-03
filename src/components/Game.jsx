import React from "react";
import axios from "axios";
import Field from "./Field";
import InfoBar from "./InfoBar";
import {
  isStepValid,
  getNextState,
  isValidMoveExists,
} from "../utils/gameEngine";
import { SERVER_URL, USE_SSL } from "../utils/constants";

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
      isOpponentConnected: false,
      team: props.team,
      roomId: props.roomId,
    };
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleRollBack = this.handleRollBack.bind(this);
  }

  async componentDidMount() {
    if (this.props.type === "offline") return;
    await this.setUpSocket();
  }

  setUpSocket = () => {
    let url;
    const protocol = USE_SSL ? "wss://" : "ws://";
    if (this.props.type === "ai") {
      url = protocol + SERVER_URL + "/ws/ai/" + this.props.aiType + "/";
    }
    this.timeouts = [];
    if (this.props.type === "online") {
      url =
        protocol +
        SERVER_URL +
        "/ws/room/" +
        (this.state.roomId || "") +
        "?team=" +
        this.state.team;
    }
    console.log("connecting to the backend", url);
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      this.setState({ isBackendConnected: true });
      console.log("backend connected");
    };
    this.socket.onmessage = (msg) => {
      this.handleSocketData(JSON.parse(msg.data));
    };
    this.socket.onclose = (msg) => {
      console.log(
        "Connection unexpectedly closed with code:",
        msg.code,
        "retrying in two secconds"
      );
      this.setState({ isBackendConnected: false });
      this.timeouts.push(
        setTimeout(() => {
          this.setUpSocket();
        }, 2000)
      );
    };
  };

  async componentWillUnmount() {
    console.log("unmounting, closing socket");
    if (this.socket) {
      // remove reconnection logic before intentional socket termination.
      this.socket.onclose = null;
      await this.socket.close();
      this.timeouts.forEach(clearTimeout);
    }
  }

  handleSocketData = async (data) => {
    if (data["type"] === "move") {
      await this.handleReceivedMove(data);
    }
    if (data["type"] === "stateUpdate") {
      await this.setState(data["state"]);
    }
    if (data["type"] === "resetState") {
      await this.resetStateFromField(data);
    }
    if (data["type"] === "error") {
      // If received error from backend, thorw back to menu
      await this.props.onMenuClick();
    }
  };

  handleReceivedMove(data) {
    if (this.state.toMove === this.state.team || this.state.isGameEnded) {
      throw new Error("move received when not expected");
    }
    let move = data.move;
    if (move.length > this.state.stepsLeft) {
      throw new Error("More moves than possible");
    }
    move.forEach(async (step) => {
      if (isStepValid(this.state, step[0], step[1])) {
        await this.makeStep(step[0], step[1]);
      }
    });
  }

  handleRollBack = () => {
    if (this.state.history.length === 0 || this.props.type !== "offline") {
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
    field[move[0] * this.sizeW + move[1]] =
      -Math.sign(currState) * (Math.abs(currState) - 1);

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
    });
  };

  handlePlayAgain = async () => {
    if (this.props.type !== "online") return;
    // Server should restart it's internal state and then send requests to reset state on clients
    await axios.post(
      (USE_SSL ? "https://" : "http://") +
        SERVER_URL +
        "/room/" +
        this.state.roomId +
        "/restart"
    );
  };

  handleCellClick = async (h, w) => {
    const playerCantMoveNow =
      this.state.toMove !== this.state.team && this.props.type !== "offline";
    // We won't allow clicking on the field if opponent is not connected and game is not fully ready.
    const onlineGameNotReady =
      this.props.type === "online" &&
      (!this.state.isBackendConnected || !this.state.isOpponentConnected);
    if (
      playerCantMoveNow ||
      onlineGameNotReady ||
      this.state.isGameEnded ||
      !isStepValid(this.state, h, w)
    ) {
      return;
    }
    await this.makeStep(h, w);
    if (this.props.type === "ai") {
      await this.sendStateToAiIfNeeded();
    }
    if (this.props.type === "online") {
      await this.sendMoveToOpponent(h, w);
    }
  };

  makeStep = async (h, w) => {
    const field = this.state.field.slice();
    const history = this.state.history.slice();
    let stepsLeft = this.state.stepsLeft - 1;
    let toMove = this.state.toMove;

    let winner = this.state.winner;
    let isGameEnded = this.state.isGameEnded;

    field[h * this.sizeW + w] = getNextState(
      field[h * this.sizeW + w],
      this.state.toMove
    );
    history.push([h, w]);

    // Switch move
    if (stepsLeft === 0) {
      toMove = -toMove;
      stepsLeft = 3;

      //check  if game ended:
      let new_state = { ...this.state };
      new_state.field = field.slice();
      new_state.history = history.slice();
      new_state.stepsLeft = stepsLeft;
      new_state.toMove = toMove;

      if (!isValidMoveExists(new_state)) {
        //end game
        isGameEnded = true;
        winner = -toMove;
      }
    }

    return await this.setState({
      toMove: toMove,
      field: field,
      stepsLeft: stepsLeft,
      history: history,
      isGameEnded: isGameEnded,
      winner: winner,
    });
  };

  sendStateToAiIfNeeded = async () => {
    //  don't call it on invalid or not on time moves.
    const aiMoves = this.state.team !== this.state.toMove;
    if (aiMoves && !this.state.isGameEnded) {
      if (this.state.isBackendConnected) {
        await this.socket.send(JSON.stringify(this.state));
      } else {
        console.log("state not sent, retrying in two seconds");
        this.timeouts.push(
          setTimeout(() => {
            this.sendStateIfNeeded();
          }, 2000)
        );
      }
    }
  };
  sendMoveToOpponent = async (h, w) => {
    await this.socket.send(
      JSON.stringify({
        type: "move",
        move: [[h, w]],
        state: this.state,
      })
    );
  };

  resetStateFromField = async (data) => {
    const field = data["field"];
    let winner = null;
    let isGameEnded = false;
    // number of moves made = abs value in all cells -2 for initial seed cells
    const movesMade = field.map(Math.abs).reduce((x, y) => x + y, 0) - 2;
    const history = this.state.history.slice(0, movesMade);
    const toMove = Math.floor((movesMade + 1) / 3) % 2 === 0 ? 1 : -1;
    const stepsLeft = 3 - ((movesMade + 1) % 3);
    const newState = {
      history: history,
      field: field,
      toMove: toMove,
      stepsLeft: stepsLeft,
    };
    if (!isValidMoveExists({ ...this.state, ...newState })) {
      //end game
      isGameEnded = true;
      winner = -toMove;
    }
    this.setState({
      ...newState,
      isGameEnded: isGameEnded,
      winner: winner,
    });
  };

  getInfoBarColor = () => {
    return this.state.team === 1 ? "info-background" : "danger-background";
  };

  render() {
    return (
      <div className="container is-fluid game-container">
        <div className="tile is-ancestor">
          <div className="tile is-parent is-8">
            <div className="tile is-child is-game-tile">
              <Field
                sizeH={this.sizeH}
                sizeW={this.sizeW}
                onCellClick={this.handleCellClick}
                field={this.state.field}
              />
            </div>
          </div>
          <div className="tile is-parent">
            <div
              className={"tile is-child is-info-bar " + this.getInfoBarColor()}
            >
              <InfoBar
                onMenuClick={this.props.onMenuClick}
                onRollBack={this.handleRollBack}
                onPlayAgain={this.handlePlayAgain}
                gameState={this.state}
                type={this.props.type}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
