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
            .then(console.log("sent to backend!"));
    };

    render() {
        return (
            <section className="resume-section d-flex" id="letsplay">
                <div className="text-center">
                    <h1>LET'S PLAY!</h1>
                    <form method="post">
                        <input type="text" name="player1name" value={this.props.playerOne.name}
                               placeholder="Player 1 name"
                               onChange={this.props.getPlayerName}/>
                        <input type="text" name="player2name" value={this.props.playerTwo.name}
                               placeholder="Player 2 name"
                               onChange={this.props.getPlayerName}/>
                        <button type="submit" onClick={this.createGame}><a href="#board"> Let's play!</a></button>
                    </form>
                </div>
            </section>
        );
    }
}

export default Input;