import React from "react";
import Game from "./components/Game";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import {
  getRoomIdFromUrl,
  setRoomIdInUrl,
  clearRoomIdFromUrl,
  rememberTeam,
  recallTeam,
} from "./utils/p2p";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activePage: "menu" };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  componentDidMount() {
    // ?room=1234 in the URL means either an invite link (join as the second
    // player) or a page reload mid-game (rejoin as whichever team this tab
    // was playing).
    const roomId = getRoomIdFromUrl();
    if (roomId) {
      this.handleOnlineGame(recallTeam(roomId) ?? -1, roomId);
    }
  }

  handleNavigation = (page) => {
    this.setState({ activePage: page });
  };

  handleOnlineGame = (team, roomId) => {
    // Keep the room in the URL and the team in per-tab storage so a reload
    // reconnects to the game instead of dropping to the menu.
    setRoomIdInUrl(roomId);
    rememberTeam(roomId, team);
    this.setState({
      activePage: "online",
      team: team,
      roomId: roomId,
    });
  };

  handleMenuClick = () => {
    clearRoomIdFromUrl();
    this.setState({ activePage: "menu" });
  };

  render() {
    const activePage = this.state.activePage;
    let element;
    switch (activePage) {
      case "menu":
        element = (
          <Menu
            onNavigationClick={this.handleNavigation}
            onOnlineClick={this.handleOnlineGame}
          />
        );
        break;
      case "easy":
        element = (
          <Game
            type="ai"
            aiType="easy"
            team={1}
            onMenuClick={this.handleMenuClick}
          />
        );
        break;
      case "medium":
        element = (
          <Game
            type="ai"
            aiType="medium"
            team={1}
            onMenuClick={this.handleMenuClick}
          />
        );
        break;
      case "hard":
        element = (
          <Game
            type="ai"
            aiType="hard"
            team={1}
            onMenuClick={this.handleMenuClick}
          />
        );
        break;
      case "online":
        element = (
          <Game
            type="online"
            roomId={this.state.roomId}
            team={this.state.team}
            onMenuClick={this.handleMenuClick}
          />
        );
        break;
      case "offline":
        element = (
          <Game type="offline" team={1} onMenuClick={this.handleMenuClick} />
        );
        break;
      default:
        element = (
          <Menu
            onNavigationClick={this.handleNavigation}
            onOnlineClick={this.handleOnlineGame}
          />
        );
        break;
    }
    return (
      <div>
        {element}
        <Footer />
      </div>
    );
  }
}

export default App;
