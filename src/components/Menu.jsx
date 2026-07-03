import React from "react";
import ReactModal from "react-modal";
import Rules from "./Rules";
import {
  ANY_AI_ENABLED,
  EASY_AI_ENABLED,
  MEDIUM_AI_ENABLED,
  HARD_AI_ENABLED,
  ONLINE_MODE_ENABLED,
} from "../utils/constants";
import { generateRoomId, isValidRoomId } from "../utils/p2p";

ReactModal.setAppElement("#root");

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleRules = this.handleToggleRules.bind(this);
    this.state = {
      showRules: false,
      roomToJoin: "",
      canJoin: false,
    };
  }
  handleToggleRules() {
    this.setState({ showRules: !this.state.showRules });
  }

  handleRoomIdChange = (event) => {
    const proposedId = event.target.value;
    // Remove non digits and trim to 4 chars
    const validatedId = proposedId.replace(/\D/g, "").slice(0, 4);
    this.setState({
      roomToJoin: validatedId,
      canJoin: isValidRoomId(validatedId),
    });
  };

  // Games are peer-to-peer, so there is no server that knows which rooms
  // exist: joining just enters the room and waits for the other player.
  handleJoinOnlineClick = () => {
    if (!this.state.canJoin) return; // not in format
    this.props.onOnlineClick(-1, this.state.roomToJoin);
  };
  handleCreateOnlineClick = (team) => {
    this.props.onOnlineClick(team, generateRoomId());
  };

  render() {
    return (
      <div className="container is-fluid menu-hero">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-parent is-12">
              <div className="tile is-child notification is-game-title">
                <div className="has-text-centered">
                  <div className="title">Virus War Game</div>
                  <div className="subtitle">
                    Two-player game with easy rules and deep strategy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="title is-ancestor">
          <div className="tile">
            <div className="tile is-parent ">
              <article className="tile is-child notification is-danger">
                <div className="has-text-centered">
                  <div className="title">Explore the game</div>
                </div>
                <div
                  className="button menu-button button-on-danger"
                  onClick={this.handleToggleRules}
                >
                  <span role="img" aria-label="book">
                    📖
                  </span>{" "}
                  Read Rules
                </div>
                <div
                  className="button menu-button button-on-danger"
                  onClick={this.props.onNavigationClick.bind(this, "offline")}
                >
                  <span role="img" aria-label="offline">
                    🗺️
                  </span>
                  ‍ Analysis Board
                </div>
              </article>
            </div>

            {ANY_AI_ENABLED ? (
              <div className="tile is-parent ">
                <article className="tile is-child notification is-warning">
                  <div className="has-text-centered">
                    <div className="title">Play With AI</div>
                  </div>
                  {EASY_AI_ENABLED ? (
                    <div
                      className="button menu-button button-on-warning"
                      onClick={this.props.onNavigationClick.bind(this, "easy")}
                    >
                      <span role="img" aria-label="easy">
                        👶
                      </span>{" "}
                      Easy
                    </div>
                  ) : (
                    <div />
                  )}
                  {MEDIUM_AI_ENABLED ? (
                    <div
                      className="button menu-button button-on-warning"
                      onClick={this.props.onNavigationClick.bind(
                        this,
                        "medium"
                      )}
                    >
                      <span role="img" aria-label="medium">
                        🤓
                      </span>{" "}
                      Medium
                    </div>
                  ) : (
                    <div />
                  )}
                  {HARD_AI_ENABLED ? (
                    <div
                      className="button menu-button button-on-warning"
                      onClick={this.props.onNavigationClick.bind(this, "hard")}
                    >
                      <span role="img" aria-label="hard">
                        🤖
                      </span>{" "}
                      Hard
                    </div>
                  ) : (
                    <div />
                  )}
                  {!EASY_AI_ENABLED &&
                  !MEDIUM_AI_ENABLED &&
                  !HARD_AI_ENABLED ? (
                    <div className="label">
                      {" "}
                      <br />
                      No AI backends are enabled at the moment :(
                    </div>
                  ) : (
                    <div />
                  )}
                </article>
              </div>
            ) : (
              <div />
            )}

            {ONLINE_MODE_ENABLED ? (
              <div className="tile is-parent ">
                <article className="tile is-child notification is-info">
                  <div className="has-text-centered">
                    <div className="title">Play With a Friend</div>
                  </div>
                  <div
                    className="button menu-button button-on-info"
                    onClick={this.handleCreateOnlineClick.bind(this, 1)}
                  >
                    <span role="img" aria-label="online">
                      🎮
                    </span>{" "}
                    Create a game
                  </div>
                  <hr />
                  <input
                    className="input is-info menu-button"
                    type="text"
                    placeholder="4-digit room code"
                    value={this.state.roomToJoin}
                    onChange={this.handleRoomIdChange}
                  ></input>
                  <div
                    className="button menu-button button-on-info"
                    disabled={!this.state.canJoin}
                    onClick={this.handleJoinOnlineClick.bind(this)}
                  >
                    <span role="img" aria-label="online">
                      🎟️
                    </span>{" "}
                    Join by code
                  </div>
                  <div className="label">
                    <br />
                    Games are peer-to-peer: create a game, send the invite
                    link to a friend, and keep the page open while they join.
                  </div>
                </article>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>

        <ReactModal
          isOpen={this.state.showRules}
          onRequestClose={this.handleToggleRules}
          className="rules-modal"
          overlayClassName="overlay"
          shouldFocusAfterRender={false}
        >
          <Rules onCloseClick={this.handleToggleRules} />
        </ReactModal>
      </div>
    );
  }
}

export default Menu;
