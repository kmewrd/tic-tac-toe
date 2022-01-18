var gameBoard = document.querySelector(".js-game-board");
var gameStatus = document.querySelector(".js-game-status");
var playerLeftWins = document.querySelector(".js-player-left-wins");
var playerRightWins = document.querySelector(".js-player-right-wins");
var game;

window.addEventListener('load', loadGame);
gameBoard.addEventListener('click', function(e) {
  renderToken(e);
});

function loadGame() {
  game = new Game();
};

function renderToken(e) {
  if (!game.winner && !game.board[e.target.id] && e.target.classList.contains("game-board-square")) {
    e.target.innerHTML = `
    <img alt="player ${game.turn.id} token" class="token" src="${game.turn.token}"/>
    `;
    game.turn.placeToken(game, e.target.id);
    updateGameStatus();
  } else {
    flashToken(e);
  }
};

function updateGameStatus() {
  if (game.winner && (game.winner.id === "X" || game.winner.id === "O")) {
    gameStatus.innerText = `${game.winner.id} is the winner!`;
    updateWins(game.winner);
    restartGame();
  } else if (game.winner && game.winner === "draw") {
    gameStatus.innerText = "It's a draw!";
    restartGame();
  } else {
    gameStatus.innerText = `It's ${game.turn.id}'s turn!`;
  }
};

function updateWins(player) {
  if (player.id === "X") {
    playerLeftWins.innerText = `${game.playerLeft.wins.length} wins`;
  }
  if (player.id === "O") {
    playerRightWins.innerText = `${game.playerRight.wins.length} wins`;
  }
};

function restartGame() {
  if (game.winner) {
    setTimeout(function() {
      game.resetBoard();
      game.switchStartingPlayer();
      clearGameBoard();
      gameStatus.innerText = `It's ${game.turn.id}'s turn!`;
    }, 3000);
  }
};

function clearGameBoard() {
  gameBoard.innerHTML = `
  <div class="game-board-row">
    <div class="game-board-square light-blue" id="AA"></div>
    <div class="game-board-square mid-blue" id="AB"></div>
    <div class="game-board-square light-blue" id="AC"></div>
  </div>
  <div class="game-board-row">
    <div class="game-board-square mid-blue" id="BA"></div>
    <div class="game-board-square coral" id="BB"></div>
    <div class="game-board-square mid-blue" id="BC"></div>
  </div>
  <div class="game-board-row">
    <div class="game-board-square light-blue" id="CA"></div>
    <div class="game-board-square mid-blue" id="CB"></div>
    <div class="game-board-square light-blue" id="CC"></div>
  </div>
  `
};

function flashToken(e) {
  if (!game.winner && e.target.classList.contains("token")) {
    e.target.classList.add("game-board-square--filled");
    setTimeout(function() {
      e.target.classList.remove("game-board-square--filled");
    }, 500);
  }
};
