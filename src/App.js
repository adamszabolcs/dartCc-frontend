import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DartBoard from './components/dartBoard';

class App extends Component {
    render() {
        return (
            <div className="App">
                <DartBoard/>
            </div>
        );
    }
}

export default App;
