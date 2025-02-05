/* 
    Use for loop to generate cards
    to find the column, use iteration % gridSize
    to find the row, use iteration / gridSize but you have to round down using math.floor
*/

import { Graphics, Container } from "pixi.js"


export class Card{
    constructor(){
        this.cardContainer = new Container();
        this.cards = [];
        this.flippedCard = [];
    }

    generateCards(gridSize){
        const padding = 10;

        if (gridSize % 3 == 0){
            console.log("grid size must be an even number.")
            return;
        }
        
        for (let i=0; i < gridSize * gridSize; i++){
            const card = new Graphics()
            .rect(0,0,100,150)
            .fill('E5E5E5');
            card.eventMode = 'static';
            card.cursor = 'pointer';
            
    
            let row = Math.floor(i / gridSize);
            let column = (i % gridSize)
    
            card.x = column * (card.width + padding);
            card.y = row * (card.height + padding);
            card.on('pointerdown', () => this.flipCard(card, i));
            
            this.cards.push({sprite: card, value: i % (gridSize*gridSize /2), flipped: false})

            this.cardContainer.addChild(card);
        }
        
    }

    getCardContainer(){
        return this.cardContainer;
    }
    
    flipCard(card, index){
        if (this.cards[index].flipped){
            console.log(`the card ${index} is already flipped`)
            return;
        } else if (this.flippedCard.length == 2){
            console.log(`the 2 cards has been flipped`)
            return;
        }

        console.log(`this card ${index} is flipped value of ${this.cards[index].value}`);
        
        this.cards[index].flipped = true;

        card.clear()
        .rect(0,0,100,150)
        .fill('ba0012') //red

        this.flippedCard.push({card, index});
        
        if (this.flippedCard.length == 2){
            console.log('checking...')
            setTimeout(() =>{this.matchCard()}, 1000)
            
            
        }
    }

    matchCard(){ 
        //matched values
        const card1 = this.cards[this.flippedCard[0].index]
        const card2 = this.cards[this.flippedCard[1].index]
        
        if(card1.value == card2.value || card2.value == card1.value){
            console.log(`\n match!`)
            this.flippedCard[0].card.eventMode = 'passive';
            this.flippedCard[1].card.eventMode = 'passive';
            this.flippedCard = [];
            

        }else{
            console.log('\ntry again')

            card1.flipped= false;
            card2.flipped = false;

            this.flippedCard[0].card.clear()
                .rect(0,0,100,150)
                .fill('E5E5E5'); //back to white
            
            this.flippedCard[1].card.clear()
            .rect(0,0,100,150)
            .fill('E5E5E5'); //back to white
            
            this.flippedCard = [];
            
            


        }
        
    }

    shuffle(){
        const array = this.cards;
        console.log('shuffle is running ')
        for (let i = array.length - 1; i > 0 ; i--){
            let j = Math.floor(Math.random() * (i + 1))
            
            let temporaryArray = array[i]; array[i] = array[j]; array[j] = temporaryArray;
            
        }
    }

}
