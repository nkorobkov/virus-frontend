import React, {Component} from "react";

class InfoBar extends Component {
    render() {
        return <section className="hero is-primary is-fullheight">
            <div className="hero-head has-text-centered">
                <section className="section">

                    <div className="button is-large is-outlined" onClick={this.props.onMenuClick}>Menu</div>
                </section>
            </div>
        </section>;
    }
}

export default InfoBar;