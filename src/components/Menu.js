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
                                <div className="button menu-button button-on-danger" onClick={this.handleToggleRules}><span role="img" aria-label="book">📖</span> Rules</div>
                            </article>
                        </div>

                        <div className="tile is-parent ">

                            <article className="tile is-child notification is-warning">
                                <div className="has-text-centered">
                                    <div className="title">Play With AI</div>
                                </div>
                                <div className="button menu-button button-on-warning" onClick={this.props.onNavigationClick.bind(this, 'tony')}><span role="img" aria-label="easy">👶</span> Tony</div>
                                <div className="button menu-button button-on-warning"><span role="img" aria-label="medium">🤓</span> Jessie</div>
                                <div className="button menu-button button-on-warning"><span role="img"  aria-label="hard">🤖</span> Max</div>
                            </article>
                        </div>
                        <div className="tile is-parent ">

                            <article className="tile is-child notification is-info">
                                <div className="has-text-centered">
                                    <div className="title">Play With a Friend</div>
                                </div>
                                <div className="button menu-button button-on-info" onClick={this.props.onNavigationClick.bind(this, 'offline')}><span role="img" aria-label="offline">🤜🤛</span>‍ Offline</div>
                                <div className="button menu-button button-on-info"><span role="img" aria-label="online">🎮</span> Online</div>
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