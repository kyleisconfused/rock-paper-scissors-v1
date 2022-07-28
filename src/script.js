"use strict";

let computerScore = 0;
let userScore = 0;
let computerSelection, userSelection, playing;

let btns = document.querySelectorAll(".btn");
const result = document.querySelector(".results-container");
const resetBtn = document.querySelector(".reset-btn");

const init = function () {
  computerScore = 0;
  userScore = 0;
  playing = true;
};
init();

btns.forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    userSelection = img.alt.toLowerCase();

    playGame(computerSelection, userSelection);

    if (userScore === 5 || computerScore === 5) {
      declareWinner();
      playing = false;
    }
  });
});

const selectionArray = ["rock", "paper", "scissors"];

const getComputerSelection = function () {
  return selectionArray[~~(Math.random() * selectionArray.length)];
};

const playGame = function (computerSelection, userSelection) {
  if (playing) {
    computerSelection = getComputerSelection();
    userSelection = userSelection.toLowerCase();
    if (computerSelection == userSelection) {
      displayResult("It's a draw!");
    } else if (
      (computerSelection == "rock" && userSelection == "scissors") ||
      (computerSelection == "paper" && userSelection == "rock") ||
      (computerSelection == "scissors" && userSelection == "paper")
    ) {
      computerScore = ++computerScore;
      keepComputerScore();
      displayResult(
        `Computer wins the round! ${capitalizeSelection(
          computerSelection
        )} beats ${userSelection}`
      );
    } else {
      userScore = ++userScore;
      keepUserScore();
      displayResult(
        `Player wins the round! ${capitalizeSelection(
          userSelection
        )} beats ${computerSelection}`
      );
    }
  }
};

const capitalizeSelection = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const declareWinner = function () {
  if (computerScore > userScore) {
    result.textContent = `Damn, you lost. Sucks to suck.`;
  } else {
    result.textContent = `You won! You truly beat the shit out of that computer.`;
  }
  playing = false;
  resetBtn.textContent = "Play again?";
};

const displayResult = function (str) {
  result.textContent = str;
};

const resetGame = function () {
  computerScore = 0;
  userScore = 0;
  keepComputerScore();
  keepUserScore();
  init();
  result.textContent = "";
};

resetBtn.addEventListener("click", resetGame);

const keepComputerScore = function () {
  let computerScoreDisplay = document.querySelector(".computer-score");
  computerScoreDisplay.textContent = computerScore;
};

const keepUserScore = function () {
  let userScoreDisplay = document.querySelector(".user-score");
  userScoreDisplay.textContent = userScore;
};
