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
  if (!currentGame.winner && !currentGame.board[e.target.id]) {
    e.target.innerText = currentGame.turn.token;
    currentGame.placeToken(e.target.id);
  }
}

function updateTurn() {
  if (!currentGame.winner) {
    turnTracker.innerText = `It's ${currentGame.turn.token}'s turn!`;
  } else {
    turnTracker.innerText = `${currentGame.winner.token} is the winner!`;
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
    }, 3000);
  }
}
