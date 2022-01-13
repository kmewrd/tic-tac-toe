class Game {
	constructor(startingPlayer) {
		this.playerLeft = new Player("left", "👾");
		this.playerRight = new Player("right", "🤖");
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
			this.board[id] = this.turn.token;
			this.turn.squaresOccupied.push(id);
      this.checkForWinner();
		}
	}
  checkForWinner() {
	  for (var i = 0; i < this.winningConditions.length; i++) {
		  if (this.winningConditions[i].every(square => this.turn.squaresOccupied.includes(square))) {
		  this.declareWinner();
		  }
	  }
    this.checkForDraw();
  }
	checkForDraw() {
    var boardSquares = Object.values(this.board);
    if (!boardSquares.includes(null)) {
      this.declareDraw();
    } else {
      this.switchPlayer();
    }
	}
	declareWinner() {
    this.turn.wins.push(this.board);
		this.winner = this.turn;
  }
  declareDraw() {
    this.winner = "draw";
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
