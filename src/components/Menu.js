import React from "react";
import ReactModal from "react-modal"
import Rules from "./Rules"
import OnlineModal from "./OnlineModal"

const EASY_AI_ENABLED = process.env?.REACT_APP_EASY_AI_ENABLED ?? false;
const MEDIUM_AI_ENABLED = process.env?.REACT_APP_MEDIUM_AI_ENABLED ?? false;
const HARD_AI_ENABLED = process.env?.REACT_APP_HARD_AI_ENABLED ?? false;

ReactModal.setAppElement('#root');

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.handleToggleRules = this.handleToggleRules.bind(this);
        this.handleToggleOnline = this.handleToggleOnline.bind(this);
        this.state = {
            showRules: false,
            showOnline: false
        }

    }
    handleToggleRules () {
        this.setState({ showRules: !this.state.showRules });
    }
    handleToggleOnline () {
        this.setState({ showOnline: !this.state.showOnline });
    }

    render() {
        return (

            <div className="container is-fluid menu-hero">
                <div className="tile is-ancestor">
                    <div className='tile is-parent'>
                        <div className="tile is-parent is-12">
                            <div className="tile is-child notification is-game-title">
                                <div className="has-text-centered">
                                    <div className="title">Virus War Game</div>
                                    <div className="subtitle">Two-player game with easy rules and deep strategy</div>

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
                                    <div className="title">Read Rules</div>
                                </div>
                                <div className="button menu-button button-on-danger" onClick={this.handleToggleRules}><span role="img" aria-label="book">📖</span> Rules</div>
                            </article>
                        </div>

                        <div className="tile is-parent ">

                            <article className="tile is-child notification is-warning">
                                <div className="has-text-centered">
                                    <div className="title">Play With AI</div>
                                </div>
                                { EASY_AI_ENABLED ? <div className="button menu-button button-on-warning" onClick={this.props.onNavigationClick.bind(this, 'easy')}><span role="img" aria-label="easy">👶</span> Tony</div> : <div/>}
                                { MEDIUM_AI_ENABLED ? <div className="button menu-button button-on-warning" onClick={this.props.onNavigationClick.bind(this, 'medium')} ><span role="img" aria-label="medium">🤓</span> Jessie</div>: <div/>}
                                { HARD_AI_ENABLED ? <div className="button menu-button button-on-warning" onClick={this.props.onNavigationClick.bind(this, 'hard')} ><span role="img"  aria-label="hard">🤖</span> Max</div>: <div/>}
                                { !EASY_AI_ENABLED && !MEDIUM_AI_ENABLED && !HARD_AI_ENABLED ? <div className="label"> <br/>No AI backends are enabled at the moment :(</div>:<div/>}
                            </article>
                        </div>
                        <div className="tile is-parent ">

                            <article className="tile is-child notification is-info">
                                <div className="has-text-centered">
                                    <div className="title">Play With a Friend</div>
                                </div>
                                <div className="button menu-button button-on-info" onClick={this.props.onNavigationClick.bind(this, 'offline')}><span role="img" aria-label="offline">🤜🤛</span>‍ Offline</div>
                                {/*<div className="button menu-button button-on-info" onClick={this.handleToggleOnline}><span role="img" aria-label="online">🎮</span> Online</div>*/}
                            </article>
                        </div>
                    </div>
                </div>

                <ReactModal
                    isOpen={this.state.showRules}
                    onRequestClose={this.handleToggleRules}
                    className="rules-modal"
                    overlayClassName="overlay"
                    shouldFocusAfterRender={false}
                >
                    <Rules onCloseClick={this.handleToggleRules}/>

                </ReactModal>
                <ReactModal
                    isOpen={this.state.showOnline}
                    onRequestClose={this.handleToggleOnline}
                    className="rules-modal"
                    overlayClassName="overlay"
                    shouldFocusAfterRender={false}
                >
                    <OnlineModal onCloseClick={this.handleToggleOnline} createRoom={this.handleToggleOnline} joinRoom={this.handleToggleOnline}/>

                </ReactModal>
            </div>
        )
    }
}

export default Menu