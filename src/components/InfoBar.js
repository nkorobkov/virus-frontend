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
            clicked: false
        }
        this.pressed = this.pressed.bind(this);

    }

    pressed(){
        this.setState({clicked: ! this.state.clicked});
    };

    render() {

        const regButton = <div>
            <div className="button sidebar-button button-on-info" onClick={this.pressed}>Menu</div>
        </div>;

        const confirmButton =
            <div>
                <div className="info-line">Your game would be lost You sure you want to exit?</div>
                <div className="columns">
                    <span className="column button sidebar-button button-on-info" onClick={this.props.onMenuClick}>Yes</span>
                    <span className="column button sidebar-button button-on-info" onClick={this.pressed}>No</span>

                </div>

            </div>;

        return (
            this.state.clicked ? confirmButton : regButton
        )
    }
}


class InfoBar extends Component {


    render() {
        return (

            <div className="has-text-centered">
                <div className="info-line"><TeamName id={this.props.gameState.toMove}/> moves</div>
                <div className="info-line"> {this.props.gameState.stepsLeft} steps left.</div>

                <div className="info-line"><MovesBar n={this.props.gameState.stepsLeft}
                                                     id={this.props.gameState.toMove}/></div>
                <MenuButton onMenuClick={this.props.onMenuClick}/>
            </div>

        )
    }
}

export default InfoBar;