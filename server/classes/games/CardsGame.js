class CardsGame {
    constructor(players = [], deck = null, maxPlayers = 4) {
      if (new.target === CardsGame) {
        throw new Error("Cannot instantiate abstract class CardsGame directly.");
      }
  
      this.players = players.map(player => ({ id: player, hand: [] }));
      this.deck = deck;
      this.middlePile = [];
      this.maxPlayers = maxPlayers;
      this.currentTurn = 0;
      this.started = false;
    }
  
    addPlayer(player) {
      if (this.players.length >= this.maxPlayers) {
        throw new Error("Maximum players reached.");
      }
      this.players.push({ id: player, hand: [] });
    }
  
    shuffleDeck() {
      if (this.deck) {
        this.deck.shuffle();
      } else {
        throw new Error("No deck assigned to this game.");
      }
    }
  
    dealCardsToPlayers(cardsPerPlayer) {
      if (!this.deck) {
        throw new Error("No deck assigned to this game.");
      }
      this.players.forEach(player => {
        const dealtCards = this.deck.deal(cardsPerPlayer);
        player.hand.push(...dealtCards);
      });
    }
  
    playCards(playerId, cards = []) {
      const player = this.players.find(p => p.id === playerId);
      if (!player) {
        throw new Error("Player not found.");
      }
  
      if (!this.validatePlay(cards)) {
        throw new Error("Invalid play.");
      }
  
      cards.forEach(card => {
        const index = player.hand.findIndex(c => c.value === card.value && c.suit === card.suit);
        if (index !== -1) {
          player.hand.splice(index, 1);
        } else {
          throw new Error("Card not found in player's hand.");
        }
      });
  
      this.middlePile.push(...cards);
      console.log(`${playerId} played ${cards.length} cards:`, cards);
    }
  
    reshuffleMiddlePile() {
      if (this.middlePile.length === 0) {
        throw new Error("No cards in the middle pile to reshuffle.");
      }
  
      this.deck.cards = this.middlePile;
      this.deck.shuffle();
      this.middlePile = [];
      console.log("Middle pile reshuffled into the deck.");
    }
  
    dealCardsWithReshuffle(numCards) {
      if (this.deck.cards.length < numCards) {
        console.log("Deck is running out. Reshuffling middle pile...");
        this.reshuffleMiddlePile();
      }
      return this.deck.deal(numCards);
    }
  
    validatePlay(cards) {
      throw new Error("validatePlay method must be implemented in subclass.");
    }
  
    handleTurn(playerId) {
      throw new Error("handleTurn method must be implemented in subclass.");
    }
  
    nextTurn() {
      this.currentTurn = (this.currentTurn + 1) % this.players.length;
    }
  }
  
  module.exports = CardsGame;
  