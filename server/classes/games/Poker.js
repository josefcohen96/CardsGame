const CardsGame = require('./CardsGame');

class Poker extends CardsGame {
  constructor(players = [], deck) {
    super(players, deck, 6);
  }

  validatePlay() {
    return true; // Poker doesn't involve direct card-playing validation
  }

  handleTurn(playerId) {
    console.log(`${playerId}'s turn. You can bet, check, or fold.`);
  }
}

module.exports = Poker;
