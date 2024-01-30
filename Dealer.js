import Card from "./Card.js"
class Dealer{
    constructor(){
        this.deck=[];
        const values = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']
        const suits = ['spades', 'hearts', 'diamonds', 'clubs']
        for(let i=0; i<values.length; ++i){
            for(let j=0; j<suits.length;++j){
                let single = new Card(values[i],suits[j])
                this.deck.push(single)
            }
        }
    }

    getDeck(){
        return this.deck; 
    }

    //shuffle cards into random order by swapping two random positions 5000 times 
    //Implementing this by picking two random numbers to represent cards in the deck, and swapping their values.
    shuffleDeck(){
        for(let i=0; i<5000; ++i){
            let r1 = Math.floor(Math.random()*this.deck.length)
            let r2 = this.uniqueRandNumber(r1)
            let temp = new Card(this.deck[r1].getValue(),this.deck[r1].getSuit())
            this.deck[r1].setValue(this.deck[r2].getValue())
            this.deck[r1].setSuit(this.deck[r2].getSuit())
            this.deck[r2].setValue(temp.getValue())
            this.deck[r2].setSuit(temp.getSuit())
        }
    }

    dealHand(){
        const hand = []
        for(let i=0; i<5; ++i){
            hand[i]=this.deck.pop()
        }
        return hand; 
    }

    //determine what kind of hand a player has (ie: Pair, Flush, etc)
    //INPUTS: hand, an Array of Card Objects that a Player has
    //RETURN: an array with two values: handValue, a Int that indicating value of hand, tiebreakerValue, the determining value for a tie  
    determineHandValue(hand){
        let handValue = 1;
        let tiebreakerValue = '';
        let valueTrack = new Map;
        let suitTrack = new Map; 
        hand.forEach(c=>{
            //does not have the value or suit 
            if(!valueTrack.has(c.getValue()) && !suitTrack.has(c.getSuit())){
                valueTrack.set(c.getValue(),1)
                suitTrack.set(c.getSuit(),1)
            }
            //does not have the value, has the suit
            else if(!valueTrack.has(c.getValue())){
                valueTrack.set(c.getValue(),1)
                suitTrack.set(c.getSuit(),suitTrack.get(c.getSuit())+1)
            }
            //does not have suit, has value 
            else if(!suitTrack.has(c.getSuit())){
                valueTrack.set(c.getValue(),valueTrack.get(c.getValue())+1)
                suitTrack.set(c.getSuit(),1)
            }
            //has suit and value 
            else{
                valueTrack.set(c.getValue(),valueTrack.get(c.getValue())+1)
                suitTrack.set(c.getSuit(),suitTrack.get(c.getSuit())+1)
            }
        })

        let cardValuesAsArray = Array.from(valueTrack.keys())
        //full house 
        if(this.filterMap(2,valueTrack).length===1 && this.filterMap(3,valueTrack).length===1){
            handValue=7
        }
        //flush
        else if(this.filterMap(5,suitTrack).length===1 && this.determineStraight(cardValuesAsArray)===""){
            handValue=6
        }
        //royal flush 
        else if(this.filterMap(5,suitTrack).length===1 && this.determineStraight(cardValuesAsArray)==="Royal"){
            handValue=10
        }
        //straight flush
        else if(this.filterMap(5,suitTrack).length===1 && this.determineStraight(cardValuesAsArray)==="Straight"){
            handValue=9
        }
        //straight
        else if(this.determineStraight(cardValuesAsArray)==="Straight"){
            handValue=5
        }
        //pair 
        else if(this.filterMap(2,valueTrack).length===1){
            handValue=2 
        } 
        //two pair 
        else if(this.filterMap(2,valueTrack).length===2){
            handValue=3  
        } 
        //triple
        else if(this.filterMap(3,valueTrack).length===1){
            handValue=4 
        } 
        //four of a kind 
        else if(this.filterMap(4, valueTrack).length===1){
            handValue=8
        }
        else{
            handValue=1;
        }
        tiebreakerValue=this.determineKicker(valueTrack,handValue)
        return [handValue, tiebreakerValue]

    }

    //compare all players' hands to find winner 
    /*
    INPUT: array of all players 
    RETURN: array of winning Players
     */
    determineWinner(players){
        let winners = []
        let winningHand=0;
        let tiebreakerValue='';
        const values = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']
        let winningPlayerIndex=0; 
        for(let i=0; i<players.length;++i){
            //if first, set hand
            if(i===0){
                winningHand=this.determineHandValue(players[i].getHand())[0]
                winningPlayerIndex=i
                tiebreakerValue=this.determineHandValue(players[i].getHand())[1]
                winners.push(players[i])
            }
            //compare values of hands 
            else{
                //new hand is bigger 
                if(this.determineHandValue(players[i].getHand())[0]>winningHand){
                    winners=[]
                    winningHand=this.determineHandValue(players[i].getHand())[0]
                    winningPlayerIndex=i
                    tiebreakerValue=this.determineHandValue(players[i].getHand())[1]
                    winners.push(players[i])
                }
                //same type of hands, determine winner 
                else if(this.determineHandValue(players[i].getHand())[0]===winningHand){
                    if(values.indexOf(tiebreakerValue) > values.indexOf(this.determineHandValue(players[i].getHand())[1])){
                        winners=[]
                        winningHand=this.determineHandValue(players[i].getHand())[0]
                        winningPlayerIndex=i
                        tiebreakerValue=this.determineHandValue(players[i].getHand())[1]
                        winners.push(players[i])
                    }
                    //same values for the type of hand (ex: highcard, pair, two pair)
                    else if(values.indexOf(tiebreakerValue) === values.indexOf(this.determineHandValue(players[i].getHand())[1])){
                        winners.push(players[i])
                    }
                }
            }
        }
        return winners 
    }

     //gives corresponding string for type of hand 
     handValueToString(handVal){
        let stringValue = "";
        switch(handVal){
            case 2:
                stringValue= "Pair"
                break;
            case 3:
                stringValue= "Two Pair"
                break;
            case 4:
                stringValue= "Three of A Kind"
                break;
            case 5: 
                stringValue= "Straight"
                break;
            case 6:
                stringValue= "Flush"
                break;
            case 7:
                stringValue= "Full House"
                break;
            case 8:
                stringValue= "Four of A Kind"
                break;
            case 9:
                stringValue= "Straight Flush"
                break;
            case 10: 
                stringValue= "Royal Flush" 
                break;
            default:
                stringValue= "Highest Card"
        }
        return stringValue; 
    }

    //reset deck 
    resetDeck(){
        this.deck=[]
        const values = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']
        const suits = ['spades', 'hearts', 'diamonds', 'clubs']
        for(let i=0; i<values.length; ++i){
            for(let j=0; j<suits.length;++j){
                let single = new Card(values[i],suits[j])
                this.deck.push(single)
            }
        }
        return this.deck; 
    }

    /** HELPER FUNCTIONS **/
    //generate unique random number
    uniqueRandNumber(r1){
        let r2 = Math.floor(Math.random()*this.deck.length)
        if(r1===r2){
            this.uniqueRandNumber(r1)
        }
        return r2
    }

    //gives corresponding keys for values 
    /**INPUT: value, value filtering by 
     *        mapName, name of map to filter 
     * OUTPUT: returns which card values match the value inputted 
     */
    filterMap(value, mapName){
        let filteredKeys =[]
        mapName.forEach((val,key)=>
            {
                if(val===value){
                filteredKeys.push(key)
                }
            })
            return filteredKeys
        }
    
    //determine if an array of cards is a straight 
    /**INPUT: Array of card values
     * OUTPUT: "" if not a straight, "Straight" if a straight, "Royal" if royal straight  
     */
    determineStraight(cardValuesAsArray){
        //create string of values in order and values player has 
        const values = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']
        const valuesAsString = values.join('')

        let cardValueSorted=this.sortByDecreasingCardValue(cardValuesAsArray)
        let cardValuesAsString = cardValueSorted.join('')
        //see if substr exists within for straight, AKQJ10for Royal 
        if(cardValuesAsString==="AKQJ10" && valuesAsString.includes(cardValuesAsString)){
            return "Royal"
        }
        else if(valuesAsString.includes(cardValuesAsString)){
            return "Straight"
        }
        else{
            return ""
        }
    }

    //tiebreaker function that takes in array of values and type 
    /**INPUT: Array of card values, Type of hand 
     * OUTPUT: Character with highest value based on type of hand    
     */
    determineKicker(valueTrack, handValue){
        let cardValuesAsArray =Array.from(valueTrack.keys())
        let tiebreakerValue = '';
                //determining if pair, 2 pair, four of a kind, full house
        //pair 
        if(handValue===2){
            tiebreakerValue = this.filterMap(2,valueTrack)[0]
        } 
        //two pair 
        else if(handValue===3){
            let pairValues = this.filterMap(2,valueTrack)
            let sortedCardValues = this.sortByDecreasingCardValue(pairValues)
            tiebreakerValue = sortedCardValues[0]
        } 
        //triple
        else if(handValue===4){
            tiebreakerValue = this.filterMap(3,valueTrack)[0]
        } 
        //four of a kind 
        else if(handValue===8){
            tiebreakerValue = this.filterMap(4,valueTrack)[0]
        }
        //full house 
        else if(handValue===7){
            tiebreakerValue = this.filterMap(3,valueTrack)[0]
        }
        else{
            let sortedCardValues = this.sortByDecreasingCardValue(cardValuesAsArray)
            tiebreakerValue = sortedCardValues[0]
        }
        return tiebreakerValue
    }

    //sort cards by descending order 
    //lower value is higher card 
    /* INPUT array of unsorted card values 
        OUTPUT array of card value indexes sorted in descending order 
     */ 
    sortByDecreasingCardValue(cardValuesAsArray){
        //create string of values in order and values player has 
        const values = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']

        //get indexes of values 
        let cardValueIndexes=[];
        cardValuesAsArray.forEach(
            v => cardValueIndexes.push(values.indexOf(v))
        )
        
        //sort index of values 
        cardValueIndexes.sort(function(a, b){return a - b})
        let cardValuesSortedArray = []
        cardValueIndexes.forEach(i => cardValuesSortedArray.push(values[i]))
     
        return cardValuesSortedArray
    }
}
export default Dealer