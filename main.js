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
    console.log("The game has a winner.");
    console.log(currentGame);
    setTimeout(function() {
      currentGame.resetBoard();
      turnTracker.innerText = `It's ${currentGame.turn.token}'s turn!`;
      console.log("The board has been reset.");
      console.log(currentGame);
      clearGameBoard();
    }, 3000);
  }
}

function clearGameBoard() {
  gameBoard.innerHTML = "";
  gameBoard.innerHTML += `
  <div class="row-1">
    <div class="game-board__square" id="AA"></div>
    <div class="game-board__square" id="AB"></div>
    <div class="game-board__square" id="AC"></div>
  </div>
  <div class="row-2">
    <div class="game-board__square" id="BA"></div>
    <div class="game-board__square" id="BB"></div>
    <div class="game-board__square" id="BC"></div>
  </div>
  <div class="row-3">
    <div class="game-board__square" id="CA"></div>
    <div class="game-board__square" id="CB"></div>
    <div class="game-board__square" id="CC"></div>
  </div>
  `
}
