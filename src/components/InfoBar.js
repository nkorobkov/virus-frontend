import React, {Component} from "react";

class InfoBar extends Component {
    render() {
        return (

                <div className="has-text-centered">
                    <div className="button sidebar-button button-on-info" onClick={this.props.onMenuClick}>Menu</div>
                </div>

        )
    }
}

export default InfoBar;