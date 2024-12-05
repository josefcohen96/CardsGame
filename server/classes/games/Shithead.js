const CardsGame = require('./CardsGame');

class Shithead extends CardsGame {
  constructor(players = [], deck) {
    super(players, deck, 4);
  }

  validatePlay(cards) {
    const firstValue = cards[0]?.value;
    return cards.every(card => card.value === firstValue);
  }

  handleTurn(playerId) {
    console.log(`${playerId}'s turn. Play your cards!`);
  }
}

module.exports = Shithead;
