const Deck = require('../Deck');

const durakCardGenerator = () => {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = ['6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  const suitSymbols = { Hearts: '♥', Diamonds: '♦', Clubs: '♣', Spades: '♠' };

  return suits.flatMap(suit =>
    values.map(value => ({
      value,
      suit,
      symbol: suitSymbols[suit],
    }))
  );
};

class DurakDeck extends Deck {
  constructor(decks = 1) {
    super(durakCardGenerator, decks);
  }
}

module.exports = DurakDeck;
