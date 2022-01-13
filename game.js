class Game {
	constructor(startingPlayer) {
		this.playerLeft = new Player("left", "x-icon.svg");
		this.playerRight = new Player("right", "o-icon.svg");
		this.startingPlayer = startingPlayer || this.playerLeft;
		this.turn = startingPlayer || this.playerLeft;
		this.board = {
				AA: null,
				AB: null,
				AC: null,
				BA: null,
				BB: null,
				BC: null,
				CA: null,
				CB: null,
				CC: null
		};
	}
	placeToken(id) {
		if (!this.board[id]) {
			this.board[id] = this.turn.id;
			this.turn.squaresOccupied.push(id);
      return true;
		}
    return false;
	}
  checkForWinningConfiguration() {
	  var winner = false;
	  var winningConfigurations = [
	  ["AA", "AB", "AC"],
	  ["BA", "BB", "BC"],
	  ["CA", "CB", "CC"],
	  ["AA", "BA", "BA"],
	  ["AB", "BB", "CB"],
	  ["AC", "BC", "CC"],
	  ["AA", "BB", "CC"],
	  ["AC", "BB", "CA"]
	  ];
	  for (var i = 0; i < winningConfigurations.length; i++) {
		  if (winningConfigurations[i].every(square => this.turn.squaresOccupied.includes(square))) {
		  winner = true;
		  }
	  }
  return winner;
  }
	checkForWinnerOrDraw() {
    var boardSquares = Object.values(this.board);
    if (this.checkForWinningConfiguration() || !boardSquares.includes(null)) {
      this.declareWinner();
      return true;
    } else {
      this.switchPlayer();
      return false;
    }
	}
	declareWinner() {
		var boardSquares = Object.values(this.board);
    if (this.checkForWinningConfiguration()) {
      this.turn.wins.push(this.board);
		  this.winner = this.turn;
    }
    if (!this.checkForWinningConfiguration() && !boardSquares.includes(null)) {
      this.winner = "draw";
    }
	}
  endGame() {
    this.playerLeft.squaresOccupied = [];
    this.playerRight.squaresOccupied = [];
		if (this.startingPlayer === this.playerLeft) {
			return new Game(this.playerRight);
		} else {
			return new Game(this.playerLeft);
		}
	}
	switchPlayer() {
		if (!this.checkForWinningConfiguration() && this.turn === this.playerLeft) {
			this.turn = this.playerRight;
		}
    if (!this.checkForWinningConfiguration() && this.turn === this.playerRight) {
			this.turn = this.playerLeft;
		}
	}
};
