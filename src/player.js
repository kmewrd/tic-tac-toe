class Player {
  constructor(id, token) {
    this.id = id;
    this.token = token;
    this.squaresOccupied = [];
    this.wins = [];
  }
  placeToken(game, squareId) {
    if (!game.board[squareId]) {
      game.board[squareId] = game.turn.token;
      game.turn.squaresOccupied.push(squareId);
      game.checkForWinner();
    }
  }
};
