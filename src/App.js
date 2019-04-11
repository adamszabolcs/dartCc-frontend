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
                playerOneOriginalScore: 301,
                playerTwoOriginalScore: 301,
                playerOneScore: 301,
                playerTwoScore: 301,
                turnCounter: 0,
                actualPlayer: "p1",
                winner: null,
                turnScore: 0,
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
            $('.scoretable').animate({"width": 0}, 500, 0, function () {
                document.getElementById('tablescore').className += " hidden";
            });
        } else {
            $(document.body).animate({"paddingLeft": 0});
            $('#sideNav').animate({"width": 0}, 500, 0, function () {
                document.getElementById("sideNav").className += " hidden";
            });
            document.getElementById("tablescore").className = "col-sm-auto align-items-center justify-content-center scoretable";
            $('#tablescore').animate({"width": 300}, 1000, 0, function () {
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

    setTurnCounter() {
        let game = {...this.state.game};
        game.turnCounter++;
        this.setState({game});
    };

    isThrowValid(playerScore, turnScore) {
        return (playerScore - turnScore) >= 2 || (playerScore - turnScore === 0);
    };

    countScore = e => {
        e.preventDefault();
        let score = this.getDartValueFromID(e);
        console.log(score);
        this.registerTurn(score, e);
    };

    setTurnScore = score => {
        let game = {...this.state.game};
        game.turnScore += score;
        this.setState({game});
    };

    setPlayerScoreRemaining = score => {
        let game = {...this.state.game};
        if (this.state.game.actualPlayer === "p1") {
            game.playerOneScore -= score;
        } else {
            game.playerTwoScore -= score;
        }
        this.setState({game});
    };

    checkWin = (e, actualPlayerScore) => {
        e.preventDefault();
        let id = this.getId(e);
        if (this.state.game.actualPlayer === "p1")
            if (id[0] === 'd' && actualPlayerScore === 0) {
                return true;
            }
        return false;
    };

    win() {
        let winner = document.getElementById(this.state.game.actualPlayer + "-win");
        winner.innerHTML = `<h1>WINNER!!!</h1>`;
        this.setWinner(this.state.game.actualPlayer);
        this.sendTurnToBackend();
    };

    sendTurnToBackend = () => {
        let body = JSON.stringify({
            game: {
                doubles: this.state.game.doubles,
                triples: this.state.game.triples,
                round: this.state.game.round,
                playerOneScore: this.state.game.playerOneScore,
                playerTwoScore: this.state.game.playerTwoScore,
                winner: this.state.game.winner
            },
            playerOne: {
                name: this.state.playerOne.name,
                wins: this.state.playerOne.wins,
                bestOfThree: this.state.playerOne.bestOfThree,
                avgPerDart: this.state.playerOne.avgPerDart,
                avgPerRound: this.state.playerOne.avgPerRound
            },
            playerTwo: {
                name: this.state.playerTwo.name,
                wins: this.state.playerTwo.wins,
                bestOfThree: this.state.playerTwo.bestOfThree,
                avgPerDart: this.state.playerTwo.avgPerDart,
                avgPerRound: this.state.playerTwo.avgPerRound
            }
        });
        fetch("http://localhost:8080/turn", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: body
        })
    };

    setWinner = player => {
        let game = {...this.state.game};
        if (player === 'p1') {
            game.winner = this.state.playerOne.name;
        } else {
            game.winner = this.state.playerTwo.name;
        }
        this.setState({game});
    };

    getId = e => {
        e.preventDefault();
        let id = e.target.getAttribute('id');
        return id;
    };

    setHighestTurn = () => {
        let player;
        if (this.state.game.actualPlayer === 'p1') {
            player = {...this.state.playerOne};
        } else {
            player = {...this.state.playerTwo};
        }
        if (this.state.game.turnScore > player.bestOfThree) {
            player.bestOfThree = this.state.game.turnScore;
        }
        if (this.state.game.actualPlayer === 'p1') {
            this.setState({playerOne: player});
        } else {
            this.setState({playerTwo: player});
        }
    };

    registerTurn = (score, e) => {
        this.setTurnCounter();
        let actualPlayerScore;
        switch (this.state.game.actualPlayer) {
            case "p1":
                actualPlayerScore = this.state.game.playerOneScore;
                break;
            case "p2":
                actualPlayerScore = this.state.game.playerTwoScore;
                break;
        }
        if (this.isThrowValid(actualPlayerScore, score)) {
            this.setTurnScore(score);
            this.setPlayerScoreRemaining(score);
            if (actualPlayerScore === 0) {
                if (this.checkWin(e, actualPlayerScore)) {
                    this.win();
                }
            }
        } else {
            this.setScoreBack();
        }
        this.setHighestTurn();
        this.changePlayer(actualPlayerScore, score);
    };

    setScoreBack() {
        let game = {...this.state.game};
        if (game.actualPlayer === 'p1') {
            game.playerOneScore = game.playerOneOriginalScore;
        } else {
            game.playerTwoScore = game.playerTwoOriginalScore;
        }
        this.setState({game});
    }

    changePlayer = (actualPlayerScore, score) => {
        if (this.state.game.turnCounter === 3 || !this.isThrowValid(actualPlayerScore, score)) {
            this.setOriginalScore();
            this.calculateAndSetAverage();
            this.sendTurnToBackend();
            this.setActualPlayer();
            this.revertTurnStats();
        }
    };

    getDartValueFromID = e => {
        e.preventDefault();
        let id = this.getId(e);

        if (id === 'nullbutton') {
            return 0;
        } else if (id === 'Bull') {
            this.setDoubles(this.state.game.doubles);
            return 50;
        } else if (id === 'Outer') {
            return 25;
        }

        let mod = 0;
        switch (id[0]) {
            case 's':
                mod = 1;
                break;
            case 'd':
                this.setDoubles();
                mod = 2;
                break;
            case 't':
                this.setTriples();
                mod = 3;
                break;
            default:
                mod = 1;
        }
        return mod * parseInt(id.substr(1));
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
                    countScore={this.countScore}
                />
                <Hint/>
            </div>
        );
    }

    setActualPlayer() {
        let game = {...this.state.game};
        if (game.actualPlayer === 'p1') {
            game.actualPlayer = 'p2';
        } else {
            game.round += 1;
            game.actualPlayer = 'p1';
        }
        this.setState({game});
    };

    calculateAndSetAverage() {
        let player;
        if (this.state.game.actualPlayer === 'p1') {
            player = {...this.state.playerOne};
            player.avgPerDart = (((301 - this.state.game.playerOneScore) / this.state.game.round) / 3).toFixed(1);
            player.avgPerRound = (player.avgPerDart*3).toFixed(1);
            this.setState({playerOne:player});
        } else {
            player = {...this.state.playerTwo};
            player.avgPerDart = (((301 - this.state.game.playerTwoScore) / this.state.game.round) / 3).toFixed(1);
            player.avgPerRound = (player.avgPerDart*3).toFixed(1);
            this.setState({playerTwo:player});
        }
    };

    revertTurnStats() {
        let game = {...this.state.game};
        // if (this.state.game.actualPlayer === 'p1') {
        //     game.playerOneScore = this.state.playerOne.turnScore;
        // } else {
        //     game.playerTwoScore = this.state.playerTwo.turnScore;
        // }
        game.turnScore = 0;
        game.turnCounter = 0;
        this.setState({game});
    };

    setOriginalScore() {
        let game = {...this.state.game};
        if (game.actualPlayer === "p1") {
            game.playerOneOriginalScore = game.playerOneScore;
        } else {
            game.playerTwoOriginalScore = game.playerTwoScore;
        }
        this.setState({game});
    }
}

export default App;
