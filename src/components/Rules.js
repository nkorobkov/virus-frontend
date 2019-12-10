import React from "react";


class Rules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 1,
            data: {
                1: {
                    imgSrc: "/img/rules/1.png",
                    element: <div className="rules-text content">
                        <ul>
                            <li>Two players play on square grid.</li>
                            <li>Each player can make 3 steps on a cell near his active dots (viruses) during his turn.
                            </li>
                        </ul>
                    </div>
                },
                2: {
                    imgSrc: "/img/rules/2.png",
                    element: <div className="rules-text content">
                        <ul>
                            <li>If you make a step on opponents virus, you create a base.</li>
                            <li>Each base can either be active or inactive.</li>
                        </ul>
                    </div>
                },
                3: {
                    imgSrc: "/img/rules/3.png",
                    element: <div className="rules-text content">
                        <ul>
                            <li>Any base, that have a virus or <b>active</b> base near it is active.</li>
                        </ul>
                    </div>
                },
                4: {
                    imgSrc: "/img/rules/4.png",
                    element: <content className="rules-text content">
                        <ul>
                            <li>You can make steps on cells that are near viruses, or active bases.</li>
                            <li>Inactive bases can not produce viruses.</li>
                        </ul>
                    </content>
                },
                5: {
                    imgSrc: "/img/rules/5.png",
                    element: <div className="rules-text content">
                        <ul>
                            <li>Player that can not make a legal 3-step move loses.</li>
                            <li>That's it! What the winning move for white would be here?</li>
                        </ul>
                    </div>
                }

            }
        }

        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
    }

    onNext = () => {
        if (this.state.currentSlide === Object.keys(this.state.data).length) {
            return
        }
        this.setState({currentSlide: this.state.currentSlide + 1})
    };

    onPrev = () => {
        if (this.state.currentSlide === 1) {
            return
        }
        this.setState({currentSlide: this.state.currentSlide - 1})
    };

    render() {
        return (<div>
            <div className="has-text-centered rules-title is-bold">Rules</div>
            <div className="container">
                <div className="columns">
                    <div className="column is-5-tablet rules-image">
                        <img src={this.state.data[this.state.currentSlide].imgSrc}/>
                    </div>
                    <div className="column rules-text">
                        {this.state.data[this.state.currentSlide].element}
                    </div>
                </div>
            </div>
            <div disabled={this.state.currentSlide === Object.keys(this.state.data).length}
                    className="button rules-button rules-next-button button-on-danger"
                    onClick={this.onNext}> Next
            </div>
            <div disabled={this.state.currentSlide === 1}
                    className="button rules-button rules-prev-button button-on-danger"
                    onClick={this.onPrev}> Previous
            </div>
            <div className="button rules-button rules-back-button button-on-danger"
                    onClick={this.props.onCloseClick}>Close
            </div>
        </div>)
    }
}

export default Rules