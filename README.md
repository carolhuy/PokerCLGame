A Javascript program that simulates a basic game of poker without betting. 

The program shuffles a deck of cards, and deals a hand of poker (5 cards) to two or more players. 
The cards in each player's hand is then displayed, and then the player with the best hand is determined after the initial deal.

The winner is determined by this modified list of poker rules. These are not all the poker rules, but I will be adding more features, such as betting, and rules later on. 

Poker Rules
----------------------
Each player gets 5 cards (as in 5-card draw poker).
The deck has 52 cards of four suits.
Suits: Spades, Hearts, Diamonds, Clubs
Card rank: Ace, King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4, 3, 2
Cards are ranked in this order to determine high card or for determining sequence in a straight. Aces are above King and are the highest card. 

Poker hand hierarchy (strongest hand to weakest hand):
----------------------
Royal Flush
----------------------
Five cards, all of the same suit, in consecutive order of rank from 10 to Ace.

Straight Flush
----------------------
Any five cards, all of the same suit, in consecutive order of rank.

Four of a Kind
----------------------
Four cards of the same rank.

Full House
----------------------
Three cards of the same rank, and a pair of a different rank. 

Flush
----------------------
Five cards of the same suit, not all in consecutive order.

Straight
----------------------
Five cards of consecutive rank, not all in the same suit.

Three of a kind
----------------------
Three cards of the same rank.

Two pair
----------------------
Two different sets of two cards of matching rank.

Pair
----------------------
A pair of cards of the same rank in different suits.

High card
----------------------
The highest ranked card in the hand. 

Tie Breaking
----------------------
If two hands have the same strength, such as a straight vs another straight, or high card vs high card, the hand with the best high card wins. 
If two hands match their highest card, the next highest card is used, and so on.
When comparing full house to full house, the higher ranked set of three cards decides the winner. 
When comparing two pair, the hand with the better high pair wins.
