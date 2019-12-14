import React, {Component} from "react";
import resolveImagePath from "../utils/styleUtils";


class TeamName extends React.Component {
    render() {
        const className = "team-name " + (this.props.id === 1 ? "blue-name" : "red-name");
        return (<span className={className}>{this.props.id === 1 ? "Blue" : "Red"}</span>)
    }
}

class MoveDot extends React.Component {
    render() {

        return (
            <img alt="cell" className={this.props.class} src={this.props.img}/>
        )
    }
}

class MovesBar extends React.Component {
    render() {
        const img_path = resolveImagePath(this.props.id);
        const empty = resolveImagePath(0);
        const className = "move-dot " + (this.props.id === 1 ? "blue-name" : "red-name");

        return (
            <div><MoveDot img={this.props.n > 2 ? img_path : empty} class={className}/>
                <MoveDot img={this.props.n > 1 ? img_path : empty} class={className}/>
                <MoveDot img={this.props.n > 0 ? img_path : empty} class={className}/></div>
        )
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
        this.setState({clicked: !this.state.clicked});
    };

    render() {
        if (this.props.gameState.isGameEnded || this.props.gameState.history.length === 0) {
            return (
                <div>
                    <div className="button sidebar-button button-on-info" onClick={this.props.onMenuClick}>Menu</div>
                </div>
            )
        }
        if (this.state.clicked) {
            return (
                <div>
                    <div className="info-line">Your game would be lost You sure you want to exit?</div>
                    <div className="columns">
                    <span className="column button sidebar-button button-on-info"
                          onClick={this.props.onMenuClick}>Yes</span>
                        <span className="column button sidebar-button button-on-info" onClick={this.pressed}>No</span>

                    </div>

                </div>
            )
        } else {
            return <div>
                <div className="button sidebar-button button-on-info" onClick={this.pressed}>Menu</div>
            </div>
        }
    }
}

class Hint extends React.Component {
    render() {

        const sl = this.props.gameState.stepsLeft;
        const tm = this.props.gameState.toMove;
        if (this.props.gameState.isGameEnded) {
            return (<div>
                    <div className="info-line">Team <TeamName id={this.props.gameState.winner}/> won!</div>
                </div>
            )
        } else {
            if (this.props.type === 'offline' || tm === this.props.gameState.playerTeam) {
                return (<div>
                    {this.props.type === 'offline' ?
                        <div className="info-line"><TeamName id={this.props.gameState.toMove}/> moves</div>
                        :
                        <div className="info-line">It's our move</div>
                    }
                    <div className="info-line"> {sl} step{sl === 1 ? '' : 's'} left</div>
                    <div className="info-line"><MovesBar n={sl} id={tm}/></div>
                </div>)
            } else {
                // it's not offline game and our opponent is thinking now
                return <div className="info-line">Our opponent is thinking...</div>
            }
        }


    }
}

class RollBackButton extends React.Component {
    render() {
        if (this.props.shouldShow) {
            return (
                <div className="button sidebar-button button-on-info" onClick={this.props.onRollBack}>TakeBack</div>
            )
        }
        return <div/>
    }
}

class ConnectionStatus extends React.Component {
    render() {
        if (this.props.type === 'offline') {
            return <div/>
        }

        const lightClassBackend = this.props.isBackendConnected ? 'green' : 'red';
        const lightClassOpponent = this.props.isBackendConnected ? 'green' : 'red';

        let backend = <span><span
            className={lightClassBackend + ' dot'}/> backend is {this.props.isBackendConnected ? '' : 'not '}connected</span>

        let opponent = this.props.type === 'online' ?
            <span><span
                className={lightClassOpponent + 'dot'}/> opponent is {this.props.isBackendConnected ? '' : 'not '}connected</span> :
            <span/>;


        return (
            <div className="connection-status">{backend}{opponent}</div>
        )
    }
}

class InfoBar extends Component {


    render() {
        return (
            <div>
                <ConnectionStatus isBackendConnected={this.props.gameState.isBackendConnected} type={this.props.type}/>
                <div className="has-text-centered">
                    <Hint gameState={this.props.gameState} type={this.props.type}/>
                    <RollBackButton onRollBack={this.props.onRollBack} shouldShow={this.props.type === 'offline'}/>
                    <MenuButton gameState={this.props.gameState} onMenuClick={this.props.onMenuClick}/>
                </div>

            </div>

        )
    }
}

export default InfoBar;