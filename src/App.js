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
            $('#sideNav').animate({"width": 272}, 500);
            document.getElementById("sideNav").className = "navbar navbar-expand-lg navbar-dark bg-primary fixed-top";
            document.getElementById("sideNav").style.display = "flex";
            $('.scoretable').animate({"width": 0},500, 0, function () {
                document.getElementById('tablescore').className += " hidden";
            });
        } else {
            $(document.body).animate({"paddingLeft": 0});
            $('#sideNav').animate({"width": 0}, 500, 0, function () {
                document.getElementById("sideNav").className += " hidden";
            });
            document.getElementById("tablescore").className = "col-sm-auto align-items-center justify-content-center scoretable";
            $('#tablescore').animate({"width": 300}, 1000, 0, function() {
                $('#tablescore').css("width", "");
            });
        }
    }

    setDoubles = () => {
        let game = {...this.state.game};
        game.doubles++;
        this.setState({game});
    };

    setTriples = () => {
        let game = {...this.state.game};
        game.triples++;
        this.setState({game});
    };

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
                    playerOne={this.state.playerOne}
                    playerTwo={this.state.playerTwo}
                    game={this.state.game}
                    toggleNavbarBack={this.toggleNavbarBack}
                    setDoubles={this.setDoubles}
                    setTriples={this.setTriples}
                />
                <Hint/>
            </div>
        );
    }
}

export default App;
