class Deck {
    constructor(cardGenerator = Deck.defaultCardGenerator, decks = 1) {
      this.cardGenerator = cardGenerator;
      this.decks = decks;
      this.cards = this.generateMultipleDecks();
    }
  
    static defaultCardGenerator() {
      const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
      const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
      const suitSymbols = { Hearts: '♥', Diamonds: '♦', Clubs: '♣', Spades: '♠' };
  
      return suits.flatMap(suit =>
        values.map(value => ({
          value,
          suit,
          symbol: suitSymbols[suit],
        }))
      );
    }
  
    generateDeck() {
      return this.cardGenerator();
    }
  
    generateMultipleDecks() {
      let combinedDeck = [];
      for (let i = 0; i < this.decks; i++) {
        combinedDeck = combinedDeck.concat(this.generateDeck());
      }
      return combinedDeck;
    }
  
    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    deal(numCards) {
      if (this.cards.length < numCards) {
        throw new Error("Not enough cards in the deck!");
      }
      return this.cards.splice(0, numCards);
    }
  }
  
  module.exports = Deck;
  