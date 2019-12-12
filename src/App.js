import React from 'react';
import Game from './components/Game';
import Menu from './components/Menu';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activePage: 'menu'};
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this)

    }

    handleNavigation = (page) => {
        this.setState({activePage: page});
    };

    handleMenuClick = () => {
        this.setState({activePage: 'menu'});
    };

    render() {
        const activePage = this.state.activePage;
        let element;
        switch (activePage) {
            case 'menu':
                element = <Menu onNavigationClick={this.handleNavigation}/>;
                break;
            case 'tony':
                element = <Game type='ai' aiType='tony' onMenuClick={this.handleMenuClick}/>;
                break;
            case 'offline':
                element = <Game type='offline' onMenuClick={this.handleMenuClick}/>;
                break;
            default:
                element = <Menu onNavigationClick={this.handleNavigation}/>;
                break;
        }
        return <div>{element}</div>;
    }
}

export default App