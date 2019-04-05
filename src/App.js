import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DartBoard from './components/dartBoard';
import NavBar from './components/navBar';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <DartBoard/>
            </div>
        );
    }
}

export default App;
