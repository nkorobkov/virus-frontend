import React from "react";
import ReactModal from "react-modal"
import Rules from "./Rules"

ReactModal.setAppElement('#root');

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.handleToggleRules = this.handleToggleRules.bind(this);
        this.state = {
            showRules: false
        }

    }
    handleToggleRules () {
        this.setState({ showRules: !this.state.showRules });
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
                                <a className="button menu-button button-on-danger" onClick={this.handleToggleRules}>📖 Rules</a>
                            </article>
                        </div>

                        <div className="tile is-parent ">

                            <article className="tile is-child notification is-warning">
                                <div className="has-text-centered">
                                    <div className="title">Play With AI</div>
                                </div>
                                <a className="button menu-button button-on-warning">👶 Tony</a>
                                <a className="button menu-button button-on-warning">🤓 Jessie</a>
                                <a className="button menu-button button-on-warning">🤖 Max</a>
                            </article>
                        </div>
                        <div className="tile is-parent ">

                            <article className="tile is-child notification is-info">
                                <div className="has-text-centered">
                                    <div className="title">Play With a Friend</div>
                                </div>
                                <a className="button menu-button button-on-info" onClick={this.props.onGameClick}>🤜🤛‍ Offline</a>
                                <a className="button menu-button button-on-info">🎮 Online</a>
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
            </div>
        )
    }
}

export default Menu