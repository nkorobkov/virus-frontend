import React from "react";

class OnlineModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="container">
            <div className="tile is-ancestor">
                <div className="tile is-parent">
                    <div className="tile is-child notification">
                        Create room
                    </div>
                </div>
                <div className="tile is-parent">

                    <div className="tile is-child notification">
                        Join room
                    </div>

                </div>
            </div>


        </div>)
    }
}

export default OnlineModal