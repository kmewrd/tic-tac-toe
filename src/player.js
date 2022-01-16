class Player {
  constructor(id, token) {
    this.id = id;
    this.token = token;
    this.squaresOccupied = [];
    this.wins = [];
  }
  placeToken(game, id) {
    if (!game.board[id]) {
      game.board[id] = game.turn.token;
      game.turn.squaresOccupied.push(id);
      game.checkForWinner();
    }
  }
};
