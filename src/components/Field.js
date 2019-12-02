import React from "react";

function resolveImagePath(state) {
    let path = "/img/";
    switch (state) {
        case 0: path += "empty.png"; break;
        case 1: path += "blueActive.png"; break;
        case 2: path += "blueBase.png"; break;
        case -1: path += "redActive.png"; break;
        case -2: path += "redBase.png"; break;
        default: path += "empty.png"; break;

    }
    return path;
}

class Cell extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const img_path = resolveImagePath(this.props.state);
        return (
            <img alt="cell" className="cell" src={img_path}
                 onClick={this.props.onClick.bind(this, this.props.h, this.props.w)}/>
        )
    }
}
class FieldRow extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const row = [...Array(this.props.size).keys()].map(number => {
            const h = this.props.N;
            const w = number;
            const key = h * this.props.size + w;
            let state = this.props.field[key];
            return <Cell h={h} w={w} key={key}
                         onClick={this.props.onCellClick}
                         state={state}/>
        });
        return (
            <div className="field-row">
                {row}
            </div>
        );
    }



}

class Field extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        this.fieldElement = [...Array(this.props.sizeh).keys()].map(number => {
            return <FieldRow size={this.props.sizew} N={number} key={number}
                             onCellClick={this.props.onCellClick} field={this.props.field}/>
        });
        return (
            <div className="game-field">
                    {this.fieldElement}
            </div>
        )
    }
}

export default Field

