import React, {Component} from 'react';

class Hint extends Component {
    render() {
        return (
            <section id="help">
                <div>
                    <h2>About the game</h2>
                    <div>
                        <p>This is the simplest of games. Each player starts with a score of 301 and takes turns to
                            throw 3 darts. The score for each turn is calculated and
                            deducted from the players total. Bullseye scores 50, the outer ring scores 25 and a dart in
                            the double or treble ring counts double or treble the segment score. The objective is to be
                            the first player to reduce the score to exactly zero, the only caveat being that the last
                            dart thrown must land in a double or the bullseye.</p>

                        <p>If a player reduces the score to 1 or goes below zero, the score is bust, that turn ends
                            immediately and the score is returned to what it was at the start of that turn. e.g. if a
                            player has 32 to go out and the first dart is a 16, the second is a 15, the player is bust
                            and the score is returned to 32. So on the last turn, it is not necessary to throw all 3
                            darts - a player can win with the first or second dart of the turn.</p>

                        <p>Because a player who misses a targeted double is likely to score the single of that segment,
                            good players attempt to leave themselves with a repeatably bisectable number such as 24 or
                            most
                            ideally 32 - double 16. So for instance, if a player has double 16 left, and hits a 16, he
                            has
                            double 8 left and if he then hits an 8 he has double 4 left and so on - this is advantageous
                            because no extra darts need to be thrown in order to reduce the score to an even number...
                            It so
                            often happens that people reduce their score to 1 (typically while aiming for double 1),
                            some
                            people play a very unofficial rule called "splitting the 11". This rule says that when the
                            score
                            is reduced to 1, instead of going bust, the player must "split the 11" by throwing a dart
                            between the two numbers forming the number 11 on the edge of the board. This is tricky.</p>

                        <p>When the score goes below 171, professional players know the numbers to aim at order to check
                            out in a single turn with 3 darts.</p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Hint;