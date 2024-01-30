class Card{
   value='';
   suit='';
    constructor(value, suit){
        this.value=value;
        this.suit=suit;
    }

    getValue(){
        return this.value; 
    }

    getSuit(){
        return this.suit;
    }

    setValue(v){
        this.value=v
    }

    setSuit(s){
        this.suit=s
    }
}
export default Card