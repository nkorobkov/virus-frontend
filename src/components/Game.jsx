import React from "react";
import Field from "./Field";
import InfoBar from "./InfoBar";
import {
  isStepValid,
  getNextState,
  isValidMoveExists,
} from "../utils/gameEngine";
import {
  connectToRoom,
  isSignalingConnected,
  saveGameState,
  loadGameState,
  clearGameState,
} from "../utils/p2p";

function initialGameState(sizeH, sizeW) {
  const field = new Array(sizeH * sizeW).fill(0);
  field[0] = 1;
  field[sizeH * sizeW - 1] = -1;
  return {
    field: field,
    toMove: 1,
    stepsLeft: 2,
    history: [],
    isGameEnded: false,
    winner: null,
  };
}

// The subset of state two peers need to agree on to resume a game.
function sharedGameState(state) {
  return {
    field: state.field,
    toMove: state.toMove,
    stepsLeft: state.stepsLeft,
    history: state.history,
    isGameEnded: state.isGameEnded,
    winner: state.winner,
  };
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.sizeH = 8;
    this.sizeW = 8;
    // An online game that this tab already played (page reload) resumes from
    // the locally saved board; the opponent's sync corrects it if they are
    // further ahead.
    const restored =
      props.type === "online" ? loadGameState(props.roomId) : null;
    this.state = {
      ...initialGameState(this.sizeH, this.sizeW),
      ...restored,
      sizeH: this.sizeH,
      sizeW: this.sizeW,
      isSignalingConnected: false,
      isOpponentConnected: false,
      team: props.team,
      roomId: props.roomId,
    };
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleRollBack = this.handleRollBack.bind(this);
  }

  componentDidMount() {
    if (this.props.type === "offline") return;
    if (this.props.type === "ai") {
      this.setUpAiWorker();
      return;
    }
    this.setUpPeerRoom();
  }

  setUpAiWorker = () => {
    // The AI runs fully client-side, inside a web worker so long searches
    // don't block the UI. It replies with {type: "move", move: [[h, w], ...]}.
    this.aiWorker = new Worker(new URL("../engine/aiWorker.js", import.meta.url), {
      type: "module",
    });
    this.aiWorker.onmessage = async (msg) => {
      if (msg.data["type"] === "move") {
        await this.handleReceivedMove(msg.data);
      }
    };
  };

  setUpPeerRoom = () => {
    // The opponent is the first peer to show up; any further peers (someone
    // opening the invite link twice, a stranger guessing the code) are
    // ignored so a room never holds more than one game.
    this.opponentPeerId = null;
    this.room = connectToRoom(this.state.roomId);

    this.room.onMove(async (move, peerId) => {
      if (peerId !== this.opponentPeerId) return;
      await this.handleReceivedMove({ move });
    });
    this.room.onRestart(async (data, peerId) => {
      if (peerId !== this.opponentPeerId) return;
      await this.setState(initialGameState(this.sizeH, this.sizeW));
    });
    this.room.onSync(async (remoteState, peerId) => {
      if (peerId !== this.opponentPeerId) return;
      // After a page reload one side comes back with a fresh board; whichever
      // peer has seen more of the game is the source of truth.
      if (remoteState.history.length > this.state.history.length) {
        await this.setState(sharedGameState(remoteState));
      }
    });
    this.room.onPeerJoin((peerId) => {
      if (this.opponentPeerId !== null) return;
      this.opponentPeerId = peerId;
      this.setState({ isOpponentConnected: true });
      // If we are mid-game, the opponent just reconnected: catch them up.
      if (this.state.history.length > 0) {
        this.room.sendSync(sharedGameState(this.state), peerId);
      }
    });
    this.room.onPeerLeave((peerId) => {
      if (peerId !== this.opponentPeerId) return;
      this.opponentPeerId = null;
      this.setState({ isOpponentConnected: false });
    });

    // Trystero reconnects to relays on its own; we just poll the socket
    // states to keep the status light honest.
    this.signalingPollId = setInterval(() => {
      const connected = isSignalingConnected();
      if (connected !== this.state.isSignalingConnected) {
        this.setState({ isSignalingConnected: connected });
      }
    }, 1000);
  };

  componentDidUpdate() {
    if (this.props.type === "online") {
      saveGameState(this.state.roomId, sharedGameState(this.state));
    }
  }

  componentWillUnmount() {
    if (this.aiWorker) {
      this.aiWorker.terminate();
    }
    if (this.room) {
      this.room.leave();
      clearInterval(this.signalingPollId);
      // Unmount only happens on a deliberate exit to the menu (reloads skip
      // it), so the game is abandoned and must not resurface later.
      clearGameState(this.state.roomId);
    }
  }

  async handleReceivedMove(data) {
    if (this.state.toMove === this.state.team || this.state.isGameEnded) {
      throw new Error("move received when not expected");
    }
    let move = data.move;
    if (move.length > this.state.stepsLeft) {
      throw new Error("More moves than possible");
    }
    // Steps must be applied strictly one after another: each step's validity
    // depends on the state produced by the previous one.
    for (const step of move) {
      if (isStepValid(this.state, step[0], step[1])) {
        await this.makeStep(step[0], step[1]);
      }
    }
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
    // Both peers reset to a fresh board; mid-game this doubles as resigning.
    this.room.sendRestart({}, this.opponentPeerId);
    await this.setState(initialGameState(this.sizeH, this.sizeW));
  };

  handleCellClick = async (h, w) => {
    const playerCantMoveNow =
      this.state.toMove !== this.state.team && this.props.type !== "offline";
    // We won't allow clicking on the field until the opponent's browser is
    // connected: moves made alone would never reach them.
    const onlineGameNotReady =
      this.props.type === "online" && !this.state.isOpponentConnected;
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

  makeStep = (h, w) => {
    // Functional setState so consecutive steps (the AI applies 3 in a row)
    // each see the state produced by the previous one even when React
    // batches updates; resolves once the step is committed.
    return new Promise((resolve) => {
      this.setState((prevState) => {
        const field = prevState.field.slice();
        const history = prevState.history.slice();
        let stepsLeft = prevState.stepsLeft - 1;
        let toMove = prevState.toMove;

        let winner = prevState.winner;
        let isGameEnded = prevState.isGameEnded;

        field[h * this.sizeW + w] = getNextState(
          field[h * this.sizeW + w],
          prevState.toMove
        );
        history.push([h, w]);

        // Switch move
        if (stepsLeft === 0) {
          toMove = -toMove;
          stepsLeft = 3;

          //check  if game ended:
          let new_state = { ...prevState };
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

        return {
          toMove: toMove,
          field: field,
          stepsLeft: stepsLeft,
          history: history,
          isGameEnded: isGameEnded,
          winner: winner,
        };
      }, resolve);
    });
  };

  sendStateToAiIfNeeded = async () => {
    //  don't call it on invalid or not on time moves.
    const aiMoves = this.state.team !== this.state.toMove;
    if (aiMoves && !this.state.isGameEnded) {
      this.aiWorker.postMessage({
        field: this.state.field,
        sizeH: this.state.sizeH,
        sizeW: this.state.sizeW,
        toMove: this.state.toMove,
        aiType: this.props.aiType,
      });
    }
  };
  sendMoveToOpponent = async (h, w) => {
    await this.room.sendMove([[h, w]], this.opponentPeerId);
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
