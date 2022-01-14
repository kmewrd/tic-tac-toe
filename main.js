var gameBoard = document.querySelector(".game-board");
var turnTracker = document.querySelector(".turn-tracker");
var playerLeftWins = document.querySelector(".player-left__wins");
var playerRightWins = document.querySelector(".player-right__wins");
var currentGame;

window.addEventListener('load', loadFirstGame);
gameBoard.addEventListener('click', function(e) {
  acceptToken(e);
  updateTurn();
  updateWins();
  restartGame();
});

function loadFirstGame() {
  currentGame = new Game();
};

function acceptToken(e) {
  if (!currentGame.winner && !currentGame.board[e.target.id] && e.target.classList.contains("game-board__square")) {
    e.target.innerText = currentGame.turn.token;
    currentGame.placeToken(e.target.id);
  }
}

function updateTurn() {
  if (!currentGame.winner) {
    turnTracker.innerText = `It's ${currentGame.turn.token}'s turn!`;
  }
  if (currentGame.winner) {
    if (currentGame.winner.id === "left" || currentGame.winner.id === "right") {
      turnTracker.innerText = `${currentGame.winner.token} is the winner!`;
    } else {
      turnTracker.innerText = "It's a draw!";
    }
  }
}

function updateWins() {
  if (currentGame.winner && currentGame.winner.id === "left") {
    playerLeftWins.innerText = `${currentGame.playerLeft.wins.length} wins`;
  }
  if (currentGame.winner && currentGame.winner.id === "right") {
    playerRightWins.innerText = `${currentGame.playerRight.wins.length} wins`;
  }
}

function restartGame() {
  if (currentGame.winner) {
    setTimeout(function() {
      currentGame.resetBoard();
      turnTracker.innerText = `It's ${currentGame.turn.token}'s turn!`;
      clearGameBoard();
    }, 3000);
  }
}

function clearGameBoard() {
  gameBoard.innerHTML = "";
  gameBoard.innerHTML += `
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
}
