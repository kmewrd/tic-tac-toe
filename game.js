class Game {
	constructor(startingPlayer) {
		this.playerLeft = new Player("left", "x-icon.svg");
		this.playerRight = new Player("right", "o-icon.svg");
		this.startingPlayer = startingPlayer || this.playerLeft;
		this.turn = startingPlayer || this.playerLeft;
    this.winner = null;
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
    this.winningConditions = [
      ["AA", "AB", "AC"],
      ["BA", "BB", "BC"],
      ["CA", "CB", "CC"],
      ["AA", "BA", "BA"],
      ["AB", "BB", "CB"],
      ["AC", "BC", "CC"],
      ["AA", "BB", "CC"],
      ["AC", "BB", "CA"]
    ];
	}
	placeToken(id) {
		if (!this.board[id]) {
			this.board[id] = this.turn.id;
			this.turn.squaresOccupied.push(id);
      this.checkForWinnerOrDraw();
		}
	}
  checkForWinningConditions() {
	  var winner = false;
	  for (var i = 0; i < this.winningConditions.length; i++) {
		  if (this.winningConditions[i].every(square => this.turn.squaresOccupied.includes(square))) {
		  winner = true;
		  }
	  }
    return winner;
  }
	checkForWinnerOrDraw() {
    var boardSquares = Object.values(this.board);
    if (this.checkForWinningConditions() || !boardSquares.includes(null)) {
      this.declareWinner();
    } else {
      this.switchPlayer();
    }
	}
	declareWinner() {
    var boardSquares = Object.values(this.board);
    if (this.checkForWinningConditions()) {
      this.turn.wins.push(this.board);
		  this.winner = this.turn;
    }
    if (!this.checkForWinningConditions() && !boardSquares.includes(null)) {
      this.winner = "draw";
    }
	}
	switchPlayer() {
		if (this.turn === this.playerLeft) {
			return this.turn = this.playerRight;
		}
    if (this.turn === this.playerRight) {
			return this.turn = this.playerLeft;
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
};
