import React from 'react';
import Game from './components/Game';
import Menu from './components/Menu';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activePage: 'menu'};
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleGameClick = this.handleGameClick.bind(this)

    }

    handleGameClick = () => {
        this.setState({activePage: 'game'});
    };

    handleMenuClick = () => {
        this.setState({activePage: 'menu'});
    };

    render() {
        const activePage = this.state.activePage;
        let element;

        if (activePage === 'menu') {
            element = <Menu onGameClick={this.handleGameClick}/>;
        } else {
            element = <Game onMenuClick={this.handleMenuClick}/>;
        }
        return element;
    }
}

export default App