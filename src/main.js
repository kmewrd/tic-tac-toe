var selectionBox = document.querySelector(".selection-box");
var gridThreeSelection = document.getElementById("gridThree");
var gridFourSelection = document.getElementById("gridFour");
var gridFiveSelection = document.getElementById("gridFive");
var startButton = document.querySelector(".js-start-button");
var gameBoard = document.querySelector(".js-game-board");
var gameStatus = document.querySelector(".js-game-status");
var newGameButton = document.querySelector(".js-new-button");
var playerLeftWins = document.querySelector(".js-player-left-wins");
var playerRightWins = document.querySelector(".js-player-right-wins");
var game;

startButton.addEventListener('click', function(e) {
  e.preventDefault();
  loadGame();
  hide(selectionBox);
  show(gameStatus);
  show(gameBoard);
  show(newGameButton);
});

gameBoard.addEventListener('click', function(e) {
  renderToken(e);
});

newGameButton.addEventListener('click', function() {
  show(selectionBox);
  hide(gameBoard);
  hide(gameStatus);
  hide(newGameButton);
});

function loadGame() {
  if (gridThreeSelection.checked) {
		game = new Game(3);
    createGameBoard(3);
	}
	if (gridFourSelection.checked) {
		game = new Game(4);
    createGameBoard(4);
  }
	if (gridFiveSelection.checked) {
		game = new Game(5);
    createGameBoard(5);
	}
  updateWins(game.playerLeft);
  updateWins(game.playerRight);
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
      createGameBoard(game.gridSize);
      gameStatus.innerText = `It's ${game.turn.id}'s turn!`;
    }, 3000);
  }
};

function createGameBoard(gridSize) {
  if (gridSize === 3) {
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
	}
	if (gridSize === 4) {
		gameBoard.innerHTML = `
	  <div class="game-board-row">
	    <div class="game-board-square grid-4 light-blue" id="AA"></div>
	    <div class="game-board-square grid-4 mid-blue" id="AB"></div>
	    <div class="game-board-square grid-4 light-blue" id="AC"></div>
			<div class="game-board-square grid-4 mid-blue" id="AD"></div>
	  </div>
	  <div class="game-board-row">
	    <div class="game-board-square grid-4 mid-blue" id="BA"></div>
	    <div class="game-board-square grid-4 light-blue" id="BB"></div>
	    <div class="game-board-square grid-4 mid-blue" id="BC"></div>
			<div class="game-board-square grid-4 light-blue" id="BD"></div>
	  </div>
	  <div class="game-board-row">
	    <div class="game-board-square grid-4 light-blue" id="CA"></div>
	    <div class="game-board-square grid-4 mid-blue" id="CB"></div>
	    <div class="game-board-square grid-4 light-blue" id="CC"></div>
			<div class="game-board-square grid-4 mid-blue" id="CD"></div>
	  </div>
		<div class="game-board-row">
	    <div class="game-board-square grid-4 mid-blue" id="DA"></div>
	    <div class="game-board-square grid-4 light-blue" id="DB"></div>
	    <div class="game-board-square grid-4 mid-blue" id="DC"></div>
			<div class="game-board-square grid-4 light-blue" id="DD"></div>
	  </div>
	  `
	}
	if (gridSize === 5) {
		gameBoard.innerHTML = `
	  <div class="game-board-row">
	    <div class="game-board-square grid-5 light-blue" id="AA"></div>
	    <div class="game-board-square grid-5 mid-blue" id="AB"></div>
	    <div class="game-board-square grid-5 light-blue" id="AC"></div>
			<div class="game-board-square grid-5 mid-blue" id="AD"></div>
			<div class="game-board-square grid-5 light-blue" id="AE"></div>
	  </div>
	  <div class="game-board-row">
	    <div class="game-board-square grid-5 mid-blue" id="BA"></div>
	    <div class="game-board-square grid-5 light-blue" id="BB"></div>
	    <div class="game-board-square grid-5 mid-blue" id="BC"></div>
			<div class="game-board-square grid-5 light-blue" id="BD"></div>
			<div class="game-board-square grid-5 mid-blue" id="BE"></div>
	  </div>
	  <div class="game-board-row">
	    <div class="game-board-square grid-5 light-blue" id="CA"></div>
	    <div class="game-board-square grid-5 mid-blue" id="CB"></div>
	    <div class="game-board-square grid-5 coral-5" id="CC"></div>
			<div class="game-board-square grid-5 mid-blue" id="CD"></div>
			<div class="game-board-square grid-5 light-blue" id="CE"></div>
	  </div>
		<div class="game-board-row">
	    <div class="game-board-square grid-5 mid-blue" id="DA"></div>
	    <div class="game-board-square grid-5 light-blue" id="DB"></div>
	    <div class="game-board-square grid-5 mid-blue" id="DC"></div>
			<div class="game-board-square grid-5 light-blue" id="DD"></div>
			<div class="game-board-square grid-5 mid-blue" id="DE"></div>
	  </div>
		<div class="game-board-row">
	    <div class="game-board-square grid-5 light-blue" id="EA"></div>
	    <div class="game-board-square grid-5 mid-blue" id="EB"></div>
	    <div class="game-board-square grid-5 light-blue" id="EC"></div>
			<div class="game-board-square grid-5 mid-blue" id="ED"></div>
			<div class="game-board-square grid-5 light-blue" id="EE"></div>
	  </div>
	  `
	}
};

function flashToken(e) {
  if (!game.winner && e.target.classList.contains("token")) {
    e.target.classList.add("game-board-square--filled");
    setTimeout(function() {
      e.target.classList.remove("game-board-square--filled");
    }, 500);
  }
};

function show(element) {
  element.classList.remove("hidden");
};

function hide(element) {
  element.classList.add("hidden");
};
