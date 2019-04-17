import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Input extends Component {

    constructor(props) {
        super(props);
    }

    createGame = () => {
        let players = JSON.stringify({
            playerOne: this.props.playerOne.name,
            playerTwo: this.props.playerTwo.name
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
            .then(localStorage.setItem("playerOne", this.props.playerOne.name))
            .then(localStorage.setItem("playerTwo", this.props.playerTwo.name))
            .then(window.location.hash = "#board")
            .then(this.props.toggleNavbar())
            .then(this.props.setGameId(localStorage.getItem("gameId")))
            .then(document.getElementById('p1-nameH1').className = 'highlighted');
    };


    render() {
        return (
            <section className="resume-section d-flex justify-content-center" id="letsplay" style={{padding: "5rem"}}>
                <div className="text-center">
                    <h1 style={{color: "#e33717"}}>LET'S PLAY!</h1>
                    <br/>
                    <form>
                        <input className="form-control"
                               type="text" name="p1name" value={this.props.playerOne.name}
                               placeholder="Player 1 name"
                               onChange={this.props.setPlayersName}
                               />
                        <br/>
                        <input className="form-control"
                               type="text" name="p2name" value={this.props.playerTwo.name}
                               placeholder="Player 2 name"
                               onChange={this.props.setPlayersName}
                               />
                        <br/>
                        <a className="btn playbutton fontchange" onClick={this.createGame}> LET'S PLAY!</a>
                    </form>
                </div>
            </section>
        );
    }
}

export default Input;