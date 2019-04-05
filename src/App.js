import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DartBoard from './components/dartBoard';
import NavBar from './components/navBar';
import Hint from './components/hint';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <DartBoard/>
                <Hint/>
            </div>
        );
    }
}

export default App;
