import React, {Component} from 'react';
import '../resume.css';

class Table extends Component {

    checkPlayerOne() {
        if (this.props.playerOne.name === "") {
            return localStorage.getItem("playerOne");
        } else {
            return this.props.playerOne.name;
        }
    }

    checkPlayerTwo() {
        if (this.props.playerTwo.name === "") {
            return localStorage.getItem("playerTwo");
        } else {
            return this.props.playerTwo.name;
        }
    }

    render() {
        const playerOneName = this.checkPlayerOne();
        const playerTwoName = this.checkPlayerTwo();
        return (
            <div className="col-sm-auto align-items-center justify-content-center scoretable" id="tablescore">
                <div id="p1-win"></div>
                <div id="p2-win"></div>
                <table className="table table-dark float-right">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col" id="p1-nameH1">
                            {playerOneName}
                        </th>
                        <th scope="col" id="p2-nameH1">{playerTwoName}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">Score</th>
                        <td id="p1-score">{this.props.game.playerOneScore}</td>
                        <td id="p2-score">{this.props.game.playerTwoScore}</td>
                    </tr>
                    <tr>
                        <th scope="row">Actual Round</th>
                        <td id="p1-actualRound">{this.props.playerOne.turnScore}</td>
                        <td id="p2-actualRound">{this.props.playerTwo.turnScore}</td>
                    </tr>
                    <tr>
                        <th scope="row">Best of 3</th>
                        <td id="p1-bestOf">{this.props.playerOne.bestOfThree}</td>
                        <td id="p2-bestOf">{this.props.playerTwo.bestOfThree}</td>
                    </tr>
                    <tr>
                        <th scope="row">Avg/dart</th>
                        <td id="p1-avgperdart">{this.props.playerOne.avgPerDart}</td>
                        <td id="p2-avgperdart">{this.props.playerTwo.avgPerDart}</td>
                    </tr>
                    <tr>
                        <th scope="row">Avg/round</th>
                        <td id="p1-avgperround">{this.props.playerOne.avgPerRound}</td>
                        <td id="p2-avgperround">{this.props.playerTwo.avgPerRound}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;