var gameBoard = document.querySelector(".game-board");
var turnTracker = document.querySelector(".turn-tracker");
var playerLeftWins = document.querySelector(".player-left-wins");
var playerRightWins = document.querySelector(".player-right-wins");
var currentGame = new Game();

gameBoard.addEventListener('click', acceptToken);

function acceptToken(e) {
  if (!currentGame.board[e.target.id]) {
    e.target.innerText = currentGame.turn.token;
    currentGame.placeToken(e.target.id);
  }
}
