/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //! 1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1; //scoping chain

        //! 2. Display the result
        var diceDOM = document.querySelector('.dice'); //dry principle
        diceDOM.style.display = 'block'; // make it visible again
        diceDOM.src = 'dice-' + dice + '.png'; //change the src of the dices

        //! 3. Update the round score IF the rolled number was not a 1

        //if dice is not 1;
        if (dice !== 1) {
            //* Add score

            // Store the score so that it will add up; roundScore = roundScore + dice;
            roundScore += dice;

            // Maniplaute the current player's current score
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //! 1. Add current score to globel score

        // Store the current score to the global score; scores[activePlayer] = scores[activePlayer] + Roundscore;
        scores[activePlayer] += roundScore;

        //! 2. Update the UI

        // Update the global score of the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //! 3. Check if the player won the game

        //If the current player reached 100
        if (scores[activePlayer] >= 5) {
            // Set the player name into winner!
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';

            // Hide the dice
            document.querySelector('.dice').style.display = 'none';

            // toggle the winner css style
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    //* Next Player

    // Toggle between two players; vice versa;
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    // Set the roundscore back to zero
    roundScore = 0;

    // Set the current score to zero
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // Set the one who is currently playing into playing mode;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Hide the dice so that it will have a break;
    document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0, 0]; //total scores
    roundScore = 0; //current scores
    activePlayer = 0; //which means first player 9(zero based - scores); //we also use this for selecting a player using 1 and 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'; // hide the dice;

    // Set all the scores to zero;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Back to the default name
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // remove all the classes that are not orginally implimented at first;
    document.querySelector('.player-0-panel').classList.remove('active'); //it may be duplicated;
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    // add the default active class
    document.querySelector('.player-0-panel').classList.add('active');
}
