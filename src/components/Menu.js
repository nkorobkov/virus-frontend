import React from "react";
import ReactModal from "react-modal"
import Rules from "./Rules"
import axios from 'axios'
import {SERVER_URL, USE_SSL, 
    ANY_AI_ENABLED, EASY_AI_ENABLED, 
    MEDIUM_AI_ENABLED, HARD_AI_ENABLED, 
    ONLINE_MODE_ENABLED} from "../utils/constants";

ReactModal.setAppElement('#root');

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.handleToggleRules = this.handleToggleRules.bind(this);
        this.state = {
            showRules: false,
            roomToJoin: "",
            canJoin: false,
            joinLoading: false,
            notification:"",
        }

    }
    handleToggleRules () {
        this.setState({ showRules: !this.state.showRules });
    }

    handleRoomIdChange =  (event) => {
        const proposedId = event.target.value
        // Remove non digits and trim to 4 chars
        const validatedId = proposedId.replace(/\D/g,'').slice(0,4);
        this.setState({roomToJoin: validatedId, canJoin: validatedId.length === 4});
    }

    handleJoinOnlineClick = async (team) => {
        if (!this.state.canJoin) return // not in format
        this.setState({isJoinLoading: true})
        if (await this.checkIfRoomCanBeJoined(team, this.state.roomToJoin)) {
            await this.setState({isJoinLoading: false})
            this.props.onOnlineClick(team, this.state.roomToJoin) 
        }else {
            await this.setState({isJoinLoading: false})
            console.log('there is no room with this id')
            this.showNotification("Room with id "+ this.state.roomToJoin+ " does not exist 🌚")
        }
    }
    handleCreateOnlineClick = (team) => {
        this.props.onOnlineClick(team) 
    }


    checkIfRoomCanBeJoined = async (team, roomId) => {
        const response = await axios.get((USE_SSL ? 'https://': 'http://') + SERVER_URL + '/room/'+ roomId + '/')
        return response.data.exists && !response.data.teams_joined.contains(team)
    }

    showNotification = (message) => {
        this.setState({notification: message})
        setTimeout(this.setState.bind(this, {notification:""}),5000)
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
                {this.state.notification ? 
                <div className="tile is-ancestor">
                    <div className='tile is-parent'>
                        <div className="tile is-parent is-12">
                            <div className="tile is-child notification">
                                <div className="has-text-centered">
                                    <div >{this.state.notification}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <div/> }

                <div className="title is-ancestor">
                    <div className="tile">
                        <div className="tile is-parent ">
                            <article className="tile is-child notification is-danger">
                                <div className="has-text-centered">
                                    <div className="title">Explore the game</div>
                                </div>
                                <div className="button menu-button button-on-danger" onClick={this.handleToggleRules}><span role="img" aria-label="book">📖</span> Read Rules</div>
                                <div className="button menu-button button-on-info" onClick={this.props.onNavigationClick.bind(this, 'offline')}><span role="img" aria-label="offline">🗺️</span>‍ Analysis Board</div>
                            </article>
                        </div>

                        { ANY_AI_ENABLED ? 
                        <div className="tile is-parent ">

                            <article className="tile is-child notification is-warning">
                                <div className="has-text-centered">
                                    <div className="title">Play With AI</div>
                                </div>
                                { EASY_AI_ENABLED ? <div className="button menu-button button-on-warning" onClick={this.props.onNavigationClick.bind(this, 'easy')}><span role="img" aria-label="easy">👶</span> Easy</div> : <div/>}
                                { MEDIUM_AI_ENABLED ? <div className="button menu-button button-on-warning" onClick={this.props.onNavigationClick.bind(this, 'medium')} ><span role="img" aria-label="medium">🤓</span> Medium</div>: <div/>}
                                { HARD_AI_ENABLED ? <div className="button menu-button button-on-warning" onClick={this.props.onNavigationClick.bind(this, 'hard')} ><span role="img"  aria-label="hard">🤖</span> Hard</div>: <div/>}
                                { !EASY_AI_ENABLED && !MEDIUM_AI_ENABLED && !HARD_AI_ENABLED ? <div className="label"> <br/>No AI backends are enabled at the moment :(</div>:<div/>}
                            </article>
                        </div> : <div/> }

                        {ONLINE_MODE_ENABLED ? 
                        <div className="tile is-parent ">

                            <article className="tile is-child notification is-info">
                                <div className="has-text-centered">
                                    <div className="title">Play With a Friend</div>
                                </div>
                                <div className="button menu-button button-on-info" onClick={this.handleCreateOnlineClick.bind(this,1)}><span role="img" aria-label="online">🎮</span> Create a game</div>
                                <hr/>
                                <input className="input is-info menu-button" type="text" placeholder="Enter room code" value={this.state.roomToJoin} onChange={this.handleRoomIdChange}></input>
                                <div className={(this.state.isJoinLoading ? "is-loading " : "") + "button menu-button button-on-info"} disabled={!this.state.canJoin} onClick={this.handleJoinOnlineClick.bind(this,-1)}>
                                    <span role="img" aria-label="online" >🎟️</span> Join by code
                                </div>
                            </article>
                        </div> : <div/> }
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