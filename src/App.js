import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import DartBoard from './components/dartBoard';
import NavBar from './components/navBar';
import Hint from './components/hint';
import Input from './components/input';
import $ from 'jquery';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            game: {
                doubles: 0,
                triples: 0,
                round: 1,
                playerOneScore: 301,
                playerTwoScore: 301,
                turnCounter: 0,
                actualPlayer: "p1",
                winner: null,
            },
            playerOne: {
                name: "",
                email: "",
                gamesPlayed: 0,
                bestOfThree: 0,
                wins: 0,
                turnScore: 0,
                pointRemaining: 301,
                avgPerDart: 0,
                avgPerRound: 0,
            },
            playerTwo: {
                name: "",
                email: "",
                gamesPlayed: 0,
                bestOfThree: 0,
                wins: 0,
                turnScore: 0,
                pointRemaining: 301,
                avgPerDart: 0,
                avgPerRound: 0,
            }
        }
    }

    getPlayerName = e => {
        e.preventDefault();
        if (e.target.name === "p1name") {
            this.setState({
                playerOne: {
                    name: e.target.value,
                }
            });
        } else {
            this.setState({
                playerTwo: {
                    name: e.target.value,
                }
            });
        }
    };

    toggleNavbar() {
        $(document.body).animate({"paddingLeft": 0});
        $('#sideNav').animate({"width": 0});
        document.getElementById("sideNav").className += " hidden";
    }

    toggleNavbarBack = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        if (this.state.collapsed) {
            $(document.body).animate({"paddingLeft": "17rem"});
            $('#sideNav').animate({"width": 272});
            document.getElementById("sideNav").className = "navbar navbar-expand-lg navbar-dark bg-primary fixed-top";
            document.getElementById("sideNav").style.display = "flex";
        } else {
            $(document.body).animate({"paddingLeft": 0});
            $('#sideNav').animate({"width": 0});
            document.getElementById("sideNav").className += " hidden";
        }
    }


    render() {
        return (
            <div className="App">
                <NavBar/>
                <Input
                    playerOne={this.state.playerOne}
                    playerTwo={this.state.playerTwo}
                    getPlayerName={this.getPlayerName}
                    toggleNavbar={this.toggleNavbar}
                />
                <DartBoard
                    toggleNavbarBack={this.toggleNavbarBack}
                />
                <Hint/>
            </div>
        );
    }
}

export default App;
