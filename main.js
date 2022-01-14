var gameBoard = document.querySelector(".game-board");
var turnTracker = document.querySelector(".turn-tracker");
var playerLeftWins = document.querySelector(".player-left-wins");
var playerRightWins = document.querySelector(".player-right-wins");
var currentGame = new Game();

gameBoard.addEventListener('click', function(e) {
  acceptToken(e);
  updateTurn();
});

function acceptToken(e) {
  if (!currentGame.winner && !currentGame.board[e.target.id]) {
    e.target.innerText = currentGame.turn.token;
    currentGame.placeToken(e.target.id);
  }
  console.log(currentGame.turn);
}

function updateTurn() {
  if (!currentGame.winner) {
    turnTracker.innerText = `It's ${currentGame.turn.token}'s turn!`;
  } else {
    turnTracker.innerText = `${currentGame.winner.token} is the winner!`;
  }
}
