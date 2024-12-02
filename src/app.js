const ROCK = "rock";
const PAPER = "paper";
const SCISSOR = "scissors";

const states = [ROCK, PAPER, SCISSOR];

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

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
  document.querySelector(".game-state-text").innerHTML = text;
}

// Display user and system movement on the screen
function displayGameStateImage(userState, systemState) {
  const container = document.querySelector(".game-state-image");
  container.innerHTML = `
  You
  <img class="move-image" src="/src/images/${userState}-emoji.png" alt="${userState}" />
  <img class="move-image" src="/src/images/${systemState}-emoji.png" alt="${systemState}" />
  Computer`;
}

// Display scores on the screen
function displayScores() {
  const container = document.querySelector(".scores");
  container.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function saveScoreInLocalStorage() {
  localStorage.setItem("score", JSON.stringify(score));
}

// The score is determined based on the "user movement".
function play(userState) {
  const randomIndex = Math.floor(Math.random() * 3);
  const systemState = states[randomIndex];

  if (userHasWon(userState, systemState)) {
    score.wins += 1;
    saveScoreInLocalStorage();
    displayGameState("You win.");
  } else if (userHasLost(userState, systemState)) {
    score.losses += 1;
    saveScoreInLocalStorage();
    displayGameState("You lose.");
  } else {
    score.ties += 1;
    saveScoreInLocalStorage();
    displayGameState("Tie.");
  }

  displayGameStateImage(userState, systemState);
  displayScores();
}

function resetScore() {
  localStorage.clear();
  displayScores();
}

// initial score display
displayScores();
