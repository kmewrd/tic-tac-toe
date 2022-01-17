var gameBoard = document.querySelector(".game-board");
var turnTracker = document.querySelector(".turn-tracker");
var playerLeftWins = document.querySelector(".player-left__wins");
var playerRightWins = document.querySelector(".player-right__wins");
var game;

window.addEventListener('load', loadGame);
gameBoard.addEventListener('click', function(e) {
  renderToken(e);
  updateWins();
});

function loadGame() {
  game = new Game();
};

function renderToken(e) {
  if (!game.winner && !game.board[e.target.id] && e.target.classList.contains("game-board__square")) {
    e.target.innerHTML = `
    <img alt="player ${game.turn.id} token" class="token" src="${game.turn.token}"/>
    `;
    game.turn.placeToken(game, e.target.id);
    updateTurn();
  } else {
    flashToken(e);
  }
};

function updateTurn() {
  if (!game.winner) {
    turnTracker.innerText = `It's ${game.turn.id}'s turn!`;
  }
  if (game.winner && (game.winner.id === "X" || game.winner.id === "O")) {
    turnTracker.innerText = `${game.winner.id} is the winner!`;
    restartGame();
  }
  if (game.winner && game.winner === "draw") {
    turnTracker.innerText = "It's a draw!";
    restartGame();
  }
};

function updateWins() {
  if (game.winner && game.winner.id === "X") {
    playerLeftWins.innerText = `${game.playerLeft.wins.length} wins`;
  }
  if (game.winner && game.winner.id === "O") {
    playerRightWins.innerText = `${game.playerRight.wins.length} wins`;
  }
};

function restartGame() {
  if (game.winner) {
    setTimeout(function() {
      game.resetBoard();
      game.switchStartingPlayer();
      turnTracker.innerText = `It's ${game.turn.id}'s turn!`;
      clearGameBoard();
    }, 3000);
  }
};

function clearGameBoard() {
  gameBoard.innerHTML = `
  <div class="row-1">
    <div class="game-board__square light-blue" id="AA"></div>
    <div class="game-board__square mid-blue" id="AB"></div>
    <div class="game-board__square light-blue" id="AC"></div>
  </div>
  <div class="row-2">
    <div class="game-board__square mid-blue" id="BA"></div>
    <div class="game-board__square coral" id="BB"></div>
    <div class="game-board__square mid-blue" id="BC"></div>
  </div>
  <div class="row-3">
    <div class="game-board__square light-blue" id="CA"></div>
    <div class="game-board__square mid-blue" id="CB"></div>
    <div class="game-board__square light-blue" id="CC"></div>
  </div>
  `
};

function flashToken(e) {
  if (!game.winner) {
    e.target.classList.add("game-board__square--filled");
    setTimeout(function() {
      e.target.classList.remove("game-board__square--filled");
    }, 500);
  }
};
