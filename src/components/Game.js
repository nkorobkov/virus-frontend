import React from "react";

class Game extends React.Component {

    constructor(props) {
        super(props);

    }



    render() {
        return (
            <div>
                <h1>Game</h1>
                <div className="button" onClick={this.props.onMenuClick}>Menu</div>
            </div>
        )
    }
}

export default Game