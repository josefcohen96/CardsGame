const Deck = require('../Deck');

class StandardDeck extends Deck {
  constructor(decks = 1) {
    super(Deck.defaultCardGenerator, decks);
  }
}

module.exports = StandardDeck;
