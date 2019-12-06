import React, {Component} from "react";

class InfoBar extends Component {
    render() {
        return (

            <div className='container'>
                <div className="tile is-ancestor">
                    <div className="tile is-parent is-12 is-fullheight">
                        <div className="tile notification is-child is-info">

                            <div className="button is-large is-outlined" onClick={this.props.onMenuClick}>Menu</div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default InfoBar;