class Game {
  constructor(gridSize) {
    this.playerLeft = new Player("X", "./assets/x-icon.svg");
    this.playerRight = new Player("O", "./assets/o-icon.svg");
    this.startingPlayer = "left";
    this.turn = this.playerLeft;
    this.winner = null;
    if (gridSize === 3) {
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
        ["AA", "BA", "CA"],
        ["AB", "BB", "CB"],
        ["AC", "BC", "CC"],
        ["AA", "BB", "CC"],
        ["AC", "BB", "CA"]
      ];
    }
    if (gridSize === 4) {
  		this.board = {
        AA: null,
        AB: null,
        AC: null,
  			AD: null,
        BA: null,
        BB: null,
        BC: null,
  			BD: null,
        CA: null,
        CB: null,
        CC: null,
  			CD: null,
  			DA: null,
  			DB: null,
  			DC: null,
  			DD: null
      };
  		this.winningConditions = [
  	    ["AA", "AB", "AC", "AD"],
  	    ["BA", "BB", "BC", "BD"],
  	    ["CA", "CB", "CC", "CD"],
  			["DA", "DB", "DC", "DD"],
  	    ["AA", "BA", "CA", "DA"],
  	    ["AB", "BB", "CB", "DB"],
  	    ["AC", "BC", "CC", "DC"],
  			["AD", "BD", "CD", "DD"],
  	    ["AA", "BB", "CC", "DD"],
  	    ["AD", "BC", "CB", "DA"]
  	  ];
  	}
    if (gridSize === 5) {
  		this.board = {
        AA: null,
        AB: null,
        AC: null,
  			AD: null,
  			AE: null,
        BA: null,
        BB: null,
        BC: null,
  			BD: null,
  			BE: null,
        CA: null,
        CB: null,
        CC: null,
  			CD: null,
  			CE: null,
  			DA: null,
  			DB: null,
  			DC: null,
  			DD: null,
  			DE: null,
  			EA: null,
  			EB: null,
  			EC: null,
  			ED: null,
  			EE: null
      };
  		this.winningConditions = [
  		  ["AA", "AB", "AC", "AD", "AE"],
  	    ["BA", "BB", "BC", "BD", "BE"],
  	    ["CA", "CB", "CC", "CD", "CE"],
  			["DA", "DB", "DC", "DD", "DE"],
  			["EA", "EB", "EC", "ED", "EE"],
  	    ["AA", "BA", "CA", "DA", "EA"],
        ["AB", "BB", "CB", "DB", "EB"],
        ["AC", "BC", "CC", "DC", "EC"],
  			["AD", "BD", "CD", "DD", "ED"],
  			["AE", "BE", "CE", "DE", "EE"],
  	    ["AA", "BB", "CC", "DD", "EE"],
  	    ["AE", "BD", "CC", "DB", "EA"]
  	  ];
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
    if (!boardSquares.includes(null) && !this.winner) {
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
  resetBoard() {
    this.playerLeft.squaresOccupied = [];
    this.playerRight.squaresOccupied = [];
    this.winner = null;
    Object.keys(this.board).forEach(key => this.board[key] = null);
  }
  switchStartingPlayer() {
    if (this.startingPlayer === "left") {
      this.turn = this.playerRight;
      return this.startingPlayer = "right";
    } else {
      this.turn = this.playerLeft;
      return this.startingPlayer = "left";
    }
  }
};
