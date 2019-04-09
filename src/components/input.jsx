import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerOne: "",
            playerTwo: ""
        }
    }

    createGame = () => {
        let players = {
            playerOne: this.state.playerOne,
            playerTwo: this.state.playerTwo
        };
        fetch("localhost:8080/create-game", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: players
        })
    };

    handleChange = e => {
        e.preventDefault();
        if (e.target.name === "player1name") {
            this.setState({
                playerOne: e.target.value,
            });
            console.log(this.state.playerOne);
        } else {
            this.setState({
                playerTwo: e.target.value,
            });
            console.log(this.state.playerTwo);
        }
    };

    render() {
        return (
            <section className="resume-section d-flex" id="letsplay">
                <div className="text-center">
                    <h1>LET'S PLAY!</h1>
                    <form method="post" onSubmit={this.createGame}>
                        <input type="text" name="player1name" value={this.state.playerOne} placeholder="Player 1 name" onChange={this.handleChange}/>
                        <input type="text" name="player2name" value={this.state.playerTwo} placeholder="Player 2 name" onChange={this.handleChange}/>
                        <button type="submit"><a href="#board"> Let's play!</a></button>
                    </form>
                </div>
            </section>
        );
    }
}

export default Input;