const ROCK = "rock";
const PAPER = "paper";
const SCISSOR = "scissors";

const states = [ROCK, PAPER, SCISSOR];

let wins = 0;
let losses = 0;
let ties = 0;

// Indicates whether the user has won or not.
function userHasWon(userState, systemState) {
  return (
    (userState === ROCK && systemState === SCISSOR) ||
    (userState === PAPER && systemState === ROCK) ||
    (userState === SCISSOR && systemState === PAPER)
  );
}

// Indicates whether the user has lost or not.
function userHasLost(userState, systemState) {
  return (
    (systemState === ROCK && userState === SCISSOR) ||
    (systemState === PAPER && userState === ROCK) ||
    (systemState === SCISSOR && userState === PAPER)
  );
}

// Show win or loss on screen
function displayGameState(text) {
  document.getElementById("game-state-text").innerHTML = text;
}

// Display user and system movement on the screen
function displayGameStateImage(userState, systemState) {
  const container = document.getElementById("game-state-image");
  container.innerHTML = `
  You
  <img src="/src/images/${userState}-emoji.png" alt="${userState}" />
  <img src="/src/images/${systemState}-emoji.png" alt="${systemState}" />
  Computer`;
}

// Display scores on the screen
function displayScores() {
  const container = document.getElementById("scores");
  container.innerHTML = `Wins: ${wins}, Losses: ${losses}, Ties: ${ties}`;
}

// The score is determined based on the "user movement".
function play(userState) {
  const randomIndex = Math.floor(Math.random() * 3);
  const systemState = states[randomIndex];

  if (userHasWon(userState, systemState)) {
    wins++;
    displayGameState("You win.");
  } else if (userHasLost(userState, systemState)) {
    losses++;
    displayGameState("You lose.");
  } else {
    ties++;
    displayGameState("Tie.");
  }

  displayGameStateImage(userState, systemState);
  displayScores();
}

function resetScore() {
  (wins = 0), (losses = 0), (ties = 0);
  displayScores();
}
