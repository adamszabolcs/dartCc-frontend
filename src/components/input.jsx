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
        });
        this.props.toggleNavbar();
    };



    render() {
        return (
            <section className="resume-section d-flex" id="letsplay" style={{padding: "5rem"}}>
                <div className="text-center">
                    <h1>LET'S PLAY!</h1>
                    <form>
                        <input className="form-control"
                               type="text" name="p1name" value={this.props.playerOne.name}
                               placeholder="Player 1 name"
                               onChange={this.props.getPlayerName}/>
                        <br/>
                        <input className="form-control"
                               type="text" name="p2name" value={this.props.playerTwo.name}
                               placeholder="Player 2 name"
                               onChange={this.props.getPlayerName}/>
                        <br/>
                        <a className="btn btn-primary" onClick={this.createGame} href="#board"> Let's
                            play!</a>
                    </form>
                </div>
            </section>
        );
    }
}

export default Input;