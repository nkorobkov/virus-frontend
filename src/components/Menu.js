import React from "react";

class Menu extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (

            <div className="container is-fluid menu-hero">
                <div className="tile is-ancestor">
                    <div className='tile is-parent'>
                        <div className="tile is-parent is-12">
                            <div className="tile is-child notification">
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
                                <a className="button menu-button">📖 Rules</a>
                            </article>
                        </div>

                        <div className="tile is-parent ">

                            <article className="tile is-child notification is-warning">
                                <div className="has-text-centered">
                                    <div className="title">Play With AI</div>
                                </div>
                                <a className="button menu-button">👶 Tony</a>
                                <a className="button menu-button">🧘 Jessie</a>
                                <a className="button menu-button">🤖 Max</a>
                            </article>
                        </div>
                        <div className="tile is-parent ">

                            <article className="tile is-child notification is-info">
                                <div className="has-text-centered">
                                    <div className="title">Play With a Friend</div>
                                </div>
                                <a className="button menu-button" onClick={this.props.onGameClick}>👯‍ Over the board</a>
                                <a className="button menu-button">🎮 Online</a>
                            </article>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default Menu