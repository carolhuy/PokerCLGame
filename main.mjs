import { createRequire } from "module";
const require = createRequire(import.meta.url);
const prompt = require("prompt-sync")();
import Dealer from "./Dealer.js"
import Player from "./Player.js";

//instructions and input number of players 
console.log("I'm your friendly neighborhood robot, PoRo! Here to play some poker? Here are the rules!\n");
console.log("Each player gets 5 cards (as in 5-card draw poker). \nThere are 52 cards of four suits. Suit order is as follows: Spades, Hearts, Diamonds, Clubs.\nCard rank is as follows: Ace, King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4, 3, 2. \nCards are ranked in this order to determine high card or for determining sequence in a straight. \nAces are the highest card (above King).\n");
console.log("Poker hand hierarchy is as follows from strongest hand to weakest hand\n Royal Flush \n\tFive cards, all of the same suit, in consecutive order of rank from 10 to Ace.\n Straight Flush \n\tAny five cards, all of the same suit, in consecutive order of rank.\n Four of a Kind \n\tFour cards, all of the same rank. \n Full House \n\tThree cards of the same rank, and a pair of a different rank.\n Flush \n\tFive cards of the same suit, not all in consecutive order. \n Straight \n\tFive cards of consecutive rank, not all in the same suit. \n Three of a kind \n\tThree cards of the same rank. \n Two Pair \n\tTwo different sets of two cards of matching rank.\n Pair \n\tA pair of cards of the same rank in different suits.\n High Card \n\tThe highest ranked card in the hand");
let numPlayers=prompt("Please enter the number of players: ")
while(isNaN(parseInt(numPlayers)) || parseInt(numPlayers)<2 ){
    numPlayers=prompt("Try Again! Please enter a valid number: ")
}

//store names in array 
const players = [];
for(let i=0; i<numPlayers; ++i){
    let name= prompt(`Please enter the name of Player ${i+1}: `)
    if(!name || name.trim().length === 0 || (players.length>0 && players.includes(name)))
    {
        name= prompt(`Invalid Name! Please enter the name of Player ${i+1}: `)
    }
    players[i]=new Player(name)
}

players.forEach(p=> console.log(`\nWelcome `+p.getName()+'!'))

console.log("\nLet's play some poker! Here is everyone's hands: ")

//create deck
const pokerDealer = new Dealer();

//shuffle deck into random order 
pokerDealer.shuffleDeck();

//deal random cards to each player 
players.forEach(p=>p.setHand(pokerDealer.dealHand()))

//display everyones hands 
players.forEach(p=> p.displayHand())

//tell players what type of hands they have 
players.forEach(p=>
    {
        let handVal = pokerDealer.determineHandValue(p.getHand())
        console.log(p.getName() + " has a " + pokerDealer.handValueToString(handVal[0]) + " of " + handVal[1] + "!")
    }
)

//determine winner 
let winners = pokerDealer.determineWinner(players)
if(winners.length>1){
    for(let i=0; i<winners.length; ++i){
        if(i===0){
            console.log("There is a tie between "+winners[i].getName())
        }
        if(i===winners.length-1){
            let winningHand = pokerDealer.determineHandValue(winners[i].getHand())
            console.log(" and "+winners[i].getName()+", with a hand of "+ pokerDealer.handValueToString(winningHand[0])+ " of "+ winningHand[1])
        }
        else{
            console.log(" and "+winners[i].getName())
        }
    }
}
else{
    let winningHand = pokerDealer.determineHandValue(winners[0].getHand())
    console.log("The winner is "+winners[0].getName()+" with "+ pokerDealer.handValueToString(winningHand[0]) + " of "+winningHand[1])
}
