import React, {Component} from 'react';
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
                gameId: -1,
                doubles: 0,
                triples: 0,
                round: 1,
                playerOneOriginalScore: 301,
                playerTwoOriginalScore: 301,
                playerOneScore: 301,
                playerTwoScore: 301,
                throwCounter: 0,
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

    // GETTERS AND SETTERS FOR THE GAME

    setPlayersName = e => {
        // when game created, sets players name
        e.preventDefault();
        let player;
        if (e.target.name === "p1name") {
            player = {...this.state.playerOne};
            player.name = e.target.value;
            this.setState({
                playerOne: player
            });
        } else {
            player = {...this.state.playerTwo};
            player.name = e.target.value;
            this.setState({
                playerTwo: player
            });
        }
    };

    incrementDoubles = () => {
        // if someone throws double, increment double counter
        let game = {...this.state.game};
        game.doubles++;
        this.setState({game});
    };

    incrementTriples = () => {
        // if someone throws triple, increment triple counter
        let game = {...this.state.game};
        game.triples++;
        this.setState({game});
    };

    incrementThrowCounter() {
        //if throw happened, increment throwcounter by 1
        let game = {...this.state.game};
        game.throwCounter++;
        this.setState({game});
    };

    setTurnScore = score => {
        // if throw happened, increment turnScore by score
        let actualPlayer;
        switch (this.state.game.actualPlayer) {
            case 'p1':
                actualPlayer = {...this.state.playerOne};
                actualPlayer.turnScore += score;
                this.setState({
                    playerOne: actualPlayer
                });
                break;
            case 'p2':
                actualPlayer = {...this.state.playerTwo};
                actualPlayer.turnScore += score;
                this.setState({
                    playerTwo: actualPlayer
                });
                break;
            default:
                break;
        }
        let game = {...this.state.game};
        game.turnScore += score;
        this.setState({game});
    };

    setPlayerScoreRemaining = score => {
        // if valid throw happened, subtract score from player score
        let game = {...this.state.game};
        if (this.state.game.actualPlayer === "p1") {
            game.playerOneScore -= score;
        } else {
            game.playerTwoScore -= score;
        }
        this.setState({game});
    };

    setWinner = player => {
        // if valid win condition happened, set winner
        let game = {...this.state.game};
        if (player === 'p1') {
            game.winner = this.state.playerOne.name;
        } else {
            game.winner = this.state.playerTwo.name;
        }
        this.setState({game});
    };

    getId = e => {
        // get clicked area's id on the board
        e.preventDefault();
        return e.target.getAttribute('id');
    };

    setHighestTurn = () => {
        // after turn ended, checks if players best of three is lower than turnscore,
        // if it's true, sets players best of three
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

    setScoreBack() {
        // if turn is not valid, i.e. thrown more than remaining score, score sets back to score before turn
        let game = {...this.state.game};
        if (game.actualPlayer === 'p1') {
            game.playerOneScore = game.playerOneOriginalScore;
        } else {
            game.playerTwoScore = game.playerTwoOriginalScore;
        }
        this.setState({game});
    };

    setGameId = gameId => {
        // when game created, sets the gameId
        let game = {...this.state.game};
        game.gameId = parseInt(gameId);
        this.setState({game});
    };

    setOriginalScore() {
        // if turn is valid, sets original score to player remaining score
        if (this.state.game.throwCounter === 3) {
            let game = {...this.state.game};
            if (game.actualPlayer === "p1") {
                game.playerOneOriginalScore = game.playerOneScore;
            } else {
                game.playerTwoOriginalScore = game.playerTwoScore;
            }
            this.setState({game});
        }
    }

    getDartValueFromID = e => {
        // checks if clicked areas id is simple, double or triple, sets the mod according to the first letter of id,
        // return thrown score
        e.preventDefault();
        let id = this.getId(e);

        if (id === 'nullbutton') {
            return 0;
        } else if (id === 'Bull') {
            this.incrementDoubles();
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
                this.incrementDoubles();
                mod = 2;
                break;
            case 't':
                this.incrementTriples();
                mod = 3;
                break;
            default:
                mod = 1;
        }
        return mod * parseInt(id.substr(1));
    };

    setActualPlayer() {
        // if throwCounter is 3 or turn is invalid, changes actual player, call for checkout suggestion
        let game = {...this.state.game};
        if (game.actualPlayer === 'p1') {
            document.getElementById('p2-nameH1').className = 'highlighted';
            document.getElementById('p1-nameH1').classList.remove('highlighted');
            game.actualPlayer = 'p2';
            this.callForSuggestion(this.state.game.playerTwoScore, game.actualPlayer);
        } else {
            document.getElementById('p1-nameH1').className = 'highlighted';
            document.getElementById('p2-nameH1').classList.remove('highlighted');
            game.round += 1;
            game.actualPlayer = 'p1';
            this.callForSuggestion(this.state.game.playerOneScore, game.actualPlayer);
        }
        this.setState({game});
    };

    // GAME RELATED METHODS

    registerThrow = (score, e) => {
        // register throw, checks if throw is valid, if true, sets turn score, sets remaining points,
        // calls for suggestion, checks if player wins, if throw is not valid, sets score back,
        // sets highest turn and checks if player changing is necessary
        this.incrementThrowCounter();
        this.revertTurnScoreForPlayers();
        let actualPlayerScore;
        switch (this.state.game.actualPlayer) {
            case "p1":
                actualPlayerScore = this.state.game.playerOneScore;
                break;
            case "p2":
                actualPlayerScore = this.state.game.playerTwoScore;
                break;
            default:
                break;
        }
        if (this.isThrowValid(actualPlayerScore, score)) {
            this.setTurnScore(score);
            this.setPlayerScoreRemaining(score);
            if (this.state.game.throwCounter === 1) {
                this.callForSuggestion(actualPlayerScore - score, this.state.game.actualPlayer);
            }
            if (actualPlayerScore - score === 0) {
                if (this.checkWin(e, actualPlayerScore - score)) {
                    this.win();
                } else {
                    this.setScoreBack();
                }
            }
        } else {
            this.setScoreBack();
        }
        this.setHighestTurn();
        this.changePlayer(actualPlayerScore, score);
    };

    isThrowValid(playerScore, turnScore) {
        // checks if throw is valid
        return (playerScore - turnScore) >= 2 || (playerScore - turnScore) === 0;
    };

    countScore = e => {
        // gets thrown score, starts registering the throw
        e.preventDefault();
        let score = this.getDartValueFromID(e);
        console.log(score);
        this.registerThrow(score, e);
    };

    checkWin = (e, actualPlayerScore) => {
        // checks if player won
        e.preventDefault();
        let id = this.getId(e);
        return ((id[0] === 'd' && actualPlayerScore === 0) || (id === 'Bull' && actualPlayerScore === 0));
    };

    win() {
        //sets and shows winner, send turn to backend
        console.log("WIN!!!!");
        let winner = document.getElementById(this.state.game.actualPlayer + "-win");
        let winnerPlayer;
        switch (this.state.game.actualPlayer) {
            case 'p1':
                winnerPlayer = this.state.playerOne.name === "" ?
                    localStorage.getItem("playerOne") : this.state.playerOne.name;
                break;
            case 'p2':
                winnerPlayer = this.state.playerTwo.name === "" ?
                    localStorage.getItem("playerTwo") : this.state.playerTwo.name;
                break;
            default:
                break;
        }

        this.setWinner(this.state.game.actualPlayer);
        winner.innerHTML = `<h3 style="color: white">The winner is ` + winnerPlayer + `!</h3>`;
        this.sendTurnToBackend();
    };

    changePlayer = (actualPlayerScore, score) => {
        // if throw is not valid or third throw in a turn, sets original score, calculates and sets average for player,
        // sends turn to backend, changes player and revert necessary incremented stats to zero
        if (this.state.game.throwCounter === 3 || !this.isThrowValid(actualPlayerScore, score)) {
            this.setOriginalScore();
            this.calculateAndSetAverage();
            if (this.state.game.winner === null) {
                this.sendTurnToBackend();
            }
            this.revertTurnStats();
            this.setActualPlayer();
        }
    };

    calculateAndSetAverage() {
        // calculates and sets average to player at the end of his/her turn
        let player;
        if (this.state.game.actualPlayer === 'p1') {
            player = {...this.state.playerOne};
            player.avgPerDart = (((301 - this.state.game.playerOneScore) / this.state.game.round) / 3).toFixed(1);
            player.avgPerRound = (player.avgPerDart * 3).toFixed(1);
            this.setState({playerOne: player});
        } else {
            player = {...this.state.playerTwo};
            player.avgPerDart = (((301 - this.state.game.playerTwoScore) / this.state.game.round) / 3).toFixed(1);
            player.avgPerRound = (player.avgPerDart * 3).toFixed(1);
            this.setState({playerTwo: player});
        }
    };

    revertTurnStats() {
        // after a turn, sets back the turnscore and throwcounter to zero
        let game = {...this.state.game};
        let playerOne = {...this.state.playerOne};
        let playerTwo = {...this.state.playerTwo};

        game.turnScore = 0;
        game.throwCounter = 0;
        playerOne.turnScore = 0;
        playerTwo.turnScore = 0;

        this.setState({game});
    };

    revertTurnScoreForPlayers() {
        if (this.state.game.throwCounter === 1) {
            let actualPlayer;
            switch (this.state.game.actualPlayer) {
                case 'p1':
                    actualPlayer = {...this.state.playerOne};
                    actualPlayer.turnScore = 0;
                    this.setState({
                        playerOne: actualPlayer,
                    });
                    break;
                case 'p2':
                    actualPlayer = {...this.state.playerTwo};
                    actualPlayer.turnScore = 0;
                    this.setState({
                        playerTwo: actualPlayer,
                    });
                    break;
                default:
                    break;
            }
        }
    }

    createNewGame = () => {
        this.getNewIdFromBackend();
        this.setStateBack();
    };

    setStateBack = () => {
        this.revertWinnerDiv();
        let game = {...this.state.game};
        let playerOne = {...this.state.playerOne};
        let playerTwo = {...this.state.playerTwo};
        game.doubles = 0;
        game.triples = 0;
        game.round = 1;
        game.playerOneOriginalScore = 301;
        game.playerTwoOriginalScore = 301;
        game.playerOneScore = 301;
        game.playerTwoScore = 301;
        game.throwCounter = 0;
        game.actualPlayer = "p1";
        game.winner = null;
        game.turnScore = 0;
        playerOne.bestOfThree = 0;
        playerOne.turnScore = 0;
        playerOne.avgPerDart = 0;
        playerOne.avgPerRound = 0;
        playerTwo.bestOfThree = 0;
        playerTwo.turnScore = 0;
        playerTwo.avgPerDart = 0;
        playerTwo.avgPerRound = 0;
        this.setState({
            game,
            playerOne,
            playerTwo
        });
        this.setSuggestion("p1");
    };

    //COMMUNICATION WITH BACKEND

    sendTurnToBackend = () => {
        //after turn, sends the necessary information to the backend
        let gameId = this.state.game.gameId === -1 ? localStorage.getItem("gameId") : this.state.game.gameId;
        let playerOneName = this.state.playerOne.name === "" ?
            localStorage.getItem("playerOne") : this.state.playerOne.name;
        let playerTwoName = this.state.playerTwo.name === "" ?
            localStorage.getItem("playerTwo") : this.state.playerTwo.name;
        let body = JSON.stringify({
            game: {
                id: gameId,
                doubles: this.state.game.doubles,
                triples: this.state.game.triples,
                round: this.state.game.round,
                playerOneScore: this.state.game.playerOneScore,
                playerTwoScore: this.state.game.playerTwoScore,
                winner: this.state.game.winner
            },
            playerOne: {
                name: playerOneName,
                wins: this.state.playerOne.wins,
                bestOfThree: this.state.playerOne.bestOfThree,
                avgPerDart: this.state.playerOne.avgPerDart,
                avgPerRound: this.state.playerOne.avgPerRound
            },
            playerTwo: {
                name: playerTwoName,
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

    callForSuggestion = (actualPlayerScore, actualPlayer) => {
        if (actualPlayerScore <= 170) {
            let howManyDarts = 3 - parseInt(this.state.game.throwCounter);
            let playerSuggestion;
            switch (actualPlayer) {
                case "p1":
                    playerSuggestion = "p1suggestion";
                    break;
                case "p2":
                    playerSuggestion = "p2suggestion";
                    break;
            }
            let url = "http://localhost:8080/hint-" + howManyDarts + "/" + actualPlayerScore;
            fetch(url)
                .then(resp => resp.text()
                    .then(data => localStorage.setItem(playerSuggestion, data)))
                .finally(() => {
                    this.setSuggestion(playerSuggestion);
                });
        }
    };

    getNewIdFromBackend = () => {
        let players = JSON.stringify({
            playerOne: localStorage.getItem("playerOne"),
            playerTwo: localStorage.getItem("playerTwo")
        });
        fetch("http://localhost:8080/create-game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: players,
        })
            .then(resp => resp.json())
            .then(function (data) {
                localStorage.setItem("gameId", data);
            })
            .finally(() => {
                this.setGameId(localStorage.getItem("gameId"))
            });
        localStorage.removeItem("p1suggestion");
        localStorage.removeItem("p2suggestion");
    };

    //DOM

    toggleNavbar() {
        // after game created, hides the navbar
        $(document.body).animate({"paddingLeft": 0});
        $('#sideNav').animate({"width": 0});
        document.getElementById("sideNav").className += " hidden";
    }

    toggleNavbarBack = () => {
        // if hamburger icon clicked, either table collapses and menu shown or menu collapses and table shown
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
    };

    setSuggestion(playerSuggestion) {
        let suggestion = document.getElementById("suggestion");
        if (localStorage.getItem(playerSuggestion) !== null) {
            suggestion.innerHTML = localStorage.getItem(playerSuggestion);
        } else {
            suggestion.innerHTML = "No checkout suggestion";
        }
    }

    revertWinnerDiv = () => {
        let winnerOne = document.getElementById("p1-win");
        let winnerTwo = document.getElementById("p2-win");
        winnerOne.innerHTML = "<h3></h3>";
        winnerTwo.innerHTML = "<h3></h3>";
    };

    render() {
        return (
            <div className="App">
                <NavBar/>
                <Input
                    playerOne={this.state.playerOne}
                    playerTwo={this.state.playerTwo}
                    setPlayersName={this.setPlayersName}
                    toggleNavbar={this.toggleNavbar}
                    setGameId={this.setGameId}
                />
                <DartBoard
                    playerOne={this.state.playerOne}
                    playerTwo={this.state.playerTwo}
                    game={this.state.game}
                    toggleNavbarBack={this.toggleNavbarBack}
                    countScore={this.countScore}
                    createNewGame={this.createNewGame}
                />
                <Hint/>
            </div>
        );
    }
}

export default App;
