import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DartBoard from './components/dartBoard';
import NavBar from './components/navBar';
import Hint from './components/hint';
import Input from './components/input';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <Input/>
                <DartBoard/>
                <Hint/>
            </div>
        );
    }
}

export default App;
