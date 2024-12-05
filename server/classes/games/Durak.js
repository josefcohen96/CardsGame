const CardsGame = require('./CardsGame');

class Durak extends CardsGame {
  constructor(players = [], deck) {
    super(players, deck, 6);
  }

  validatePlay(cards) {
    // Implement Durak-specific validation logic
    return true; // Example: allow any valid card to be played
  }

  handleTurn(playerId) {
    console.log(`${playerId}'s turn. Play your cards or defend yourself!`);
  }
}

module.exports = Durak;
