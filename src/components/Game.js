import React, {Component} from "react";
import Field from "./Field";
import InfoBar from "./InfoBar"


class Game extends React.Component {

    constructor(props) {
        super(props);
        this.sizeh = 8;
        this.sizew = 8;
        this.handleCellClick = this.handleCellClick.bind(this);
        let field = new Array(this.sizeh * this.sizew).fill(0)
        field[0] = 1;
        field[this.sizeh * this.sizew - 1] = -1;
        this.state = {
            gameState: {
                field: field,
                to_move: 1
            }
        };

    }

    handleCellClick = (h, w) => {
        const field = this.state.gameState.field.slice();
        field[h * this.sizew + w] += 1;

        this.setState({gameState:{field:field}});
    };


    render() {
        return (

            <div className="columns">
                <div className="column is-three-quarters">
                    <Field sizeh={this.sizeh} sizew={this.sizew} onCellClick={this.handleCellClick}
                           field={this.state.gameState.field}/>
                </div>
                <div className="column">
                    <InfoBar onMenuClick={this.props.onMenuClick}/>
                </div>
            </div>


        )
    }
}

export default Game