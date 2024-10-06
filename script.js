'use strict';

let score1 = document.getElementById('score--0');
let score2 = document.getElementById('score--1');

const name1 = document.getElementById('name--0');
const name2 = document.getElementById('name--1');

let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');

let currentScore1 = document.getElementById('current-score--0');
let currentScore2 = document.getElementById('current-score--1');

const newGameButton = document.querySelector('.button-new');
const holdButton = document.querySelector('.button-hold');
const rollButton = document.querySelector('.button-roll');
const diceImage = document.querySelector('.dice');

score1.textContent = 0;
score2.textContent = 0;

let currentScore, scores, activePlayer, playing;

const initial = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  score1.textContent = 0;
  score2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;

  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
initial();

const switchTheUser = function () {
  document.getElementById(`current-score--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

diceImage.classList.add('hidden');

//rolling the dice
rollButton.addEventListener('click', function () {
  if (playing) {
    //on clicking the roll button a random number will be generated
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNumber);
    //displaying a dice

    diceImage.classList.remove('hidden');
    diceImage.src = `${randomNumber}.png`;

    //check if 1 switch to another player
    if (randomNumber !== 1) {
      //add dice to the current score
      currentScore += randomNumber; //currentscore = currentscore + randomnumber
      document.getElementById(`current-score--${activePlayer}`).textContent =
        currentScore;
      console.log(`the player is number ${activePlayer}`);
    } else {
      //switch to next player
      switchTheUser();
    }
  }
});
let mainScore = 0;
//holding the score
holdButton.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; //this is the main score
    console.log(`the hold is by player ${activePlayer}`);
    //check if the players score is greater than the specified number
    if (scores[activePlayer] >= 20) {
      //end the game
      playing = false;
      diceImage.classList.add('hidden');
      console.log(`the ${activePlayer} player won`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switching the user
      switchTheUser();
    }
    //when after winning if a person still presses the button in the if statement laying will be false
  }
});

newGameButton.addEventListener('click', initial);
