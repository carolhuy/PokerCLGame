 class Player{
    name;
    hand; 
    typeHand;
    constructor(name){
        this.name=name;
        this.hand=[];
    }

    getName(){
        return this.name; 
    }

    setHand(dealtHand){
        this.hand=dealtHand;
    }

    getHand(){
        return this.hand
    }

    getTypeHand(){
        return this.typeHand
    }

    displayHand(){
        for(let i=0; i<this.hand.length; ++i){
            if(i===0){
                console.log(this.getName()+" has ")
                console.log('\t'+this.hand[i].getValue()+" of "+this.hand[i].getSuit())
            }
            else{
                console.log('\t'+this.hand[i].getValue()+" of "+this.hand[i].getSuit())
            }
        }
    } 
}
export default Player