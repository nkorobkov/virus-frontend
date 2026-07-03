import React, { Component } from "react";
import resolveImagePath from "../utils/styleUtils";
import { getInviteLink } from "../utils/p2p";

class TeamName extends React.Component {
  render() {
    const className =
      "team-name " + (this.props.id === 1 ? "blue-name" : "red-name");
    return (
      <span className={className}>{this.props.id === 1 ? "Blue" : "Red"}</span>
    );
  }
}

class MoveDot extends React.Component {
  render() {
    return <img alt="cell" className={this.props.class} src={this.props.img} />;
  }
}

class MovesBar extends React.Component {
  render() {
    const img_path = resolveImagePath(this.props.id);
    const empty = resolveImagePath(0);
    const className =
      "move-dot " + (this.props.id === 1 ? "blue-name" : "red-name");

    return (
      <div>
        <MoveDot img={this.props.n > 2 ? img_path : empty} class={className} />
        <MoveDot img={this.props.n > 1 ? img_path : empty} class={className} />
        <MoveDot img={this.props.n > 0 ? img_path : empty} class={className} />
      </div>
    );
  }
}

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
    this.pressed = this.pressed.bind(this);
  }

  pressed() {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    if (
      this.props.gameState.isGameEnded ||
      this.props.gameState.history.length === 0
    ) {
      return (
        <div>
          <div
            className={"button sidebar-button " + this.props.colorClass}
            onClick={this.props.onMenuClick}
          >
            Menu
          </div>
        </div>
      );
    }
    if (this.state.clicked) {
      return (
        <div>
          <div className="info-line">
            Your game would be lost You sure you want to exit?
          </div>
          <div className="columns">
            <span
              className={"column button sidebar-button " + this.props.colorClass}
              onClick={this.props.onMenuClick}
            >
              Yes
            </span>
            <span
              className={"column button sidebar-button " + this.props.colorClass}
              onClick={this.pressed}
            >
              No
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            className={"button sidebar-button " + this.props.colorClass}
            onClick={this.pressed}
          >
            Menu
          </div>
        </div>
      );
    }
  }
}

class Hint extends React.Component {
  render() {
    const sl = this.props.gameState.stepsLeft;
    const tm = this.props.gameState.toMove;
    if (this.props.gameState.isGameEnded) {
      return (
        <div>
          <div className="info-line">
            Team <TeamName id={this.props.gameState.winner} /> won!
          </div>
        </div>
      );
    } else {
      if (this.props.type === "offline" || tm === this.props.gameState.team) {
        return (
          <div>
            {this.props.type === "offline" ? (
              <div className="info-line">
                <TeamName id={this.props.gameState.toMove} /> moves
              </div>
            ) : (
              <div className="info-line">Your move</div>
            )}
            <div className="info-line">
              {" "}
              {sl} step{sl === 1 ? "" : "s"} left
            </div>
            <div className="info-line">
              <MovesBar n={sl} id={tm} />
            </div>
          </div>
        );
      } else {
        // it's not offline game and our opponent is thinking now
        return <div className="info-line">Oponents move</div>;
      }
    }
  }
}

class RollBackButton extends React.Component {
  render() {
    if (this.props.shouldShow) {
      return (
        <div
          className={"button sidebar-button " + this.props.colorClass}
          onClick={this.props.onRollBack}
        >
          TakeBack
        </div>
      );
    }
    return <div />;
  }
}

class PlayAgainButton extends React.Component {
  render() {
    const text = this.props.isGameCompleted ? "Play Again" : "Resign";
    const isEnabled = this.props.isOpponentConnected;
    if (this.props.shouldShow) {
      return (
        <div
          className={"button sidebar-button " + this.props.colorClass}
          disabled={!isEnabled}
          onClick={this.props.onPlayAgain}
        >
          {text}
        </div>
      );
    }
    return <div />;
  }
}

class RoomId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }
  render() {
    if (this.props.type === "online") {
      return (
        <div>
          <span className="tags has-addons">
            <span className="tag is-light is-large ">
              Room # <code> {this.props.roomId}</code>
            </span>
            <button
              className="tag is-large button"
              title="Copy invite link"
              onClick={() => {
                navigator.clipboard.writeText(
                  getInviteLink(this.props.roomId)
                );
                this.setState({ copied: true });
                setTimeout(() => this.setState({ copied: false }), 3000);
              }}
            >
              🔗
            </button>
            {this.state.copied ? "Invite link copied" : ""}
          </span>
        </div>
      );
    }
    return <div />;
  }
}

// Practical tips shown while the opponent is not connected.
class ConnectionTroubleshooting extends React.Component {
  render() {
    return (
      <details className="connection-troubleshooting">
        <summary>Trouble connecting?</summary>
        <ul>
          <li>
            Your friend must have the game open too — send them the invite
            link (🔗) and keep this page open.
          </li>
          <li>Check you are both in the same room number.</li>
          <li>Turn off VPNs — they often block the connection.</li>
          <li>
            Try disabling ad-blockers, or switch to another network — a phone
            hotspot usually works.
          </li>
          <li>Still stuck? Both reload the page and try again.</li>
        </ul>
      </details>
    );
  }
}

class ConnectionStatus extends React.Component {
  render() {
    // Only online games are networked; offline and AI games are fully local.
    if (this.props.type !== "online") {
      return <div />;
    }

    const lightClassSignaling = this.props.isSignalingConnected
      ? "green"
      : "red";
    const lightClassOpponent = this.props.isOpponentConnected ? "green" : "red";

    return (
      <div className="connection-status">
        <span>
          <span className={lightClassSignaling + " dot"} /> matchmaking is{" "}
          {this.props.isSignalingConnected ? "" : "not "}connected
        </span>
        <br />
        <span>
          <span className={lightClassOpponent + " dot"} /> opponent is{" "}
          {this.props.isOpponentConnected
            ? "connected"
            : "not connected — waiting"}
        </span>
        {this.props.isOpponentConnected ? (
          <div />
        ) : (
          <ConnectionTroubleshooting />
        )}
      </div>
    );
  }
}

class InfoBar extends Component {

  getButtonClass = () => {
    return this.props.gameState.team === 1 ? "button-on-info"  : "button-on-danger"
  }
  render() {
    return (
      <div>
        <ConnectionStatus
          isSignalingConnected={this.props.gameState.isSignalingConnected}
          isOpponentConnected={this.props.gameState.isOpponentConnected}
          type={this.props.type}
        />
        <RoomId
          roomId={this.props.gameState.roomId}
          type={this.props.type}
        ></RoomId>
        <br />
        <div className="has-text-centered">
          <Hint gameState={this.props.gameState} type={this.props.type} />
          <RollBackButton
            onRollBack={this.props.onRollBack}
            shouldShow={this.props.type === "offline"}
            colorClass={this.getButtonClass()}
          />
          <PlayAgainButton
            onPlayAgain={this.props.onPlayAgain}
            shouldShow={this.props.type === "online"}
            isGameCompleted={this.props.gameState.isGameEnded}
            isOpponentConnected={this.props.gameState.isOpponentConnected}
            colorClass={this.getButtonClass()}
          />
          <MenuButton
            gameState={this.props.gameState}
            onMenuClick={this.props.onMenuClick}
            colorClass={this.getButtonClass()}
          />
        </div>
      </div>
    );
  }
}

export default InfoBar;
