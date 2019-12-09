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

        if (this.props.gameState.isGameEnded) {
            return (<div>
                    <div className="info-line">Team <TeamName id={this.props.gameState.winner}/> won!</div>
                </div>
            )
        } else {
            return (<div>
                    <div className="info-line"><TeamName id={this.props.gameState.toMove}/> moves</div>
                    <div className="info-line"> {this.props.gameState.stepsLeft} steps left.</div>
                    <div className="info-line"><MovesBar n={this.props.gameState.stepsLeft}
                                                         id={this.props.gameState.toMove}/></div>
                </div>
            )
        }


    }
}

class RollBackButton extends React.Component {
    render() {
        return (
            <div className="button sidebar-button button-on-info" onClick={this.props.onRollBack}>TakeBack</div>
        )
    }
}


class InfoBar extends Component {


    render() {
        return (
            <div className="has-text-centered">
                <Hint gameState={this.props.gameState}/>
                <RollBackButton onRollBack={this.props.onRollBack}/>
                <MenuButton gameState={this.props.gameState} onMenuClick={this.props.onMenuClick}/>
            </div>

        )
    }
}

export default InfoBar;