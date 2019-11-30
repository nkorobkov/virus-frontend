import React from "react";

class Menu extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (

            <section className="hero is-primary menu-hero">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="title">Virus War Game</div>
                        <div className="button is-large is-outlined" onClick={this.props.onGameClick}>Play With Computer</div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Menu